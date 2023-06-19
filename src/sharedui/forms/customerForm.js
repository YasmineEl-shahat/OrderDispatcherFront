const CustomerForm = ({ data, t }) => {
  return (
    <section className="form--section">
      <div className="field--wrapper">
        <label className="label--global">Name</label>
        <input
          className="text--global"
          type="text"
          value={data?.CustomerName}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">Email</label>
        <input
          className="text--global"
          type="email"
          value={data?.CustomerEmail}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">Governate</label>
        <input
          className="text--global"
          type="text"
          value={data?.Address?.Governate}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">City</label>
        <input
          className="text--global"
          type="text"
          value={data?.Address?.City}
          disabled
        />
      </div>

      <div className="field--wrapper">
        <label className="label--global">Area</label>
        <input
          className="text--global"
          type="text"
          value={data?.Address?.Area}
          disabled
        />
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.Orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.Product.map((product) => (
                  <div key={product._id}>{product.name_en}</div>
                ))}
              </td>
              <td>
                {order.Product.map((product) => (
                  <div key={product._id}>{product.quantity}</div>
                ))}
              </td>
              <td>
                {order.Product.map((product) => (
                  <div key={product._id}>{product.price}</div>
                ))}
              </td>
              <td>{order.TotalPrice}</td>
              <td>{order.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CustomerForm;
