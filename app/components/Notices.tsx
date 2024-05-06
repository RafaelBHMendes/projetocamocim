import React from "react";

interface NoticeProps {
  titulo: string;
  subtitulo: string;
  texto: string;
  data: string;
  link: string;
}

const Notices = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">NOSSAS NOTÍCIAS</h2>

      <div className="flex flex-col gap-4">
        <Noticia titulo="Em Construção" subtitulo="" texto="" data="" link="" />
      </div>

      <div className="text-center mt-4">
        <a
          href="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          VEJA MAIS NOTÍCIAS
        </a>
      </div>
    </div>
  );
};

const Noticia = ({ titulo, subtitulo, texto, data, link }: NoticeProps) => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <h3 className="text-lg font-bold mb-2">{titulo}</h3>
      <p className="text-gray-600 mb-2">{subtitulo}</p>
      <p className="text-gray-800">{texto}</p>
      <div className="flex items-center mt-2">
        <p className="text-gray-600 mr-2">Publicado em:</p>
        <span className="text-gray-800">{data}</span>
      </div>
      <a
        href={link}
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
      >
        Leia mais
      </a>
    </div>
  );
};

export default Notices;
