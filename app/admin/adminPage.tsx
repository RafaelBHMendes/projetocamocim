'use client'

import React, { useEffect, useState } from 'react'
import { Bid } from '../admin/components/types' // Importe o tipo Bid
import BiddingForm from '../admin/components/BiddingForm'
import BiddingList from '../admin/components/BiddingList'
import supabase from '../lib/supabase' // Ajuste conforme a localização do seu cliente Supabase
import { toast } from 'react-toastify'
import { signOut } from './components/SignOut'
import EditModal from '../components/EditModal'

const AdminPage: React.FC = () => {
  const [biddings, setBiddings] = useState<Bid[]>([])
  const [newBid, setNewBid] = useState<Bid>({
    processNumber: '',
    object: '',
    publicationDate: '',
    dispenseDate: '',
    opening: 'Aberta',
    file: undefined,
    Url: '',
    modality: 'Pregão'
  })
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [currentBid, setCurrentBid] = useState<Bid | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data, error } = await supabase.from('bidding').select('*')
        if (error) throw error
        setBiddings(data || [])
      } catch (error) {
        console.error('Error fetching biddings', error)
        toast.error('Erro ao carregar licitações')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddBid = async (bid: Bid): Promise<void> => {
    const { data, error } = await supabase.from('bidding').insert([
      {
        ...bid,
        publicationDate: new Date(bid.publicationDate.split('/').reverse().join('-')).toISOString(),
        dispenseDate: new Date(bid.dispenseDate.split('/').reverse().join('-')).toISOString()
      }
    ])
    if (error) {
      console.error('Failed to add bid', error)
      toast.error('Erro: ' + error.message)
    } else if (data) {
      setBiddings(prevBids => [...prevBids, ...data])
      setNewBid({
        processNumber: '',
        object: '',
        publicationDate: '',
        dispenseDate: '',
        opening: 'Aberta',
        Url: '',
        modality: 'Pregão'
      }) // Reset form
      toast.success('Licitação Adicionada!')
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
    <div className='min-h-screen bg-gray-50'>
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
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150'
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

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
              <h2 className='text-lg font-medium text-gray-900 mb-6'>Licitações Cadastradas</h2>
              {isLoading ? (
                <div className='flex justify-center items-center h-64'>
                  <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                </div>
              ) : (
                <BiddingList
                  biddings={biddings}
                  onRemove={handleRemoveBid}
                  onEdit={handleEditBid}
                />
              )}
            </div>
          </div>
        </div>
      </main>

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
