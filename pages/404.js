import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <div className="notfound mainContainer">
      <div className="forbidden">
        <div className="text">Not Found</div>
      </div>
      <div className="text-404">404</div>

      <div className="door"></div>
      <div id="hodor">
        <div className="l-arm">
          <div className="hand"></div>
          <div className="arm"></div>
        </div>
        <div className="r-arm">
          <div className="hand"></div>
          <div className="arm"></div>
        </div>
        <div className="body">
          <div className="backpack-strap-r"></div>
          <div className="backpack-strap-l"></div>
        </div>
        <div className="belt"></div>
        <div className="head">
          <div className="hair"></div>
          <div className="face"></div>
          <div className="r-eye"></div>
          <div className="l-eye"></div>
          <div className="r-brow"></div>
          <div className="l-brow"></div>
          <div className="beard"></div>
          <div className="bubble">H0D0R!</div>
        </div>
        <div className="l-leg">
          <div className="foot"></div>
        </div>
        <div className="r-leg">
          <div className="foot"></div>
        </div>
      </div>
    </div>
  );
};

NotFound.getLayout = function getLayout(page) {
  return (
    <Layout title="not-found" navTitle="not-found">
      {page}
    </Layout>
  );
};
export default NotFound;
