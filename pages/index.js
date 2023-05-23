import Layout from "../components/Layout";

const Home = () => {
  return <main className="mainContainer"></main>;
};

Home.getLayout = function getLayout(page) {
  return <Layout title="home">{page}</Layout>;
};

export default Home;
