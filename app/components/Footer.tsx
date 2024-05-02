// components/Footer.tsx
import React from "react";
import Image from "next/image";

import contact from "../../public/contact.png";
import location from "../../public/location.png";
import person from "../../public/person.png";
import phone from "../../public/phone.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap mx-10">
          {/* Primeira coluna */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h2 className="text-white text-lg font-semibold mb-4">
              INSTITUCIONAL
            </h2>
            <p className="text-gray-400 mb-2">
              Diretor: Leonardo Aguiar Frota Neves
            </p>
            <p className="text-gray-400 mb-2">CNPJ: 07.095.193/0001-50</p>
          </div>

          {/* Segunda coluna */}
          <div className="w-full lg:w-1/2 px-40">
            <h2 className="text-white text-lg font-semibold mb-4">
              INFORMAÇÕES DE CONTATO
            </h2>
            <p className="text-gray-400 mb-2">
              <span className="flex items-center">
                <Image
                  src={phone}
                  alt="Ícone de telefone"
                  width={20}
                  height={20}
                />
                <span className="ml-2">(88) 3621-1515</span>
              </span>
            </p>

            <p className="text-gray-400 mb-2">
              <span className="flex items-center">
                <Image
                  src={contact}
                  alt="Ícone de e-mail"
                  width={20}
                  height={20}
                />
                <span className="ml-2">leonardo@saaedecamocim.com.br</span>
              </span>
            </p>
            <p className="text-gray-400 mb-2">
              <span className="flex items-center">
                <Image
                  src={location}
                  alt="Ícone de localização"
                  className=" text-white"
                  width={20}
                  height={20}
                />
                <span className="ml-2">
                  R. Dr. João Thomé, 1103 - Centro, 62400-000
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Linha com margem */}
      <hr className="border-gray-700 my-8 mx-20" />

      {/* Direitos autorais com ano atual */}
      <div className="text-center text-gray-400">
        © {currentYear} SAAE DE CAMOCIM. TODOS OS DIREITOS RESERVADOS.
      </div>
    </footer>
  );
};

export default Footer;
