import Layout from "../components/Layout";
import Table from "../src/sharedui/Table";
import { getAllOrders } from "./api/orders";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // const receivedOrders = getAllOrders();
    // setOrders(receivedOrders);
    setOrders([
      { id: 1, name: "dddd" },
      { id: 2, name: "dddd" },
    ]);
  }, []);

  const columnNames = ["id", "name"];

  return <Table columnNames={columnNames} tableContent={orders} />;
};
Orders.getLayout = function getLayout(page) {
  return <Layout title="Order">{page}</Layout>;
};

export default Orders;
