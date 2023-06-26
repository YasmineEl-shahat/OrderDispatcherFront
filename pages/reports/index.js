import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { useState, useEffect } from "react";
import { getAllReports } from "../api/reports";

const Roles = () => {
  const [loading, setLoading] = useState(true);
  const [Roles, setReports] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    getAllReports(searchKey, sortValue)
      .then((res) => {
        setColumnNames(Object.keys(res.data[0]));
        setReports(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [searchKey, sortValue]);

  return (
    <main
      className={
        loading
          ? `mainContainer d-flex justify-content-center align-items-center`
          : `mainContainer`
      }
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Table
            columnNames={columnNames}
            tableContent={Roles}
            notView={true}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            filter1_list={["asc", "desc"]}
            filter1={sortValue}
            setFilter1={setSortValue}
            filter1_placeholder={"Sort"}
          />
        </>
      )}
    </main>
  );
};
Roles.getLayout = function getLayout(page) {
  return <Layout title="Roles">{page}</Layout>;
};

export default Roles;
