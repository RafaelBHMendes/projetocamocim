const Breadcrumbs: React.FC = () => {
  // Adjust the links and names as necessary
  const paths = [
    { name: "Início", href: "/" },
    { name: "Licitações", href: "/biddings" },
  ];

  return (
    <nav className="bg-blue-500 p-3 text-white">
      <ol className="list-reset flex">
        {paths.map((path, index) => (
          <li
            key={index}
            className={index === paths.length - 1 ? "font-bold" : ""}
          >
            {index > 0 && " / "}
            <a href={path.href} className="text-white hover:text-blue-200">
              {path.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
