import Image from "next/image";
import LogoSAAE from "../../public/LogoSAAE.jpeg";
import atendimento from "../../public/atendimento.png";

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Image
            src={LogoSAAE}
            alt="Logo SAAE"
            height={180}
            width={180}
            className="rounded-md"
          />
          <span className="mr-12 text-2xl font-bold">
            Serviço Autônomo de Água e Esgoto de Camocim
          </span>
        </div>
      </div>
      <div className="bg-blue-900 text-white text-center py-8">
        <a
          href="https://www.saaecamocimce.com.br/#/agencia/inicio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={atendimento}
            alt="Portal de Serviços Autoatendimento"
            className="mx-auto cursor-pointer"
            layout="responsive"
          />
        </a>
      </div>
      <nav className="bg-blue-700">
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
