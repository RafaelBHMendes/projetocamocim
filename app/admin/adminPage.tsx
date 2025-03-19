'use client'

import React, { useEffect, useState } from 'react'
import { Bid } from '../admin/components/types'
import BiddingForm from '../admin/components/BiddingForm'
import BiddingList from '../admin/components/BiddingList'
import supabase from '../lib/supabase'
import { toast } from 'react-hot-toast'
import { signOut } from './components/SignOut'
import EditModal from '../components/EditModal'

const AdminPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bid[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterModality, setFilterModality] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Estado inicial para nova licitação
  const [newBid, setNewBid] = useState<Bid>({
    processNumber: '',
    object: '',
    publicationDate: '',
    dispenseDate: '',
    opening: 'Aberta',
    file: undefined,
    Url: '',
    modality: 'Pregão',
    postponement: undefined,
    canceled: false
  })

  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [currentBid, setCurrentBid] = useState<Bid | null>(null)

  useEffect(() => {
    fetchBiddings()
  }, [])

  const fetchBiddings = async () => {
    try {
      setIsLoading(true)
      let { data, error } = await supabase.from('bidding').select('*')
      if (error) throw error
      setBiddings(data || [])
    } catch (error) {
      console.error('Error fetching biddings:', error)
      toast.error('Erro ao carregar licitações')
    } finally {
      setIsLoading(false)
    }
  }

  // Função para filtrar licitações
  const filteredBiddings = biddings.filter(bid => {
    const matchesStatus = filterStatus === 'all' || bid.opening === filterStatus
    const matchesModality = filterModality === 'all' || bid.modality === filterModality
    const matchesSearch =
      bid.processNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.object.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesModality && matchesSearch
  })

  // Estatísticas
  const stats = {
    total: biddings.length,
    abertas: biddings.filter(b => b.opening === 'Aberta').length,
    fechadas: biddings.filter(b => b.opening === 'Fechada').length,
    adiadas: biddings.filter(b => b.opening === 'Adiado').length,
    anuladas: biddings.filter(b => b.opening === 'Anulado').length
  }

  const handleAddBid = async (bid: Bid): Promise<void> => {
    try {
      // Separa os documentos do objeto bid
      const { documents, ...biddingData } = bid

      // Primeiro, insere a licitação
      const { data: insertedBidding, error: biddingError } = await supabase
        .from('bidding')
        .insert([
          {
            ...biddingData,
            publicationDate: new Date(
              bid.publicationDate.split('/').reverse().join('-')
            ).toISOString(),
            dispenseDate: new Date(bid.dispenseDate.split('/').reverse().join('-')).toISOString()
          }
        ])
        .select()

      if (biddingError) {
        console.error('Erro ao inserir licitação:', biddingError)
        throw biddingError
      }

      // Se houver documentos e a licitação foi inserida com sucesso
      if (documents && documents.length > 0 && insertedBidding && insertedBidding.length > 0) {
        const biddingId = insertedBidding[0].id

        // Prepara os documentos para inserção
        const documentsToInsert = documents.map(doc => ({
          bidding_id: biddingId,
          file_name: doc.fileName,
          file_url: doc.fileUrl,
          file_type: doc.fileType || 'edital',
          uploaded_at: new Date().toISOString()
        }))

        // Tenta inserir os documentos
        const { error: documentsError } = await supabase
          .from('bidding_document')
          .insert(documentsToInsert)

        if (documentsError) {
          console.error('Erro ao inserir documentos:', documentsError)
          // Se falhar ao inserir documentos, remove a licitação para manter consistência
          await supabase.from('bidding').delete().match({ id: biddingId })
          throw documentsError
        }
      }

      // Se chegou aqui, tudo deu certo
      if (insertedBidding) {
        setBiddings(prevBids => [...prevBids, ...insertedBidding])
        setNewBid({
          processNumber: '',
          object: '',
          publicationDate: '',
          dispenseDate: '',
          opening: 'Aberta',
          Url: '',
          modality: 'Pregão'
        })
        toast.success('Licitação Adicionada!')
      }
    } catch (error: any) {
      console.error('Erro ao adicionar licitação:', error)
      toast.error(`Erro: ${error.message || 'Erro desconhecido ao adicionar licitação'}`)
    }
  }

  const handleRemoveBid = async (id: number): Promise<void> => {
    const { data, error } = await supabase.from('bidding').delete().match({ id })

    if (error) {
      console.error('Failed to remove bid', error)
      toast.error('Erro: ' + error.message)
    } else {
      setBiddings(prevBids => prevBids.filter(bid => bid.id !== id))
      toast.success('Licitação Removida!')
    }
  }

  const handleUpdateBid = async (updatedBid: Bid) => {
    const { data, error } = await supabase
      .from('bidding')
      .update(updatedBid)
      .match({ id: updatedBid.id })

    if (error) {
      console.error('Failed to update bid', error)
      toast.error('Erro ao atualizar: ' + error.message)
    } else {
      setBiddings(prevBids => prevBids.map(bid => (bid.id === updatedBid.id ? updatedBid : bid)))
      handleCloseModal()
      toast.success('Licitação Atualizada com Sucesso!')
    }
    setEditModalOpen(false)
  }

  const handleSignOut = async () => {
    await signOut() // Note que essa chamada não será mais definida aqui, apenas chamada
  }

  const handleEditBid = (bid: Bid) => {
    setCurrentBid(bid)
    setEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setEditModalOpen(false)
    setCurrentBid(null) // Limpa o bid atual após fechar o modal
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Header */}
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Painel Administrativo</h1>
              <p className='mt-1 text-sm text-gray-500'>Gerencie as licitações do município</p>
            </div>
            <button
              onClick={handleSignOut}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5'>
          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <svg
                    className='h-6 w-6 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                    />
                  </svg>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      Total de Licitações
                    </dt>
                    <dd className='text-lg font-medium text-gray-900'>{stats.total}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <div className='h-6 w-6 rounded-full bg-green-100 flex items-center justify-center'>
                    <div className='h-4 w-4 rounded-full bg-green-500'></div>
                  </div>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>Abertas</dt>
                    <dd className='text-lg font-medium text-gray-900'>{stats.abertas}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <div className='h-6 w-6 rounded-full bg-red-100 flex items-center justify-center'>
                    <div className='h-4 w-4 rounded-full bg-red-500'></div>
                  </div>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>Fechadas</dt>
                    <dd className='text-lg font-medium text-gray-900'>{stats.fechadas}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <div className='h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center'>
                    <div className='h-4 w-4 rounded-full bg-yellow-500'></div>
                  </div>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>Adiadas</dt>
                    <dd className='text-lg font-medium text-gray-900'>{stats.adiadas}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <div className='h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center'>
                    <div className='h-4 w-4 rounded-full bg-gray-500'></div>
                  </div>
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>Anuladas</dt>
                    <dd className='text-lg font-medium text-gray-900'>{stats.anuladas}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className='mt-8 bg-white shadow rounded-lg p-6'>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Filtrar por Status</label>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              >
                <option value='all'>Todos</option>
                <option value='Aberta'>Aberta</option>
                <option value='Fechada'>Fechada</option>
                <option value='Adiado'>Adiado</option>
                <option value='Anulado'>Anulado</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Filtrar por Modalidade
              </label>
              <select
                value={filterModality}
                onChange={e => setFilterModality(e.target.value)}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              >
                <option value='all'>Todas</option>
                <option value='Pregão'>Pregão</option>
                <option value='Concurso'>Concurso</option>
                <option value='Credenciamento'>Credenciamento</option>
                <option value='Dispensa'>Dispensa</option>
                <option value='Concorrência'>Concorrência</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Buscar</label>
              <input
                type='text'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder='Buscar por número ou objeto...'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Form Section */}
          <div className='bg-white rounded-lg shadow'>
            <div className='p-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-6'>Nova Licitação</h2>
              <BiddingForm onAdd={handleAddBid} newBid={newBid} setNewBid={setNewBid} />
            </div>
          </div>

          {/* List Section */}
          <div className='bg-white rounded-lg shadow'>
            <div className='p-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-6'>
                Licitações Cadastradas
                <span className='ml-2 text-sm text-gray-500'>
                  ({filteredBiddings.length} de {biddings.length})
                </span>
              </h2>
              {isLoading ? (
                <div className='flex justify-center items-center h-64'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                </div>
              ) : (
                <BiddingList
                  biddings={filteredBiddings}
                  onRemove={handleRemoveBid}
                  onEdit={handleEditBid}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditModal
          bid={currentBid!}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onEdit={handleUpdateBid}
          setBid={setCurrentBid}
        />
      )}
    </div>
  )
}

export default AdminPage
