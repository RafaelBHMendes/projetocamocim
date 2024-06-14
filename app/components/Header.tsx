import Image from "next/image";
import LogoSAAEremovebg from "../../public/LogoSAAEremovebg.png";
import capa from "../../public/capa.png";
import atendimento from "../../public/atendimento.jpeg";

const Header: React.FC = () => {
  return (
    <header>
      <div className="bg-bluebanner text-white shadow-md">
        <div className="container mx-8 p-4 flex justify-between items-center">
          <Image
            src={LogoSAAEremovebg}
            alt="Logo SAAE"
            height={200}
            width={200}
            className="rounded-md"
          />
          <span className="mr-12 text-2xl font-bold">
            Serviço Autônomo de Água e Esgoto de Camocim
          </span>
        </div>
      </div>
      <div className="bg-blue-700 text-white text-center ">
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
      <nav className="bg-bluemenu">
        <div className="container mx-auto p-4 text-white flex justify-center items-center space-x-6 text-xs md:text-base">
          <a href="/" className="hover:text-blue-500 transition-colors">
            Início
          </a>
          <a href="/empresa" className="hover:text-blue-500 transition-colors">
            Empresa
          </a>
          <a href="/agua" className="hover:text-blue-500 transition-colors">
            Água
          </a>
          <a href="/esgoto" className="hover:text-blue-500 transition-colors">
            Esgoto
          </a>
          <a href="/biddings" className="hover:text-blue-500 transition-colors">
            Licitações
          </a>
          <a href="/servicos" className="hover:text-blue-500 transition-colors">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
