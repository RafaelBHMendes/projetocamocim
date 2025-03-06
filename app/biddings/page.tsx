'use client'

import { useEffect, useState } from 'react'
import Breadcrumbs from '../biddings/components/Breadcrumbs'
import Filters from '../biddings/components/filters'
import BiddingsTable from '../biddings/components/BiddingsTable'
import supabase from '../lib/supabase'
import { format, subDays } from 'date-fns'
import { Bidding, FilterOptions } from '../types/bidding'

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${day}/${month}/${year}`
}

const LicitacoesPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bidding[]>([])
  const [filteredBiddings, setFilteredBiddings] = useState<Bidding[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBiddings()
  }, [])

  const fetchBiddings = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from('bidding').select('*')
      if (error) throw error
      setBiddings(data || [])
      setFilteredBiddings(data || [])
    } catch (error) {
      console.error('Erro ao buscar licitações:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilter = (filters: FilterOptions) => {
    let filtered = [...biddings]

    // Filtro por termo de busca
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(
        bid =>
          bid.processNumber.toLowerCase().includes(searchTerm) ||
          bid.object.toLowerCase().includes(searchTerm) ||
          bid.modality.toLowerCase().includes(searchTerm)
      )
    }

    // Filtro por status
    if (filters.status !== 'all') {
      filtered = filtered.filter(bid => bid.opening === filters.status)
    }

    // Filtro por modalidade
    if (filters.modality !== 'all') {
      filtered = filtered.filter(bid => bid.modality === filters.modality)
    }

    // Filtro por data
    if (filters.dateRange !== 'all') {
      const today = new Date()
      let startDate: Date

      switch (filters.dateRange) {
        case '7days':
          startDate = subDays(today, 7)
          break
        case '30days':
          startDate = subDays(today, 30)
          break
        case '90days':
          startDate = subDays(today, 90)
          break
        case 'custom':
          if (filters.startDate && filters.endDate) {
            filtered = filtered.filter(bid => {
              const bidDate = new Date(bid.publicationDate)
              return (
                bidDate >= new Date(filters.startDate!) && bidDate <= new Date(filters.endDate!)
              )
            })
          }
          break
      }

      if (filters.dateRange !== 'custom') {
        filtered = filtered.filter(bid => new Date(bid.publicationDate) >= startDate!)
      }
    }

    // Ordenação
    filtered.sort((a, b) => {
      let comparison = 0
      switch (filters.sortBy) {
        case 'date':
          comparison = new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime()
          break
        case 'status':
          comparison = a.opening.localeCompare(b.opening)
          break
        case 'modality':
          comparison = a.modality.localeCompare(b.modality)
          break
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    setFilteredBiddings(filtered)
  }

  return (
    <div className='min-h-screen bg-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='mb-6'>
          <Breadcrumbs />
        </div>

        {/* Header */}
        <div className='mb-8 bg-white rounded-lg shadow-sm p-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Licitações</h1>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            <svg
              className='h-5 w-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p>
              Consulte todas as licitações do município. Use os filtros para encontrar licitações
              específicas.
            </p>
          </div>
        </div>

        {/* Filtros */}
        <Filters onSearch={handleFilter} />

        {/* Tabela de Licitações */}
        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        ) : (
          <BiddingsTable biddings={filteredBiddings} />
        )}

        {/* Paginação (implementar depois) */}
        <div className='mt-6 flex justify-center'>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'
          >
            {/* Adicionar paginação aqui */}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default LicitacoesPage
