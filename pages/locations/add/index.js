import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { addLocation } from "../../api/locations";
import LocationForm from "../../../src/sharedui/forms/locationForm";

const AddLocation = () => {
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

  useEffect(() => {
    setData({});
    // eslint-disable-next-line
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    addLocation(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        setData({});
        setBackError("");
        router.replace("/locations");
      })
      .catch((error) => {
        setBackError(error.response.data.message);
        setSubmitting(false);
      });
  };
  return (
    <main className={`mainContainer formContainer`}>
      <LocationForm
        data={data}
        errors={errors}
        backError={backError}
        onChangeHandler={onChangeHandler}
        submit={submit}
        submitting={submitting}
        t={t}
      />
    </main>
  );
};
AddLocation.getLayout = function getLayout(page) {
  return <Layout title="Add Location">{page}</Layout>;
};
export default AddLocation;
