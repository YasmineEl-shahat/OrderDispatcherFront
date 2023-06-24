import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { updateCity, viewCity } from "../../api/locations";
import Spinner from "../../../components/Spinner";

const City = () => {
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

  const noData = Object.keys(router.query).length === 0;

  useEffect(() => {
    if (!noData)
      viewCity(id)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

    // eslint-disable-next-line
  }, [noData]);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    updateCity(id, JSON.stringify({ name: data.city }))
      .then((res) => {
        setSubmitting(false);
        setBackError("");
        setData({});
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
                <label className="label--global" htmlFor="city">
                  City
                </label>
                <input
                  className="text--global"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={data.city}
                  onChange={(e) => onChangeHandler(e)}
                />
                <span className="invalid">
                  {errors.city ? errors.city : ""}
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
              <span className="label--global title">City: </span>
              <span className="description">{data.city}</span>
            </article>
          )}
          <article>
            <span className="label--global title">Governate: </span>
            <span className="description">{data.governate}</span>
          </article>
          <article>
            <span className="label--global title">Areas: </span>
            <span className="description permissionsWrapper">
              <ul>
                {data?.areas?.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </span>
          </article>
        </>
      )}
    </main>
  );
};
City.getLayout = function getLayout(page) {
  return (
    <Layout title="city-details" navTitle="city-details">
      {page}
    </Layout>
  );
};
export default City;
