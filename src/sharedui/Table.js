import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Table = ({
  columnNames,
  tableContent,
  searchKey,
  setSearchKey,
  handleDelete,
  canEdit,
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
  setSelectedItem,
  location,
  notView,
}) => {
  const router = useRouter();

  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          {!notView && (
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
          )}

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
        {tableContent.length ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                {columnNames.map((column, index) => (
                  <th key={"column" + index} scope="col">
                    {column}
                  </th>
                ))}
                {!notView && <th>Actions</th>}
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
                    {!notView && (
                      <td>
                        <Link
                          href={
                            location
                              ? router.pathname +
                                "/" +
                                location +
                                "/" +
                                item.id +
                                "?operation=view"
                              : router.pathname +
                                "/" +
                                item.id +
                                "?operation=view"
                          }
                          passHref
                        >
                          <button
                            className="view"
                            title="View"
                            data-toggle="tooltip"
                          >
                            <i className="material-icons">&#xE417;</i>
                          </button>
                        </Link>

                        {canEdit && (
                          <Link
                            href={
                              location
                                ? router.pathname +
                                  "/" +
                                  location +
                                  "/" +
                                  item.id +
                                  "?operation=edit"
                                : router.pathname +
                                  "/" +
                                  item.id +
                                  "?operation=edit"
                            }
                            passHref
                          >
                            <button
                              className="edit"
                              title="Edit"
                              data-toggle="tooltip"
                            >
                              <i className="material-icons">&#xE254;</i>
                            </button>
                          </Link>
                        )}

                        {handleDelete && (
                          <button
                            className="delete"
                            title="Delete"
                            data-toggle="tooltip"
                            onClick={() => {
                              setSelectedItem(item);
                              handleDelete();
                            }}
                          >
                            <i className="material-icons ">&#xE872;</i>
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <section className="no-data invalid">
            <Image
              alt="empty"
              width={400}
              height={400}
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9e826e104101523.5f5b6309548e8.jpg"
            />
            <p className="">No data found</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Table;
