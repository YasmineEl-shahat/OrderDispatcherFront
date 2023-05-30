import Layout from "../../components/Layout";
const Order = () => {
  return <div>order details</div>;
};
Order.getLayout = function getLayout(page) {
  return <Layout title="Order">{page}</Layout>;
};
export default Order;
