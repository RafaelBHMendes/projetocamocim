import React from "react";

interface NoticeProps {
  titulo: string;
  subtitulo: string;
  texto: string;
  data: string;
  link: string;
}

const Notices: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Nossas Notícias</h2>

      <div className="flex flex-col gap-4">
        <Noticia
          titulo="Em Construção"
          subtitulo="Breve descrição"
          texto="Detalhes da notícia em construção..."
          data="2024-05-01"
          link="#"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Noticia
          titulo="Em Construção"
          subtitulo="Breve descrição"
          texto="Detalhes da notícia em construção..."
          data="2024-05-01"
          link="#"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Noticia
          titulo="Em Construção"
          subtitulo="Breve descrição"
          texto="Detalhes da notícia em construção..."
          data="2024-05-01"
          link="#"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Noticia
          titulo="Em Construção"
          subtitulo="Breve descrição"
          texto="Detalhes da notícia em construção..."
          data="2024-05-01"
          link="#"
        />
      </div>

      <div className="text-center mt-4">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Veja mais notícias
        </a>
      </div>
    </div>
  );
};

const Noticia: React.FC<NoticeProps> = ({
  titulo,
  subtitulo,
  texto,
  data,
  link,
}) => {
  return (
    <article className="border border-gray-300 rounded-md p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold mb-2">{titulo}</h3>
      <p className="text-gray-600 mb-2">{subtitulo}</p>
      <p className="text-gray-800">{texto}</p>
      <time className="flex items-center mt-2 text-gray-600">
        <span className="mr-2">Publicado em:</span>
        <span className="text-gray-800">{data}</span>
      </time>
      <a
        href={link}
        className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-4 transition-colors"
        aria-label={`Leia mais sobre ${titulo}`}
      >
        Leia mais
      </a>
    </article>
  );
};

export default Notices;
