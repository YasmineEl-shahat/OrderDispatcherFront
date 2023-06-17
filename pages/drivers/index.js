import Link from "next/link";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { deleteDriver, getAllDrivers } from "../api/drivers";
import { useState, useEffect } from "react";
import CustomModal from "../../src/sharedui/modal";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverNum, setDriverNum] = useState(7);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [selectedDriver, setSelectedDriver] = useState({});

  // handlers
  const handleSetActive = (e) => {
    setActive(e.target.value === "active");
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteDriver(selectedDriver.id);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllDrivers(driverNum, searchKey)
      .then((res) => {
        let driversArray = [];
        setTotalDrivers(res.data.totalCount);
        res.data.data.forEach((driver) => {
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
  }, [driverNum, searchKey]);

  return (
    <>
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
              num={driverNum}
              setNum={setDriverNum}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              total={totalDrivers}
            />
          </>
        )}
      </main>
      <CustomModal
        isModalOpen={isModalOpen}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        name={selectedDriver.name}
      />
    </>
  );
};
Drivers.getLayout = function getLayout(page) {
  return <Layout title="Driver">{page}</Layout>;
};

export default Drivers;
