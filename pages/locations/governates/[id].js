import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { updateGovernate, viewGovernate } from "../../api/locations";
import Spinner from "../../../components/Spinner";

const Governate = () => {
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
      viewGovernate(id)
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

    updateGovernate(id, JSON.stringify({ name: data.governate }))
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
                <label className="label--global" htmlFor="governate">
                  Governate
                </label>
                <input
                  className="text--global"
                  name="governate"
                  type="text"
                  placeholder="Governate"
                  value={data.governate}
                  onChange={(e) => onChangeHandler(e)}
                />
                <span className="invalid">
                  {errors.governate ? errors.governate : ""}
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
              <span className="label--global title">Governate: </span>
              <span className="description">{data.governate}</span>
            </article>
          )}
          <article>
            <span className="label--global title">City: </span>
            <span className="description">
              <ul>
                {data?.cities?.map((city) => (
                  <>
                    <li key={city.city}>{city.city}</li>
                    <article>
                      <span className="label--global title">Areas: </span>
                      <span className="description permissionsWrapper">
                        <ul>
                          {city.areas?.map((area) => (
                            <li key={area}>{area}</li>
                          ))}
                        </ul>
                      </span>
                    </article>
                  </>
                ))}
              </ul>
            </span>
          </article>
        </>
      )}
    </main>
  );
};
Governate.getLayout = function getLayout(page) {
  return (
    <Layout title="governate-details" navTitle="governate-details">
      {page}
    </Layout>
  );
};
export default Governate;
