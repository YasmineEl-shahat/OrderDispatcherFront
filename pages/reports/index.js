import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { useState, useEffect } from "react";
import { getAllReports } from "../api/reports";

const Roles = () => {
  const [loading, setLoading] = useState(true);
  const [Roles, setReports] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    getAllReports()
      .then((res) => {
        setColumnNames(Object.keys(res.data[0]));
        setReports(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
