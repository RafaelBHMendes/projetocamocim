import Image from "next/image";
import LogoSAAE from "../../public/LogoSAAE.jpeg";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto p-4 px-28 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={LogoSAAE}
            alt="Logo SAAE"
            height={200}
            width={200}
            className="rounded-md"
          />
        </div>

        <span className="text-2xl font-bold">
          Sistema Autônomo de Água e Esgoto de Camocim
        </span>
      </div>
      <nav className="bg-blue-900">
        <div className="container mx-auto p-4 flex justify-center items-center space-x-6 font-semibold text-sm md:text-base">
          <a href="/" className="hover:text-blue-200 transition-colors">
            Início
          </a>
          <a href="/empresa" className="hover:text-blue-200 transition-colors">
            Empresa
          </a>
          <a href="/agua" className="hover:text-blue-200 transition-colors">
            Água
          </a>
          <a href="/esgoto" className="hover:text-blue-200 transition-colors">
            Esgoto
          </a>
          <a href="/biddings" className="hover:text-blue-200 transition-colors">
            Licitações
          </a>
          <a href="/servicos" className="hover:text-blue-200 transition-colors">
            Serviços
          </a>
          <a
            href="/educativo"
            className="hover:text-blue-200 transition-colors"
          >
            Educativo
          </a>
          <a
            href="/redes-sociais"
            className="hover:text-blue-200 transition-colors"
          >
            Redes Sociais
          </a>
          <a href="/imprensa" className="hover:text-blue-200 transition-colors">
            Imprensa
          </a>
          <a
            href="https://www.saaecamocimce.com.br/#/agencia/inicio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition-colors bg-blue-600 text-white py-2 px-4 rounded-full"
          >
            2º via/Serviços
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
