const mockBiddings = [
  // Populate with mock data
  {
    processNumber: "1910.01/2023",
    object: "Publicação...",
    date: "16/11/2023",
    opening: "Aberta",
  },
  // More entries...
];

const BiddingsTable: React.FC<{ biddings: any[] }> = ({ biddings }) => {
  if (biddings.length === 0) {
    return <div className="text-center py-4">Não há resultados.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-blue-200 text-left">Nº Processo</th>
            <th className="py-2 px-4 bg-blue-200 text-left">Objeto</th>
            <th className="py-2 px-4 bg-blue-200 text-left">Data</th>
            <th className="py-2 px-4 bg-blue-200 text-left">Abertura</th>
            <th className="py-2 px-4 bg-blue-200 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {mockBiddings.map((bid, index) => (
            <tr key={index} className="text-center border-b">
              <td className="py-2 px-4">{bid.processNumber}</td>
              <td className="py-2 px-4">{bid.object}</td>
              <td className="py-2 px-4">{bid.date}</td>
              <td className="py-2 px-4">{bid.opening}</td>
              <td className="py-2 px-4">
                {/* Icons or buttons for actions */}
                <button className="text-blue-500 hover:text-blue-800">
                  ver
                </button>
                {/* Add more action buttons/icons as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BiddingsTable;
