import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllOrders } from "../api/orders";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderNum, setOrderNum] = useState(2);

  useEffect(() => {
    getAllOrders()
      .then((res) => {
        setOrders(res.data.data);
        setColumnNames(Object.keys(res.data.data[0]));
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    setLoading(false);
  }, [orderNum]);

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
        <Table columnNames={columnNames} tableContent={orders} />
      )}
    </main>
  );
};
Orders.getLayout = function getLayout(page) {
  return <Layout title="Order">{page}</Layout>;
};

export default Orders;
