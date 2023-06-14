import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllDrivers } from "../api/drivers";
import { useState, useEffect } from "react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDrivers()
      .then((res) => {
        setDrivers(res.data);
        setColumnNames(Object.keys(res.data[0]));
      })
      .catch((error) => {
        console.log(error.response);
      });
    setLoading(false);
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
        <Table columnNames={columnNames} tableContent={drivers} />
      )}
    </main>
  );
};
Drivers.getLayout = function getLayout(page) {
  return <Layout title="Driver">{page}</Layout>;
};

export default Drivers;
