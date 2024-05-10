import Image from "next/image";
import LogoSAAE from "../../public/LogoSAAE.jpeg";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-white  to-blue-200 text-black p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={LogoSAAE}
            alt="Logo SAAE"
            height={200}
            width={200}
            className="rounded-md"
          />
        </div>
        <div className="flex items-center space-x-6 font-semibold text-sm md:text-base">
          <a href="/news" className="hover:text-cyan-600 transition-colors">
            Notícias
          </a>
          <a
            href="/transparency"
            className="hover:text-cyan-600 transition-colors"
          >
            Transparência
          </a>
          <a href="/biddings" className="hover:text-cyan-600 transition-colors">
            Licitações
          </a>
          <a
            href="/water-quality"
            className="hover:text-cyan-600 transition-colors"
          >
            Qualidade da Água
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
