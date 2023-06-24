import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from "../../util/useTranslation";
import { viewRole, updateRole } from "../api/roles";
import RoleForm from "../../src/sharedui/forms/roleForm";
import Spinner from "../../components/Spinner";

const Role = () => {
  const router = useRouter();
  const { id, operation } = router.query;
  const {
    data,
    backError,
    errors,
    onChangeHandler,
    submitting,
    setSubmitting,
    setBackError,
    setData,
    user,
  } = useContext(AuthContext);

  const { t } = useTranslation();
  const allPermissions = {
    customers: { viewAll: false },
    drivers: { viewAll: false, add: false, edit: false, delete: false },
    locations: { view: false, add: false, edit: false, delete: false },
    orders: { viewAll: false },
    roles: { viewAll: false, add: false, edit: false },
    statistics: { viewAll: false },
    users: {
      viewAll: false,
      add: false,
      edit: false,
      delete: false,
      activateDeactivate: false,
    },
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    viewRole(id)
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

  const submit = (e, permissions, setPermissions) => {
    e.preventDefault();
    setSubmitting(true);

    let newData = { ...data };
    newData["permissions"] = permissions;
    newData["user_id"] = user.id;
    setData(newData);

    updateRole(id, JSON.stringify(newData))
      .then((res) => {
        setSubmitting(false);
        setData({});
        setBackError("");
        setPermissions(allPermissions);
        router.replace("/roles");
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
        <RoleForm
          data={data}
          errors={errors}
          backError={backError}
          onChangeHandler={onChangeHandler}
          submit={operation === "edit" ? submit : false}
          viewOnly={operation === "view"}
          submitting={submitting}
          t={t}
          setData={setData}
          allPermissions={allPermissions}
        />
      )}
    </main>
  );
};
Role.getLayout = function getLayout(page) {
  return (
    <Layout title="role-details" navTitle="role-details">
      {page}
    </Layout>
  );
};
export default Role;
