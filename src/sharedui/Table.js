const Table = ({
  columnNames,
  tableContent,
  searchKey,
  setSearchKey,
  handleDelete,
  handleEdit,
  filter1,
  filter1_list,
  setFilter1,
  filter2,
  filter2_list,
  setFilter2,
  filter3,
  filter3_list,
  setFilter3,
}) => {
  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-8">
              <h2>Filters</h2>
            </div>
            {searchKey !== undefined && (
              <div className="col-sm-4">
                <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search&hellip;"
                    onChange={(e) => setSearchKey(e.target.value)}
                    value={searchKey}
                  />
                </div>
              </div>
            )}
          </div>
          <br />
          <div className="row">
            <div className="col-sm-4">
              {/* <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter One&hellip;"
                  />
                </div> */}
              {filter1_list && (
                <>
                  <input
                    list="filter1"
                    placeholder="Select&hellip;"
                    className="txt"
                    value={filter1}
                    onChange={(e) => setFilter1(e.target.value)}
                  />
                  <datalist id="filter1">
                    {filter1_list.map((filter1, index) => (
                      <option value={filter1} key={index}>
                        {filter1}
                      </option>
                    ))}
                  </datalist>
                </>
              )}
            </div>
            <div className="col-sm-4">
              {/* <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter Two &hellip;"
                  />
                </div> */}
              {filter2_list && (
                <>
                  <input
                    list="filter2"
                    placeholder="Select&hellip;"
                    className="txt"
                    value={filter2}
                    onChange={(e) => setFilter2(e.target.value)}
                  />
                  <datalist id="filter2">
                    {filter2_list.map((filter2, index) => (
                      <option value={filter2} key={index}>
                        {filter2}
                      </option>
                    ))}
                  </datalist>
                </>
              )}
            </div>
            <div className="col-sm-4">
              {/* <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter One&hellip;"
                  />
                </div> */}
              {filter3_list && (
                <>
                  <input
                    list="filter3"
                    placeholder="Select&hellip;"
                    className="txt"
                    value={filter3}
                    onChange={(e) => setFilter3(e.target.value)}
                  />
                  <datalist id="filter3">
                    {filter3_list.map((filter3, index) => (
                      <option value={filter3} key={index}>
                        {filter3}
                      </option>
                    ))}
                  </datalist>
                </>
              )}
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
                    {handleEdit && (
                      <a
                        href="#"
                        className="edit"
                        title="Edit"
                        data-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE254;</i>
                      </a>
                    )}

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
  );
};

export default Table;
