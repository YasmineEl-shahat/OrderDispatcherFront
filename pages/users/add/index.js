import { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import AuthContext from "../../../context/AuthContext";
import { useTranslation } from "../../../util/useTranslation";
import { addUser } from "../../api/users";
import { getAllRoles } from "../../api/roles";
import Spinner from "../../../components/Spinner";

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

  const [loading, setLoading] = useState(true);
  const [roleNum, setRoleNum] = useState(2);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getAllRoles(roleNum)
      .then((res) => {
        setLoading(true);
        let RolesArray = [];
        if (roleNum !== res.data.rolesCount) setRoleNum(res.data.rolesCount);
        setRoles(res.data.roles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [roleNum]);

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
        <form onSubmit={(e) => submit(e)}>
          <section className="form--section">
            <div className="field--wrapper">
              <label className="label--global" htmlFor="firstName">
                First Name
              </label>
              <input
                className="text--global"
                name="firstName"
                type="text"
                placeholder="First Name"
                value={data.firstName}
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {errors.firstName ? errors.firstName : ""}
              </span>
            </div>

            <div className="field--wrapper">
              <label className="label--global" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="text--global"
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={data.lastName}
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {errors.lastName ? errors.lastName : ""}
              </span>
            </div>

            <div className="field--wrapper">
              <label className="label--global" htmlFor="email">
                Email
              </label>
              <input
                className="text--global"
                name="email"
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {errors.email ? errors.email : ""}
              </span>
            </div>

            <div className="field--wrapper">
              <label className="label--global" htmlFor="password">
                Password
              </label>
              <input
                className="text--global"
                name="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {errors.password ? errors.password : ""}
              </span>
            </div>

            <div className="field--wrapper">
              <label className="label--global" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="text--global"
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={data.phoneNumber}
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {errors.phoneNumber ? errors.phoneNumber : ""}
              </span>
            </div>

            <div className="field--wrapper">
              <label className="label--global" htmlFor="role">
                Role
              </label>
              <input
                className="form-select text--global "
                name="role"
                type="tel"
                placeholder="Role..."
                value={data.role}
                onChange={(e) => onChangeHandler(e)}
                list="roles"
              />

              <datalist id="roles">
                {roles.map((role) => (
                  <option value={role._id} key={"role" + role._id}>
                    {role.name}
                  </option>
                ))}
              </datalist>
              <span className="invalid">{errors.role ? errors.role : ""}</span>
            </div>

            <div className="field--wrapper" style={{ width: "100%" }}>
              <label className="label--global" htmlFor="active">
                Active
              </label>
              <div className="radio-buttons">
                <label>
                  <input
                    type="radio"
                    name="active"
                    value="true"
                    checked={data.active === "true"}
                    onChange={(e) => onChangeHandler(e)}
                  />
                  yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="active"
                    value="false"
                    checked={data.active === "false"}
                    onChange={(e) => onChangeHandler(e)}
                  />
                  no
                </label>
              </div>
              <span className="invalid">
                {errors.active ? errors.active : ""}
              </span>
            </div>
          </section>

          <span className="invalid">{backError}</span>
          <button className="btn--global btn--forms">
            {submitting ? t("submitting") : t("submit")}
          </button>
        </form>
      )}
    </main>
  );
};
AddUser.getLayout = function getLayout(page) {
  return <Layout title="Add User">{page}</Layout>;
};
export default AddUser;
