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
  filter1_placeholder,
  filter2,
  filter2_list,
  setFilter2,
  filter2_placeholder,
  filter3,
  filter3_list,
  setFilter3,
  filter3_placeholder,
  num,
  setNum,
  total,
}) => {
  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row filter">
            <div className="col-sm-4">
              <h2>Filters</h2>
            </div>
            <div className="col-sm-4">
              <label> numbers of rows</label>
              <input
                type="number"
                value={num}
                min={1}
                onChange={(e) => setNum(e.target.value)}
                max={total}
              />
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
              {filter1_list && (
                <>
                  <div className="search-box">
                    <input
                      list="filter1"
                      placeholder={`${filter1_placeholder}...`}
                      className="form-select"
                      value={filter1}
                      onChange={(e) => setFilter1(e.target.value)}
                    />
                  </div>
                  <datalist id="filter1">
                    {filter1_list.map((filter1, index) => (
                      <option value={filter1} key={"filter1" + index}>
                        {filter1}
                      </option>
                    ))}
                  </datalist>
                </>
              )}
            </div>
            <div className="col-sm-4">
              {filter2_list && (
                <>
                  <div className="search-box">
                    <input
                      list="filter2"
                      placeholder={`${filter2_placeholder}...`}
                      className="form-select"
                      value={filter2}
                      onChange={(e) => setFilter2(e.target.value)}
                    />
                  </div>
                  <datalist id="filter2">
                    {filter2_list.map((filter2, index) => (
                      <option value={filter2} key={"filter2" + index}>
                        {filter2}
                      </option>
                    ))}
                  </datalist>
                </>
              )}
            </div>
            <div className="col-sm-4">
              {filter3_list && (
                <>
                  <div className="search-box">
                    <input
                      list="filter3"
                      placeholder={`${filter3_placeholder}...`}
                      className="form-select"
                      value={filter3}
                      onChange={(e) => setFilter3(e.target.value)}
                    />
                  </div>
                  <datalist id="filter3">
                    {filter3_list.map((filter3, index) => (
                      <option value={filter3} key={"filter3" + index}>
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
                <th key={"column" + index} scope="col">
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
                    return <td key={`${item.id} ${key}`}>{value}</td>;
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
