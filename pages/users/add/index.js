import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { addUser } from "../../api/users";
import { getAllRoles } from "../../api/roles";
import Spinner from "../../../components/Spinner";
import UserForm from "../../../src/sharedui/forms/userForm";

const AddUser = () => {
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
  } = useContext(AuthContext);

  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [roleNum, setRoleNum] = useState(2);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setData({});
    getAllRoles(roleNum)
      .then((res) => {
        setLoading(true);
        if (roleNum !== res.data.rolesCount) setRoleNum(res.data.rolesCount);
        setRoles(res.data.roles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [roleNum]);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    let newData = { ...data };
    newData["role_id"] = Number(data["role_id"]);
    setData(newData);

    addUser(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        setData({});
        router.replace("/users");
        setBackError("");
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
        <UserForm
          data={data}
          errors={errors}
          backError={backError}
          onChangeHandler={onChangeHandler}
          submit={submit}
          roles={roles}
          submitting={submitting}
          t={t}
        />
      )}
    </main>
  );
};
AddUser.getLayout = function getLayout(page) {
  return (
    <Layout title="add-user" navTitle="add-user">
      {page}
    </Layout>
  );
};
export default AddUser;
