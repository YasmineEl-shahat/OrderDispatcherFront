import Link from "next/link";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllDrivers } from "../api/drivers";
import { useState, useEffect } from "react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);

  // handlers

  const handleDelete = () => {};

  useEffect(() => {
    getAllDrivers()
      .then((res) => {
        let driversArray = [];
        res.data.forEach((driver) => {
          driversArray.push({
            id: driver._id,
            name: driver.driverName,
            status: driver.status,
            availability: driver.availability,
            email: driver.email,
            "phone number": driver.phoneNumber,
            "no. of orders": driver.orderCount,
          });
        });
        setDrivers(driversArray);
        setColumnNames(Object.keys(driversArray[0]));
      })
      .catch((error) => {
        console.log(error.response);
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
        <>
          <article className="addWrapper">
            <div></div>
            <Link href="/drivers?operation=add" passHref>
              <button className="btn--global ">Add New Driver</button>
            </Link>
          </article>
          <Table
            columnNames={columnNames}
            tableContent={drivers}
            canEdit={true}
            handleDelete={handleDelete}
          />
        </>
      )}
    </main>
  );
};
Drivers.getLayout = function getLayout(page) {
  return <Layout title="Driver">{page}</Layout>;
};

export default Drivers;
