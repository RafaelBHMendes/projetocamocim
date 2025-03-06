import Link from 'next/link'

const Breadcrumbs = () => {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-2'>
        <li className='inline-flex items-center'>
          <Link
            href='/'
            className='text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200'
          >
            Início
          </Link>
        </li>
        <li>
          <div className='flex items-center'>
            <svg className='w-5 h-5 text-gray-400' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-gray-800 text-sm font-semibold'>Licitações</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumbs
