import { useState } from "react";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { useTranslation } from "../util/useTranslation";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
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
          <h1 className="headline">{t("overview")}</h1>
          <section className="overview">
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-check-double"></i> total orders
              </h3>
            </article>
            <article className="purple-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-rss"></i> new orders
              </h3>
            </article>
            <article className="purple-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-truck"></i> delivered orders
              </h3>
            </article>
            <article className="purple-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-ban"></i> canceled orders
              </h3>
            </article>
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-truck-fast"></i> picked orders
              </h3>
            </article>
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-check-to-slot"></i> assigned orders
              </h3>
            </article>
            <article className="blue-overview">
              <h3 className="order-status">
                <i className="fa-solid fa-list-check"></i> reassigned orders
              </h3>
            </article>
          </section>
        </>
      )}
    </main>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout title="home">{page}</Layout>;
};

export default Home;
