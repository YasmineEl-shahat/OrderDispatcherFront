import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllOrders } from "../api/orders";
import { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderNum, setOrderNum] = useState(7);
  const [searchKey, setSearchKey] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    getAllOrders(orderNum, searchKey)
      .then((res) => {
        let ordersArray = [];
        setTotalOrders(res.data.totalOrders);
        res.data.data.forEach((order) => {
          ordersArray.push({
            "Order Code": order._id,
            "Customer Name": order.CustomerName,
            Governate: order.Address.Governate,
            City: order.Address.City,
            Status: order.Status,
            "Payment Method": order.PaymentMethod,
          });
        });
        setOrders(ordersArray);
        setColumnNames([
          "Order Code",
          "Customer Name",
          "Governate",
          "City",
          "Status",
          "Payment Method",
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
      });
  }, [orderNum, searchKey]);

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
        <Table
          columnNames={columnNames}
          tableContent={orders}
          searchKey={searchKey}
          num={orderNum}
          total={totalOrders}
          setSearchKey={setSearchKey}
          setNum={setOrderNum}
        />
      )}
    </main>
  );
};
Orders.getLayout = function getLayout(page) {
  return <Layout title="Order">{page}</Layout>;
};

export default Orders;
