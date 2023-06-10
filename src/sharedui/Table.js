const Table = ({ columnNames, tableContent, handleDelete }) => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>
                  <b>Details</b>
                </h2>
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
          <table className="table table-striped table-hover table-bordered">
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
          <div className="clearfix">
            <div className="hint-text">
              Showing <b>1</b> out of <b>1</b> entries
            </div>
            <ul className="pagination">
              <li className="page-item disabled">
                <a href="#">
                  <i className="fa fa-angle-double-left"></i>
                </a>
              </li>
              <li className="page-item active">
                <a href="#" className="page-link">
                  1
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  2
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
