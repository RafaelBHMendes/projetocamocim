'use client'

import React, { useEffect, useState } from 'react'
import supabase from '../../lib/supabase'
import pdf from '../../../public/pdf.svg'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface BiddingDetails {
  id: number
  processNumber: string
  object: string
  publicationDate: string
  dispenseDate: string
  opening: string
  file: string
  Url: string
  modality: string
  postponement: string | null
  canceled?: boolean
}

const formatDateTime = (dateTimeString: string): string => {
  try {
    return format(new Date(dateTimeString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
  } catch {
    return dateTimeString
  }
}

const getStatusClass = (opening: string, canceled: boolean = false) => {
  if (canceled) return 'bg-gray-100 text-gray-800'

  const classes = {
    Aberta: 'bg-green-100 text-green-800',
    Fechada: 'bg-red-100 text-red-800',
    Adiado: 'bg-yellow-100 text-yellow-800',
    Anulado: 'bg-gray-100 text-gray-800'
  }
  return classes[opening as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getModalityClass = (modality: string) => {
  const classes = {
    Pregão: 'bg-blue-100 text-blue-800',
    Concurso: 'bg-purple-100 text-purple-800',
    Credenciamento: 'bg-yellow-100 text-yellow-800',
    Dispensa: 'bg-gray-100 text-gray-800',
    Concorrência: 'bg-indigo-100 text-indigo-800'
  }
  return classes[modality as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const BiddingDetailsPage: React.FC = () => {
  const [biddingDetails, setBiddingDetails] = useState<BiddingDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBiddingDetails = async () => {
      try {
        setIsLoading(true)
        const pathSegments = window.location.pathname.split('/')
        const id = pathSegments[pathSegments.length - 1]

        const { data, error } = await supabase
          .from('bidding')
          .select('*')
          .eq('id', parseInt(id))
          .single()

        if (error) throw error
        setBiddingDetails(data)
      } catch (error) {
        console.error('Erro ao buscar detalhes da licitação:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBiddingDetails()
  }, [])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex justify-center items-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  if (!biddingDetails) {
    return (
      <div className='min-h-screen bg-gray-50 flex justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Licitação não encontrada</h2>
          <p className='text-gray-600 mb-4'>A licitação que você está procurando não existe.</p>
          <Link
            href='/biddings'
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
          >
            Voltar para lista
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Navegação */}
        <nav className='mb-8 flex items-center space-x-2'>
          <Link
            href='/biddings'
            className='inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700'
          >
            <svg className='h-5 w-5 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Voltar para lista
          </Link>
        </nav>

        {/* Conteúdo principal */}
        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
          {/* Cabeçalho */}
          <div className='px-6 py-4 border-b border-gray-200 bg-gray-50'>
            <div className='flex justify-between items-start'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  Processo Nº {biddingDetails.processNumber}
                </h1>
                <div className='mt-2 flex items-center space-x-4'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      biddingDetails.opening,
                      biddingDetails.canceled
                    )}`}
                  >
                    {biddingDetails.canceled ? 'Anulado' : biddingDetails.opening}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getModalityClass(
                      biddingDetails.modality
                    )}`}
                  >
                    {biddingDetails.modality}
                  </span>
                </div>
              </div>
              {biddingDetails.file && (
                <a
                  href={biddingDetails.file}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
                >
                  <Image src={pdf} alt='PDF' width={20} height={20} className='mr-2' />
                  Baixar Edital
                </a>
              )}
            </div>
          </div>

          {/* Corpo */}
          <div className='px-6 py-6 space-y-6'>
            {/* Datas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Data de Publicação</h3>
                <p className='mt-1 text-lg text-gray-900'>
                  {formatDateTime(biddingDetails.publicationDate)}
                </p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Data de Abertura</h3>
                <p className='mt-1 text-lg text-gray-900'>
                  {formatDateTime(biddingDetails.dispenseDate)}
                </p>
              </div>
              {biddingDetails.postponement && (
                <div className='md:col-span-2'>
                  <h3 className='text-sm font-medium text-gray-500'>Nova Data (Adiamento)</h3>
                  <p className='mt-1 text-lg text-gray-900'>
                    {formatDateTime(biddingDetails.postponement)}
                  </p>
                </div>
              )}
            </div>

            {/* Objeto */}
            <div>
              <h3 className='text-sm font-medium text-gray-500 mb-2'>Objeto da Licitação</h3>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-900 whitespace-pre-wrap'>{biddingDetails.object}</p>
              </div>
            </div>

            {/* Links */}
            {biddingDetails.Url && (
              <div>
                <h3 className='text-sm font-medium text-gray-500 mb-2'>Link do Processo</h3>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <a
                    href={biddingDetails.Url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:text-blue-800 break-all'
                  >
                    {biddingDetails.Url}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BiddingDetailsPage
