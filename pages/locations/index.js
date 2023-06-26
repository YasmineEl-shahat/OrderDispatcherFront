import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { deleteLocation, getAllLocations } from "../api/locations";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "../../util/useTranslation";
import Link from "next/link";
import CustomModal from "../../src/sharedui/modal";
import AuthContext from "../../context/AuthContext";

const Locations = () => {
  const tabData = ["governates", "cities", "areas"];

  const [location, setLocation] = useState(tabData[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locations, setLocations] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shownNumber, setShownNumber] = useState(7);
  const [totalLocations, setTotalLocations] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { permissions } = useContext(AuthContext);

  const { t } = useTranslation();

  // handlers
  const handleTabClick = (data, index) => {
    setLocation(data);
    setActiveIndex(index);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteLocation(location, selectedLocation.id);
    setIsModalOpen(false);
    let newLocations = locations.filter(
      (location) => location.id != selectedLocation.id
    );
    setLocations(newLocations);
    setShownNumber(shownNumber - 1);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllLocations(location, shownNumber, searchKey)
      .then((res) => {
        setLoading(true);
        setTotalLocations(res.data.totalCount);
        setColumnNames(Object.keys(res.data.location[0]));
        setLocations(res.data.location);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location, shownNumber, searchKey]);

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
              {permissions?.locations?.add && (
                <Link href="/locations/add" passHref>
                  <button className="btn--global ">Add New Location</button>
                </Link>
              )}
            </article>
            <section className="tabWrapper">
              {tabData.map((data, index) => (
                <span
                  onClick={() => handleTabClick(data, index)}
                  className={`col-4 ${index === activeIndex ? "active" : ""}`}
                  key={data}
                >
                  {t(data)}
                </span>
              ))}
            </section>

            <Table
              columnNames={columnNames}
              tableContent={locations}
              num={shownNumber}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              setNum={setShownNumber}
              total={totalLocations}
              canEdit={permissions?.locations?.edit}
              handleDelete={
                permissions?.locations?.delete ? handleDelete : false
              }
              setSelectedItem={setSelectedLocation}
              location={location}
            />
          </>
        )}
      </main>
      <CustomModal
        isModalOpen={isModalOpen}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        name={selectedLocation.name}
      />
    </>
  );
};
Locations.getLayout = function getLayout(page) {
  return <Layout title="Locations">{page}</Layout>;
};

export default Locations;
