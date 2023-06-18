import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { addDriver } from "../../api/drivers";
import { getAllAreas } from "../../api/locations";
import Spinner from "../../../components/Spinner";
import DriverForm from "../../../src/sharedui/forms/driverForm";

const AddDriver = () => {
  const router = useRouter();
  const {
    data,
    backError,
    errors,
    onChangeHandler,
    submitting,
    setSubmitting,
    setBackError,
    setData,
  } = useContext(AuthContext);

  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  useEffect(() => {
    setData({});
    getAllAreas()
      .then((res) => {
        let areasArray = res.data.location.map((area) => ({
          value: area.id,
          label: area.name,
        }));
        setAreas(areasArray);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    let newData = { ...data };
    newData["areas"] = selectedAreas.map((area) => area.value);
    setData(newData);

    addDriver(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        setData({});
        router.replace("/drivers");
        setBackError("");
      })
      .catch((error) => {
        setBackError(error.response.data.message);
        setSubmitting(false);
      });
  };
  return (
    <main
      className={
        loading
          ? `mainContainer d-flex justify-content-center align-items-center`
          : `mainContainer formContainer`
      }
    >
      {loading ? (
        <Spinner />
      ) : (
        <DriverForm
          data={data}
          errors={errors}
          backError={backError}
          onChangeHandler={onChangeHandler}
          submit={submit}
          areas={areas}
          submitting={submitting}
          t={t}
          setSelectedAreas={setSelectedAreas}
        />
      )}
    </main>
  );
};
AddDriver.getLayout = function getLayout(page) {
  return <Layout title="Add Driver">{page}</Layout>;
};
export default AddDriver;
