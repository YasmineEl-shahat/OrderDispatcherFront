import { useContext } from "react";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";

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

  return (
    <main className="mainContainer">
      <form onSubmit={(e) => submit(e)}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => onChangeHandler(e)}
        />
        <span className="invalid">
          {backError ? backError : errors.email ? errors.email : ""}
        </span>
        <button> {submitting ? t("submitting") : t("submit")}</button>
      </form>
    </main>
  );
};
AddUser.getLayout = function getLayout(page) {
  return <Layout title="Add User">{page}</Layout>;
};
export default AddUser;
