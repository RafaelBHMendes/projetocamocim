import Image from "next/image";

import LogoSAAE from "../../public/LogoSAAE.jpeg";

const Header: React.FC = () => {
  return (
    <header className="bg-white text-black p-4 border-spacing-2 shadow-md">
      <nav className="container mx-auto flex justify-around">
        <div>
          <Image src={LogoSAAE} alt={"Logo"} height={300} width={300} />
        </div>
        <div className="flex space-x-4 self-center font-semibold gap-6">
          {/* Replace # with actual paths */}
          <a href="#" className="hover:underline">
            Notícias
          </a>
          <a href="#" className="hover:underline">
            Transparência
          </a>
          <a href="/biddings" className="hover:underline">
            Licitações
          </a>
          <a href="#" className="hover:underline">
            Qualidade Da Água
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
