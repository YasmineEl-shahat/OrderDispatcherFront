import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import { useTranslation } from "../../util/useTranslation";
import { viewCustomer } from "../api/customers";

import Spinner from "../../components/Spinner";
import CustomerForm from "../../src/sharedui/forms/customerForm";

const UpdateUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    // get user data
    viewCustomer(id)
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // eslint-disable-next-line
  }, [id]);

  return (
    <main
      className={
        loading
          ? `mainContainer d-flex justify-content-center align-items-center`
          : `mainContainer formContainer`
      }
    >
      {loading ? <Spinner /> : <CustomerForm data={data} t={t} />}
    </main>
  );
};

UpdateUser.getLayout = function getLayout(page) {
  return <Layout title="User">{page}</Layout>;
};
export default UpdateUser;
