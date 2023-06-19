import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import {
  assignOrder,
  getAllOrders,
  getAllStatuses,
  saveOrder,
} from "../api/orders";
import { useState, useEffect } from "react";
// import { generalSocket } from "../api/io";
import { channel } from "../api/pusher";
import { getAllCities, getAllGovernates } from "../api/locations";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [governates, setGovernates] = useState([]);
  const [cities, setCities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orderNum, setOrderNum] = useState(7);
  const [searchKey, setSearchKey] = useState("");
  const [governate, setGovernate] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const getData = () => {
    getAllOrders(orderNum, searchKey, governate, city, status)
      .then((res) => {
        let ordersArray = [];
        setTotalOrders(res.data.totalOrders);
        if (orderNum > res.data.totalOrders) setOrderNum(res.data.totalOrders);
        res.data.data.forEach((order) => {
          ordersArray.push({
            id: order._id,
            "Customer Name": order.CustomerName,
            Governate: order.Address.Governate,
            City: order.Address.City,
            Status: order.Status,
            "Total Price": order.TotalPrice + "$",
            "Payment Method": order.PaymentMethod,
          });
        });
        setOrders(ordersArray);

        setColumnNames(Object.keys(ordersArray[0]));
        getAllGovernates()
          .then((res) => {
            let locations = [];
            res.data.location.forEach((loc) => {
              locations.push(loc.name);
            });
            setGovernates(locations);
          })
          .catch((error) => {
            console.log(error);
          });
        getAllCities()
          .then((res) => {
            let locations = [];
            res.data.location.forEach((loc) => {
              locations.push(loc.name);
            });
            setCities(locations);
          })
          .catch((error) => {
            console.log(error);
          });
        getAllStatuses()
          .then((res) => {
            setStatuses(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [orderNum, searchKey, governate, city, status]);

  // useEffect(() => {
  //   generalSocket.on("newOrder", async (orderData) => {
  //     try {
  //       // Send a request to orderController.saveOrder()
  //       saveOrder(orderData);

  //       // Send a request to orderController.getall()
  //       getData();

  //       assignOrder(orderData._id);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   });
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    channel.bind("newOrder", function (orderData) {
      try {
        // Send a request to orderController.saveOrder()
        saveOrder(orderData);

        // Send a request to orderController.getall()
        getData();

        assignOrder(orderData._id);
      } catch (error) {
        console.error("Error:", error);
      }
    });
    // eslint-disable-next-line
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
        <Table
          columnNames={columnNames}
          tableContent={orders}
          searchKey={searchKey}
          num={orderNum}
          total={totalOrders}
          filter1_list={governates}
          filter2_list={cities}
          filter3_list={statuses}
          filter1_placeholder="Governate"
          filter2_placeholder="City"
          filter3_placeholder="Status"
          filter1={governate}
          filter2={city}
          filter3={status}
          setFilter1={setGovernate}
          setFilter2={setCity}
          setFilter3={setStatus}
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
