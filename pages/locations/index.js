import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllLocations } from "../api/locations";
import { useState, useEffect } from "react";
import { useTranslation } from "../../util/useTranslation";
import Link from "next/link";

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

  const { t } = useTranslation();

  // handlers
  const handleTabClick = (data, index) => {
    setLocation(data);
    setActiveIndex(index);
  };

  const handleDelete = () => {};

  useEffect(() => {
    getAllLocations(location, shownNumber, searchKey)
      .then((res) => {
        setTotalLocations(res.data.totalCount);

        setColumnNames(Object.keys(res.data.location[0]));
        setLocations(res.data.location);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, [location, shownNumber, searchKey]);

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
            <Link href="/locations?operation=add" passHref>
              <button className="btn--global ">Add New Location</button>
            </Link>
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
            canEdit={true}
            handleDelete={handleDelete}
          />
        </>
      )}
    </main>
  );
};
Locations.getLayout = function getLayout(page) {
  return <Layout title="Locations">{page}</Layout>;
};

export default Locations;
