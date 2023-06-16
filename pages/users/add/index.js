import { useContext } from "react";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { addUser } from "../../api/users";

const AddUser = () => {
  const {
    data,
    backError,
    errors,
    onChangeHandler,
    submitting,
    setSubmitting,
    setBackError,
  } = useContext(AuthContext);

  const { t } = useTranslation();

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    addUser(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        router.replace("/users");
        setBackError("");
      })
      .catch((error) => {
        setBackError(error);
        setSubmitting(false);
      });
  };
  return (
    <main className="mainContainer">
      <form onSubmit={(e) => submit(e)}>
        <label className="label--global" htmlFor="email">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => onChangeHandler(e)}
        />
        <span className="invalid">{errors.email ? errors.email : ""}</span>
        <span className="invalid">{backError}</span>
        <button> {submitting ? t("submitting") : t("submit")}</button>
      </form>
    </main>
  );
};
AddUser.getLayout = function getLayout(page) {
  return <Layout title="Add User">{page}</Layout>;
};
export default AddUser;
