const UserForm = ({
  data,
  errors,
  backError,
  onChangeHandler,
  submit,
  roles,
  submitting,
  t,
  viewOnly,
}) => {
  return (
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
            disabled={viewOnly}
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
            disabled={viewOnly}
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
            disabled={viewOnly}
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="invalid">{errors.email ? errors.email : ""}</span>
        </div>
        {viewOnly ? (
          <></>
        ) : (
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
        )}

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
            disabled={viewOnly}
          />
          <span className="invalid">
            {errors.phoneNumber ? errors.phoneNumber : ""}
          </span>
        </div>

        <div className="field--wrapper">
          <label className="label--global" htmlFor="role_id">
            Role
          </label>
          <input
            className="form-select text--global "
            name="role_id"
            type="text"
            placeholder="Role..."
            value={data.role_id}
            disabled={viewOnly}
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
                value={1}
                disabled={viewOnly}
                checked={data.active == 1 || data.active === true}
                onChange={(e) => onChangeHandler(e)}
              />
              yes
            </label>
            <label>
              <input
                type="radio"
                name="active"
                value={0}
                disabled={viewOnly}
                checked={data.active == 0 || data.active === false}
                onChange={(e) => onChangeHandler(e)}
              />
              no
            </label>
          </div>
          <span className="invalid">{errors.active ? errors.active : ""}</span>
        </div>
      </section>

      <span className="invalid">{backError}</span>
      {submit && (
        <button className="btn--global btn--forms">
          {submitting ? t("submitting") : t("submit")}
        </button>
      )}
    </form>
  );
};

export default UserForm;
