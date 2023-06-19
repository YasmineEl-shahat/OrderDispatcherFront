import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { addRole } from "../../api/roles";
import RoleForm from "../../../src/sharedui/forms/roleForm";

const AddRole = () => {
  const router = useRouter();
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
  useEffect(() => {
    setData({});

    // eslint-disable-next-line
  }, [router.asPath]);

  const submit = (e, permissions, setPermissions) => {
    e.preventDefault();
    setSubmitting(true);
    let newData = { ...data };
    newData["permissions"] = permissions;
    newData["user_id"] = user.id;
    setData(newData);
    console.log(newData);
    addRole(JSON.stringify(newData))
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
    <main className={`mainContainer formContainer`}>
      <RoleForm
        data={data}
        errors={errors}
        backError={backError}
        onChangeHandler={onChangeHandler}
        submit={submit}
        submitting={submitting}
        t={t}
        setData={setData}
        allPermissions={allPermissions}
        add={true}
      />
    </main>
  );
};
AddRole.getLayout = function getLayout(page) {
  return <Layout title="Add Role">{page}</Layout>;
};
export default AddRole;
