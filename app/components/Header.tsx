'use client'

import Image from 'next/image'
import LogoSAAEremovebg from '../../public/LogoSAAEremovebg.png'
import capa from '../../public/capa.png'
import atendimento from '../../public/atendimento.jpeg'
import comunicado_banner from '@/public/comunicado_banner.jpeg'
import { useState } from 'react'
import React from 'react'

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const handleImageClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setRedirect(true)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  React.useEffect(() => {
    if (redirect) {
      window.location.href = 'https://www.saaecamocimce.com.br/#/agencia/inicio'
    }
  }, [redirect])

  return (
    <header>
      <div className='bg-bluebanner text-white shadow-md'>
        <div className='container mx-8 p-4 flex justify-between items-center'>
          <Image src={LogoSAAEremovebg} alt='Logo SAAE' height={200} width={200} className='rounded-md' />
          <span className='mr-12 text-2xl font-bold'>Serviço Autônomo de Água e Esgoto de Camocim</span>
        </div>
      </div>
      <div className='bg-blue-700 text-white text-center '>
        <a onClick={handleImageClick} className='cursor-pointer' target='_blank' rel='noopener noreferrer'>
          <Image src={atendimento} alt='Portal de Serviços Autoatendimento' className='mx-auto cursor-pointer' layout='responsive' />
        </a>
      </div>
      <nav className='bg-bluemenu'>
        <div className='container mx-auto p-4 text-white flex justify-center items-center space-x-6 text-xs md:text-base'>
          <a href='/' className='hover:text-blue-500 transition-colors'>
            Início
          </a>
          <a href='/empresa' className='hover:text-blue-500 transition-colors'>
            Empresa
          </a>
          <a href='/agua' className='hover:text-blue-500 transition-colors'>
            Água
          </a>
          <a href='/esgoto' className='hover:text-blue-500 transition-colors'>
            Esgoto
          </a>
          <a href='/biddings' className='hover:text-blue-500 transition-colors'>
            Licitações
          </a>
          <a href='/servicos' className='hover:text-blue-500 transition-colors'>
            Serviços
          </a>
          <a href='/educativo' className='hover:text-blue-200 transition-colors'>
            Educativo
          </a>
          <a href='/redes-sociais' className='hover:text-blue-200 transition-colors'>
            Redes Sociais
          </a>
          <a href='/imprensa' className='hover:text-blue-200 transition-colors'>
            Imprensa
          </a>
        </div>
      </nav>

      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={handleOverlayClick}>
          <div className='bg-white p-4 rounded-lg relative w-11/12 md:w-1/2'>
            <button className='absolute top-1 right-4 text-red-600 text-3xl font-bold' onClick={handleCloseModal}>
              &times;
            </button>
            <Image src={comunicado_banner} alt='Comunicado Banner' className='mx-auto' width={800} height={200} />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
