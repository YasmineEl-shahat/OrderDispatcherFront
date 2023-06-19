import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllCustomers } from "../api/customers";
import { useState, useEffect } from "react";

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [shownNum, setShownNum] = useState(7);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getAllCustomers(shownNum, searchKey)
      .then((res) => {
        let customersArray = [];

        res.data.forEach((customer) => {
          customersArray.push({
            id: customer.CustomerID,
            name: customer.CustomerName,
            email: customer.CustomerEmail,
            address:
              customer.Address.Governate +
              ", " +
              customer.Address.City +
              ", " +
              customer.Address.Area,
          });
        });
        setColumnNames(Object.keys(customersArray[0]));
        setCustomers(customersArray);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [shownNum, searchKey]);

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
            tableContent={customers}
            num={shownNum}
            setNum={setShownNum}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        </>
      )}
    </main>
  );
};
Customers.getLayout = function getLayout(page) {
  return <Layout title="Customers">{page}</Layout>;
};

export default Customers;
