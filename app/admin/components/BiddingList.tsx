import { Bid } from './types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface BiddingListProps {
  biddings: Bid[]
  onRemove: (id: number) => void
  onEdit: (bid: Bid) => void
}

const BiddingList: React.FC<BiddingListProps> = ({ biddings, onRemove, onEdit }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    } catch {
      return dateString
    }
  }

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    } catch {
      return dateString
    }
  }

  const getStatusColor = (status: string, isPostponed: boolean = false) => {
    if (isPostponed) return 'bg-yellow-100 text-yellow-800'

    const colors = {
      Aberta: 'bg-green-100 text-green-800',
      Fechada: 'bg-red-100 text-red-800',
      Adiado: 'bg-yellow-100 text-yellow-800',
      Anulado: 'bg-gray-100 text-gray-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getModalityColor = (modality: string) => {
    const colors = {
      Pregão: 'bg-blue-100 text-blue-800',
      Concurso: 'bg-purple-100 text-purple-800',
      Credenciamento: 'bg-yellow-100 text-yellow-800',
      Dispensa: 'bg-gray-100 text-gray-800',
      Concorrência: 'bg-indigo-100 text-indigo-800'
    }
    return colors[modality as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className='flow-root'>
      <ul role='list' className='-my-5 divide-y divide-gray-200'>
        {biddings.map(bid => (
          <li key={bid.id} className='py-5'>
            <div className='flex flex-col space-y-4'>
              {/* Cabeçalho do Card */}
              <div className='flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center space-x-3'>
                    <h3 className='text-sm font-medium text-gray-900'>
                      Processo: {bid.processNumber}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        bid.opening
                      )}`}
                    >
                      {bid.opening}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getModalityColor(
                        bid.modality
                      )}`}
                    >
                      {bid.modality}
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-gray-500 line-clamp-2'>{bid.object}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => onEdit(bid)}
                    className='inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja remover esta licitação?')) {
                        if (bid.id !== undefined) {
                          onRemove(bid.id)
                        }
                      }
                    }}
                    className='inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                    Remover
                  </button>
                </div>
              </div>

              {/* Informações de Datas */}
              <div className='flex flex-wrap gap-2'>
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3 w-3 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  Publicação: {formatDate(bid.publicationDate)}
                </span>
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3 w-3 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  Abertura: {formatDateTime(bid.dispenseDate)}
                </span>
                {bid.postponement && (
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3 w-3 mr-1'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    Nova Data: {formatDateTime(bid.postponement)}
                  </span>
                )}
                {bid.canceled && (
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3 w-3 mr-1'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                    Anulada
                  </span>
                )}
              </div>

              {/* Links e Documentos */}
              <div className='flex items-center space-x-4 text-sm text-gray-500'>
                {bid.file && (
                  <a
                    href={bid.file}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center text-blue-600 hover:text-blue-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                      />
                    </svg>
                    Ver documento
                  </a>
                )}
                {bid.Url && (
                  <a
                    href={bid.Url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center text-blue-600 hover:text-blue-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                    Acessar processo
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BiddingList
