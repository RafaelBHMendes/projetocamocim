import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Bidding } from '../../types/bidding'

import eye from '../../../public/eye.svg'
import pdf from '../../../public/pdf.svg'

const formatDateTime = (dateTimeString: string): string => {
  try {
    return format(new Date(dateTimeString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
  } catch {
    return dateTimeString
  }
}

const BiddingsTable: React.FC<{ biddings: Bidding[] }> = ({ biddings }) => {
  if (biddings.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow p-6 text-center'>
        <div className='flex flex-col items-center justify-center py-12'>
          <svg
            className='h-12 w-12 text-gray-400 mb-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            />
          </svg>
          <p className='text-gray-600'>Nenhuma licitação encontrada</p>
        </div>
      </div>
    )
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

  return (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <div className='px-6 py-4 border-b border-gray-200 bg-gray-50'>
        <h2 className='text-lg font-semibold text-gray-900'>Lista de Licitações</h2>
        <p className='mt-1 text-sm text-gray-600'>
          Visualize todas as licitações disponíveis e acesse seus detalhes
        </p>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Processo
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Objeto
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Status
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Modalidade
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Datas
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {biddings.map(bid => (
              <tr key={bid.id} className='hover:bg-gray-50 transition-colors duration-200'>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {bid.processNumber}
                </td>
                <td className='px-6 py-4'>
                  <div className='text-sm text-gray-900 line-clamp-2'>{bid.object}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      bid.opening,
                      bid.canceled
                    )}`}
                  >
                    {bid.canceled ? 'Anulado' : bid.opening}
                  </span>
                  {bid.postponement && (
                    <span className='block mt-1 text-xs text-gray-500'>
                      Nova data: {formatDateTime(bid.postponement)}
                    </span>
                  )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getModalityClass(
                      bid.modality
                    )}`}
                  >
                    {bid.modality}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-xs text-gray-900'>
                    <div className='mb-1'>
                      <span className='font-medium'>Publicação:</span> {bid.publicationDate}
                    </div>
                    <div>
                      <span className='font-medium'>Abertura:</span>{' '}
                      {formatDateTime(bid.dispenseDate)}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex items-center space-x-6'>
                    {(bid.file || (bid.documents && bid.documents.length > 0)) && (
                      <a
                        href={bid.file || bid.documents?.[0].fileUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-900 transition-colors duration-200'
                        title='Visualizar PDF'
                      >
                        <Image
                          src={pdf}
                          alt='PDF'
                          width={32}
                          height={32}
                          className='hover:scale-110 transition-transform duration-200'
                        />
                      </a>
                    )}
                    <Link
                      href={`/biddings/${bid.id}`}
                      className='text-blue-600 hover:text-blue-900 transition-colors duration-200'
                      title='Ver detalhes da licitação'
                    >
                      <Image
                        src={eye}
                        alt='Ver detalhes'
                        width={32}
                        height={32}
                        className='hover:scale-110 transition-transform duration-200'
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BiddingsTable
