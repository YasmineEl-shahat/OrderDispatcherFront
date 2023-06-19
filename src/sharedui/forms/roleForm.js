import { useState } from "react";

const RoleForm = ({
  data,
  errors,
  backError,
  onChangeHandler,
  submit,
  submitting,
  t,
  viewOnly,
  allPermissions,
  add,
}) => {
  if (add) data = {};
  const [permissions, setPermissions] = useState(
    data.permissions ?? allPermissions
  );

  const handlePermissionsChange = (event) => {
    const { name, checked } = event.target;
    const [group, key] = name.split(".");
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [group]: { ...prevPermissions[group], [key]: checked },
    }));
  };

  const renderPermissionsCheckboxes = () => {
    return Object.entries(permissions).map(([group, subPermissions]) => (
      <fieldset key={group}>
        <legend>{group}</legend>
        {Object.entries(subPermissions).map(([key, value]) => (
          <label key={key}>
            <span>{key}: </span>
            <input
              type="checkbox"
              name={`${group}.${key}`}
              checked={value}
              disabled={viewOnly}
              onChange={handlePermissionsChange}
            />
          </label>
        ))}
      </fieldset>
    ));
  };
  return (
    <form onSubmit={(e) => submit(e, permissions, setPermissions)}>
      <section className="form--section">
        <div className="field--wrapper">
          <label className="label--global" htmlFor="name">
            Name
          </label>
          <input
            className="text--global"
            name="name"
            type="text"
            placeholder="Name"
            value={data.name}
            disabled={viewOnly}
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="invalid">{errors.name ? errors.name : ""}</span>
        </div>

        <fieldset className="permissions">
          <legend>Permissions:</legend>
          {renderPermissionsCheckboxes()}
        </fieldset>
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

export default RoleForm;
