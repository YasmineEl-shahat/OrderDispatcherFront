import Layout from "../../components/Layout";

const Blog = () => {
  return <></>;
};
Blog.getLayout = function getLayout(page) {
  return <Layout title="Blog">{page}</Layout>;
};

export default Blog;
