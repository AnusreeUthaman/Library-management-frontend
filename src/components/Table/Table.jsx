import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-md p-6">
      <table className="min-w-full  text-sm text-left ">
        <thead >
          <tr className=" text-gray-400  ">
            {columns.map((col) => (
              <th key={col.key} className="py-3 px-4 border-gray-400 text-left">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowId) => (
              <tr key={rowId} className="border-b border-gray-200 hover:bg-gray-300 text-gray-600 transition">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 ">
                    {col.render ? col.render(row) : row[col.key] || '-'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 text-center text-gray-500"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;