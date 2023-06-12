import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllOrders } from "../api/orders";
import { useState, useEffect } from "react";

// Where to Call the orders endpoint
// HACK -> In useEffect
// ===============

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// const receivedOrders = getAllOrders();
		// setOrders(receivedOrders);

		// TODO >> Call the getall Orders Endpoint
		getAllOrders()
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				
			});

		setTimeout(() => {
			setOrders([
				{ id: 1, name: "dddd" },
				{ id: 2, name: "dddd" },
			]);
			setLoading(false);
		}, 3000);
	}, []);

	const columnNames = ["id", "name"];

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
