'use client'

import React, { useState } from 'react'
import { getPdfUrl } from '../../../api/getPdfUrl'
import { uploadPdf } from '../../../api/uploadPdf'
import { compressPDF } from '../../utils/pdfCompressor'
import { toast } from 'react-hot-toast'

import { Bid } from './types'

interface BiddingFormProps {
  onAdd: (bid: Bid) => void
  newBid: Bid
  setNewBid: React.Dispatch<React.SetStateAction<Bid>>
}

const BiddingForm: React.FC<BiddingFormProps> = ({ onAdd, newBid, setNewBid }) => {
  const [isUploading, setIsUploading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewBid({ ...newBid, [name]: value })
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
          setNewBid({ ...newBid, file: url })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !newBid.processNumber ||
      !newBid.object ||
      !newBid.publicationDate ||
      !newBid.dispenseDate
    ) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }
    onAdd(newBid)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Nº do Processo <span className='text-red-500'>*</span>
          </label>
          <input
            name='processNumber'
            type='text'
            required
            placeholder='Nº Processo'
            value={newBid.processNumber}
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
            value={newBid.object}
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
            value={newBid.publicationDate}
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
            value={newBid.dispenseDate}
            onChange={handleInputChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>Modalidade</label>
          <select
            name='modality'
            value={newBid.modality}
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
            value={newBid.opening}
            onChange={handleInputChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          >
            <option value='Aberta'>Aberta</option>
            <option value='Fechada'>Fechada</option>
          </select>
        </div>

        <div className='sm:col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>PDF do Processo</label>
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
            {newBid.file && (
              <a
                href={newBid.file}
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
          <label className='block text-sm font-medium text-gray-700'>URL do processo</label>
          <input
            name='Url'
            type='url'
            placeholder='https://exemplo.com'
            value={newBid.Url}
            onChange={handleInputChange}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          type='submit'
          className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Adicionar Licitação
        </button>
      </div>
    </form>
  )
}

export default BiddingForm
