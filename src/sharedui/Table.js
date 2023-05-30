const Table = ({ columnNames, tableContent, handleDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columnNames.map((column, index) => (
            <th key={index} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableContent.map((item) => {
          const keys = Object.keys(item);
          return (
            <tr key={item.id}>
              {keys.map((key) => {
                const value = item[key];
                return <td key={key}>{value}</td>;
              })}
              <td>
                {handleDelete && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
