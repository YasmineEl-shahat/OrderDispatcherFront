const LocaitonForm = ({
  data,
  errors,
  backError,
  onChangeHandler,
  submit,
  submitting,
  t,
  viewOnly,
}) => {
  return (
    <form onSubmit={(e) => submit(e)}>
      <section className="form--section">
        <div className="field--wrapper">
          <label className="label--global" htmlFor="governate">
            Governate
          </label>
          <input
            className="text--global"
            name="governate"
            type="text"
            placeholder="Governate"
            value={data.governate}
            disabled={viewOnly}
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="invalid">
            {errors.governate ? errors.governate : ""}
          </span>
        </div>

        <div className="field--wrapper">
          <label className="label--global" htmlFor="city">
            City
          </label>
          <input
            className="text--global"
            name="city"
            type="text"
            placeholder="City"
            value={data.city}
            disabled={viewOnly}
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="invalid">{errors.city ? errors.city : ""}</span>
        </div>

        <div className="field--wrapper">
          <label className="label--global" htmlFor="area">
            Area
          </label>
          <input
            className="text--global"
            name="area"
            type="text"
            placeholder="Area"
            value={data.area}
            disabled={viewOnly}
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="invalid">{errors.area ? errors.area : ""}</span>
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

export default LocaitonForm;
