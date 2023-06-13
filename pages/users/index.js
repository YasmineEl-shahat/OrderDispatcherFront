import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllUsers } from "../api/users";
import { useState, useEffect } from "react";

const Users = () => {
	const [users, setUsers] = useState([]);
	const [columnNames, setColumnNames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllUsers()
			.then((res) => {
				let firstObject = res.data[0];
        let arrayOfusers  = res.data ; 
        console.log(arrayOfusers) ; 
        console.log("=============") ; 
				console.log(res.data);
				setColumnNames(Object.keys(firstObject));
        setUsers(arrayOfusers) ; 
			})
			.catch((error) => {
				console.log(error.response.data.message);
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
				<Table columnNames={columnNames} tableContent={users} />
			)}
		</main>
	);
};
Users.getLayout = function getLayout(page) {
	return <Layout title="Users">{page}</Layout>;
};

export default Users;