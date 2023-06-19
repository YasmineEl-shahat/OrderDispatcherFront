import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { useTranslation } from "../util/useTranslation";
import {
  getAssignOrders,
  getCancelledOrders,
  getDeliveredOrders,
  getNewOrders,
  getPickedOrders,
  getReassignOrders,
  getTotalOrders,
} from "./api/statistics";

import { Pie, Line } from "react-chartjs-2";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [canceledOrders, setCanceledOrders] = useState(0);
  const [pickedOrders, setPickedOrders] = useState(0);
  const [assignOrders, setAssignOrders] = useState(0);
  const [reassignOrders, setReassignOrders] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    getTotalOrders()
      .then((res) => {
        setLoading(true);
        setTotalOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getNewOrders()
      .then((res) => {
        setLoading(true);
        setNewOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getDeliveredOrders()
      .then((res) => {
        setLoading(true);
        setDeliveredOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getCancelledOrders()
      .then((res) => {
        setLoading(true);
        setCanceledOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getPickedOrders()
      .then((res) => {
        setLoading(true);
        setPickedOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getAssignOrders()
      .then((res) => {
        setLoading(true);
        setAssignOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    getReassignOrders()
      .then((res) => {
        setLoading(true);
        setReassignOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
          <h1 className="headline">{t("overview")}</h1>
          <section className="overview">
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-check-double"></i> total orders
              </h3>
              <h2>{totalOrders}</h2>
            </article>
            <article className="purple-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-rss"></i> new orders
              </h3>
              <h2>{newOrders}</h2>
            </article>
            <article className="purple-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-truck"></i> delivered orders
              </h3>
              <h2>{deliveredOrders}</h2>
            </article>
            <article className="purple-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-ban"></i> canceled orders
              </h3>
              <h2>{canceledOrders}</h2>
            </article>
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-truck-fast"></i> picked orders
              </h3>
              <h2>{pickedOrders}</h2>
            </article>
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-check-to-slot"></i> assigned orders
              </h3>
              <h2>{assignOrders}</h2>
            </article>
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-list-check"></i> reassigned orders
              </h3>
              <h2>{reassignOrders}</h2>
            </article>
          </section>

          <section className="charts">
            {/* <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Total Orders",
                    data: [totalOrders, 20, 30, 40, 50, 60, 70],
                    fill: false,
                    borderColor: "#4BC0C0",
                  },
                  {
                    label: "New Orders",
                    data: [newOrders, 10, 20, 30, 40, 50, 60],
                    fill: false,
                    borderColor: "#36A2EB",
                  },
                  {
                    label: "Delivered Orders",
                    data: [deliveredOrders, 5, 10, 15, 20, 25, 30],
                    fill: false,
                    borderColor: "#FFCE56",
                  },
                  {
                    label: "Canceled Orders",
                    data: [canceledOrders, 2, 4, 6, 8, 10, 12],
                    fill: false,
                    borderColor: "#E7E9ED",
                  },
                ],
              }}
            /> */}
            <Pie
              data={{
                labels: [
                  "Total Orders",
                  "New Orders",
                  "Delivered Orders",
                  "Canceled Orders",
                  "Picked Orders",
                  "Assigned Orders",
                  "Reassigned Orders",
                ],
                datasets: [
                  {
                    data: [
                      totalOrders,
                      newOrders,
                      deliveredOrders,
                      canceledOrders,
                      pickedOrders,
                      assignOrders,
                      reassignOrders,
                    ],
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#E7E9ED",
                      "#4BC0C0",
                      "#9966FF",
                      "#FF9F40",
                    ],
                    hoverBackgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#E7E9ED",
                      "#4BC0C0",
                      "#9966FF",
                      "#FF9F40",
                    ],
                  },
                ],
              }}
            />
          </section>
        </>
      )}
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout title="home">{page}</Layout>;
};

export default Home;
