export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}