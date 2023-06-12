const Table = ({ columnNames, tableContent, handleDelete }) => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>Filters</h2>
              </div>
              <div className="col-sm-4">
                <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search&hellip;"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-8">
                <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter One&hellip;"
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter Two &hellip;"
                  />
                </div>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                {columnNames.map((column, index) => (
                  <th key={index} scope="col">
                    {column}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableContent.map((item) => {
                const keys = Object.keys(item);
                return (
                  <tr key={item.id}>
                    {keys.map((key) => {
                      const value = item[key];
                      return (
                        <td key={key}>
                          {typeof value === "object" && value !== null
                            ? JSON.stringify(value)
                            : value}
                        </td>
                      );
                    })}
                    <td>
                      <a
                        href="#"
                        className="view"
                        title="View"
                        data-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE417;</i>
                      </a>
                      <a
                        href="#"
                        className="edit"
                        title="Edit"
                        data-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE254;</i>
                      </a>
                      {handleDelete && (
                        <button
                          className="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
