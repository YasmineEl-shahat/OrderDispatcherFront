import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { updateArea, viewArea } from "../../api/locations";
import LocaitonForm from "../../../src/sharedui/forms/locaitonForm";
import Spinner from "../../../components/Spinner";

const Area = () => {
  const router = useRouter();
  const { id, operation } = router.query;
  const [loading, setLoading] = useState(true);

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
    console.log(id);
    viewArea(id)
      .then((res) => {
        setData(res.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    updateArea(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        setData({});
        router.replace("/locations");
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
        <LocaitonForm
          data={data}
          errors={errors}
          backError={backError}
          onChangeHandler={onChangeHandler}
          submit={operation === "edit" ? submit : false}
          viewOnly={operation === "view"}
          submitting={submitting}
          t={t}
        />
      )}
    </main>
  );
};
Area.getLayout = function getLayout(page) {
  return <Layout title="Area">{page}</Layout>;
};
export default Area;
