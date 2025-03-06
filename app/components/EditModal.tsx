// components/EditModal.tsx

import React, { useState, useEffect } from 'react'
import { Bid } from '../admin/components/types'
import { uploadPdf } from '@/api/uploadPdf'
import { getPdfUrl } from '@/api/getPdfUrl'
import { compressPDF } from '../utils/pdfCompressor'
import { toast } from 'react-hot-toast'

interface EditModalProps {
  bid: Bid
  isOpen: boolean
  onClose: () => void
  onEdit: (bid: Bid) => void
  setBid: React.Dispatch<React.SetStateAction<Bid | null>>
}

const EditModal: React.FC<EditModalProps> = ({ bid, isOpen, onClose, onEdit, setBid }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [initialBid] = useState(bid)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBid((prev: any) => ({ ...prev, [name]: value }))
    setHasChanges(true)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        setIsUploading(true)
        const file = e.target.files[0]

        // Comprimir o PDF
        const compressedFile = await compressPDF(file)

        // Converter o Blob comprimido para File
        const compressedPdfFile = new File([compressedFile], file.name, {
          type: 'application/pdf'
        })

        const filePath = await uploadPdf(compressedPdfFile)
        if (filePath) {
          const url = await getPdfUrl(filePath)
          setBid((prev: any) => ({ ...prev, file: url }))
          setHasChanges(true)
          toast.success('PDF comprimido e enviado com sucesso!')
        }
      } catch (error) {
        console.error('Erro ao processar o PDF:', error)
        toast.error('Erro ao processar o PDF. Tente novamente.')
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('Existem alterações não salvas. Deseja realmente fechar?')) {
        onClose()
      }
    } else {
      onClose()
    }
  }

  const handleSave = () => {
    if (!bid.processNumber || !bid.object || !bid.publicationDate || !bid.dispenseDate) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }
    onEdit(bid)
  }

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
      onClick={handleClose}
    >
      <div className='fixed inset-0 z-10 overflow-y-auto' onClick={e => e.stopPropagation()}>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full'>
                  <h3 className='text-xl font-semibold leading-6 text-gray-900 mb-6'>
                    Editar Licitação
                  </h3>
                  <div className='mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2'>
                    <div className='sm:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Nº do Processo <span className='text-red-500'>*</span>
                      </label>
                      <input
                        name='processNumber'
                        type='text'
                        required
                        placeholder='Nº Processo'
                        value={bid.processNumber}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      />
                    </div>

                    <div className='sm:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Objeto <span className='text-red-500'>*</span>
                      </label>
                      <input
                        name='object'
                        type='text'
                        required
                        placeholder='Objeto'
                        value={bid.object}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Data de Publicação <span className='text-red-500'>*</span>
                      </label>
                      <input
                        name='publicationDate'
                        type='date'
                        required
                        value={bid.publicationDate}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Abertura do Certame <span className='text-red-500'>*</span>
                      </label>
                      <input
                        name='dispenseDate'
                        type='datetime-local'
                        required
                        value={bid.dispenseDate}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Modalidade</label>
                      <select
                        name='modality'
                        value={bid.modality}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      >
                        <option value='Pregão'>Pregão</option>
                        <option value='Concurso'>Concurso</option>
                        <option value='Credenciamento'>Credenciamento</option>
                        <option value='Dispensa'>Dispensa</option>
                        <option value='Concorrência'>Concorrência</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Status</label>
                      <select
                        name='opening'
                        value={bid.opening}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      >
                        <option value='Aberta'>Aberta</option>
                        <option value='Fechada'>Fechada</option>
                      </select>
                    </div>

                    <div className='sm:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        PDF do Processo
                      </label>
                      <div className='mt-1 flex items-center'>
                        <div className='relative flex-grow'>
                          <input
                            name='file'
                            type='file'
                            accept='application/pdf'
                            onChange={handleFileChange}
                            disabled={isUploading}
                            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                          />
                          {isUploading && (
                            <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75'>
                              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600'></div>
                            </div>
                          )}
                        </div>
                        {bid.file && (
                          <a
                            href={bid.file}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='ml-3 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                          >
                            Ver atual
                          </a>
                        )}
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        URL do processo
                      </label>
                      <input
                        name='Url'
                        type='url'
                        placeholder='https://exemplo.com'
                        value={bid.Url}
                        onChange={handleInputChange}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                onClick={handleSave}
                className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
              >
                Salvar alterações
              </button>
              <button
                type='button'
                onClick={handleClose}
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal
