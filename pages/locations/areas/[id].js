import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { updateArea, viewArea } from "../../api/locations";
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

    updateArea(id, JSON.stringify({ name: data.area }))
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
    <main
      className={
        loading
          ? `mainContainer d-flex justify-content-center align-items-center`
          : `mainContainer `
      }
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {operation === "edit" && (
            <form onSubmit={(e) => submit(e)}>
              <div className="field--wrapper">
                <label className="label--global" htmlFor="area">
                  Area
                </label>
                <input
                  className="text--global"
                  name="area"
                  type="text"
                  placeholder="Area"
                  value={data.area}
                  onChange={(e) => onChangeHandler(e)}
                />
                <span className="invalid">
                  {errors.area ? errors.area : ""}
                </span>
                <span className="invalid">{backError}</span>
                <br />
                <button className="btn--global btn--forms">
                  {submitting ? t("submitting") : t("submit")}
                </button>
              </div>
            </form>
          )}
          {operation === "view" && (
            <article>
              <span className="label--global title">Area: </span>
              <span className="description">{data.area}</span>
            </article>
          )}
          <article>
            <span className="label--global title">Governate: </span>
            <span className="description">{data.governate}</span>
          </article>
          <article>
            <span className="label--global title">City: </span>
            <span className="description">{data.city}</span>
          </article>
        </>
      )}
    </main>
  );
};
Area.getLayout = function getLayout(page) {
  return (
    <Layout title="area-details" navTitle="area-details">
      {page}
    </Layout>
  );
};
export default Area;
