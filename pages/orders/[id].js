import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { viewOrder } from "../api/orders";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    viewOrder(id)
      .then((res) => {
        setOrderDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  const renderProductTableRows = () => {
    return orderDetails.Product.map(
      ({ product_id, name_en, quantity, price, _id }) => (
        <tr key={_id}>
          <td>{product_id}</td>
          <td>{name_en}</td>
          <td>{quantity}</td>
          <td>{price}</td>
          <td>{quantity * price}</td>
        </tr>
      )
    );
  };

  return (
    <main
      className={
        loading
          ? `mainContainer d-flex justify-content-center align-items-center`
          : `mainContainer `
      }
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="order">
          <h1>Order Details</h1>
          <table>
            <tbody>
              <tr>
                <td>Customer ID:</td>
                <td>{orderDetails.CustomerID}</td>
              </tr>
              <tr>
                <td>Customer Name:</td>
                <td>{orderDetails.CustomerName}</td>
              </tr>
              <tr>
                <td>Customer Email:</td>
                <td>{orderDetails.CustomerEmail}</td>
              </tr>
              <tr>
                <td>Payment Method:</td>
                <td>{orderDetails.PaymentMethod}</td>
              </tr>
              <tr>
                <td>Driver ID:</td>
                <td>{orderDetails.DriverID}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{`${orderDetails.Address.Governate}, ${orderDetails.Address.City}, ${orderDetails.Address.Area}`}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{orderDetails.Status}</td>
              </tr>
              <tr>
                <td>Total Price:</td>
                <td>{orderDetails.TotalPrice}</td>
              </tr>
            </tbody>
          </table>
          <h1>Order Products</h1>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>{renderProductTableRows()}</tbody>
          </table>
        </div>
      )}
    </main>
  );
};

Order.getLayout = function getLayout(page) {
  return <Layout title="Order">{page}</Layout>;
};

export default Order;
