import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllLocations } from "../api/locations";
import { useState, useEffect } from "react";
import { useTranslation } from "../../util/useTranslation";

const Locations = () => {
  const tabData = ["governate", "cities", "areas"];

  const [location, setLocation] = useState(tabData[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locations, setLocations] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shownNumber, setShownNumber] = useState(7);
  const [searchKey, setSearchKey] = useState("");

  const { t } = useTranslation();

  // handlers
  const handleTabClick = (data, index) => {
    setLocation(data);
    setActiveIndex(index);
  };

  useEffect(() => {
    getAllLocations(location, shownNumber, searchKey)
      .then((res) => {
        console.log(res);
        let arrayOfLocations = [];
        res.data.forEach((l) => {
          arrayOfLocations.push({ name: l });
        });
        setColumnNames(["Name"]);
        setLocations(arrayOfLocations);
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
