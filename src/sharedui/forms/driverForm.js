import { AsyncPaginate } from "react-select-async-paginate";
import { loadAreas } from "../../../functions/loadOptions";

const DriverForm = ({
  data,
  errors,
  backError,
  onChangeHandler,
  submit,
  areas,
  submitting,
  t,
  viewOnly,
  emailView,
  setSelectedAreas,
  selectedAreas,
}) => {
  return (
    <form onSubmit={(e) => submit(e)}>
      <section className="form--section">
        <div className="field--wrapper">
          <label className="label--global" htmlFor="driverName">
            Driver Name
          </label>
          <input
            className="text--global"
            name="driverName"
            type="text"
            placeholder="Driver Name"
            value={data.driverName}
            disabled={viewOnly}
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="invalid">
            {errors.driverName ? errors.driverName : ""}
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
            disabled={emailView}
            onChange={(e) => onChangeHandler(e)}
          />
          <span className="invalid">{errors.email ? errors.email : ""}</span>
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
            disabled={viewOnly}
          />
          <span className="invalid">
            {errors.phoneNumber ? errors.phoneNumber : ""}
          </span>
        </div>

        {/* <div className="field--wrapper">
          <label className="label--global" htmlFor="orderCount">
            Order Count
          </label>
          <input
            className="text--global"
            name="orderCount"
            type="number"
            placeholder="Order Count"
            value={data.orderCount}
            onChange={(e) => onChangeHandler(e)}
            disabled={viewOnly}
            min={0}
            max={2}
          />
          <span className="invalid">
            {errors.orderCount ? errors.orderCount : ""}
          </span>
        </div> */}

        {emailView && (
          <div className="field--wrapper" style={{ width: "45%" }}>
            <label className="label--global" htmlFor="status">
              Status
            </label>
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  disabled={viewOnly}
                  checked={data.status === "active"}
                  onChange={(e) => onChangeHandler(e)}
                />
                active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="not active"
                  disabled={viewOnly}
                  checked={data.status === "not active"}
                  onChange={(e) => onChangeHandler(e)}
                />
                not active
              </label>
            </div>
            <span className="invalid">
              {errors.status ? errors.status : ""}
            </span>
          </div>
        )}

        <div className="field--wrapper" style={{ width: "45%" }}>
          <label className="label--global" htmlFor="availability">
            availability
          </label>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="availability"
                value="free"
                disabled={viewOnly}
                checked={data.availability === "free"}
                onChange={(e) => onChangeHandler(e)}
              />
              free
            </label>
            <label>
              <input
                type="radio"
                name="availability"
                value="busy"
                disabled={viewOnly}
                checked={data.availability === "busy"}
                onChange={(e) => onChangeHandler(e)}
              />
              busy
            </label>
          </div>
          <span className="invalid">
            {errors.availability ? errors.availability : ""}
          </span>
        </div>

        <div className="field--wrapper">
          <label className="label--global" htmlFor="areas">
            areas
          </label>
          <AsyncPaginate
            value={selectedAreas}
            placeholder="Select Areas..."
            loadOptions={loadAreas}
            isMulti
            onChange={setSelectedAreas}
            closeMenuOnSelect={false}
            isDisabled={viewOnly}
          />
        </div>

        {!viewOnly && (
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

export default DriverForm;
