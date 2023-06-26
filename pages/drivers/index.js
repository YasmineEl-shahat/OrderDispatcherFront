import Link from "next/link";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { deleteDriver, getAllDrivers } from "../api/drivers";
import { useState, useEffect, useContext } from "react";
import CustomModal from "../../src/sharedui/modal";
import AuthContext from "../../context/AuthContext";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverNum, setDriverNum] = useState(7);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [selectedDriver, setSelectedDriver] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { permissions } = useContext(AuthContext);

  // handlers
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteDriver(selectedDriver.id);
    setIsModalOpen(false);
    let newDrivers = drivers.filter((driver) => driver.id != selectedDriver.id);
    setDrivers(newDrivers);
    setDriverNum(driverNum - 1);
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
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
              {permissions?.drivers?.add && (
                <Link href="/drivers/add" passHref>
                  <button className="btn--global ">Add New Driver</button>
                </Link>
              )}
            </article>
            <Table
              columnNames={columnNames}
              tableContent={drivers}
              canEdit={permissions?.drivers?.edit}
              handleDelete={permissions?.drivers?.delete ? handleDelete : false}
              num={driverNum}
              setNum={setDriverNum}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              total={totalDrivers}
              setSelectedItem={setSelectedDriver}
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
