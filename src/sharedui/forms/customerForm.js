const CustomerForm = ({ data, t }) => {
  return (
    <section className="form--section">
      <div className="field--wrapper">
        <label className="label--global">Name</label>
        <input
          className="text--global"
          type="text"
          value={data.CustomerName}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">Email</label>
        <input
          className="text--global"
          type="email"
          value={data.CustomerEmail}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">Governate</label>
        <input
          className="text--global"
          type="text"
          value={data.Address.Governate}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">City</label>
        <input
          className="text--global"
          type="text"
          value={data.Address.City}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">Area</label>
        <input
          className="text--global"
          type="text"
          value={data.Address.Area}
          disabled
        />
      </div>
    </section>
  );
};

export default CustomerForm;
