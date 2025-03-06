'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FilterOptions } from '../../types/bidding'

interface FiltersProps {
  onSearch: (filters: FilterOptions) => void
}

const Filters: React.FC<FiltersProps> = ({ onSearch }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    dateRange: 'all',
    status: 'all',
    modality: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  })

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClear = () => {
    setFilters({
      searchTerm: '',
      dateRange: 'all',
      status: 'all',
      modality: 'all',
      sortBy: 'date',
      sortOrder: 'desc'
    })
    onSearch({
      searchTerm: '',
      dateRange: 'all',
      status: 'all',
      modality: 'all',
      sortBy: 'date',
      sortOrder: 'desc'
    })
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-6 mb-6'>
      {/* Barra de pesquisa principal */}
      <div className='flex gap-4 mb-4'>
        <div className='flex-1'>
          <input
            type='text'
            value={filters.searchTerm}
            onChange={e => handleFilterChange('searchTerm', e.target.value)}
            placeholder='Pesquisar por número do processo, objeto ou modalidade...'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        <button
          onClick={handleSearch}
          className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
          Pesquisar
        </button>
        <button
          onClick={handleClear}
          className='px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200'
        >
          Limpar
        </button>
      </div>

      {/* Botão para expandir filtros avançados */}
      <button
        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-5 w-5 transform transition-transform duration-200 ${
            isAdvancedOpen ? 'rotate-180' : ''
          }`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
        Filtros avançados
      </button>

      {/* Filtros avançados */}
      {isAdvancedOpen && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Período */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Período</label>
            <select
              value={filters.dateRange}
              onChange={e => handleFilterChange('dateRange', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='all'>Todos</option>
              <option value='7days'>Últimos 7 dias</option>
              <option value='30days'>Últimos 30 dias</option>
              <option value='90days'>Últimos 90 dias</option>
              <option value='custom'>Personalizado</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
            <select
              value={filters.status}
              onChange={e => handleFilterChange('status', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='all'>Todos</option>
              <option value='Aberta'>Aberta</option>
              <option value='Fechada'>Fechada</option>
              <option value='Adiado'>Adiada</option>
              <option value='Anulado'>Anulada</option>
            </select>
          </div>

          {/* Modalidade */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Modalidade</label>
            <select
              value={filters.modality}
              onChange={e => handleFilterChange('modality', e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            >
              <option value='all'>Todas</option>
              <option value='Pregão'>Pregão</option>
              <option value='Concurso'>Concurso</option>
              <option value='Credenciamento'>Credenciamento</option>
              <option value='Dispensa'>Dispensa</option>
              <option value='Concorrência'>Concorrência</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Ordenar por</label>
            <div className='flex gap-2'>
              <select
                value={filters.sortBy}
                onChange={e => handleFilterChange('sortBy', e.target.value)}
                className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='date'>Data</option>
                <option value='status'>Status</option>
                <option value='modality'>Modalidade</option>
              </select>
              <button
                onClick={() =>
                  handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')
                }
                className='px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50'
              >
                {filters.sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* Datas personalizadas */}
          {filters.dateRange === 'custom' && (
            <div className='md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Data inicial</label>
                <input
                  type='date'
                  value={filters.startDate}
                  onChange={e => handleFilterChange('startDate', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Data final</label>
                <input
                  type='date'
                  value={filters.endDate}
                  onChange={e => handleFilterChange('endDate', e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Filters
