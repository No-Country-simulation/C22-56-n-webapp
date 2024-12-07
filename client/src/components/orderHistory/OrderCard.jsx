import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ borderRadius: "0.5rem", marginTop: "20px" }}
    >
      <div className="card-body">
        <h5 className="card-title">
          Compra del {new Date(order.date).toLocaleString()}
        </h5>
        <ul className="list-unstyled">
          {order.items.map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> - {item.count} x $ {item.price} = $
              {item.count * item.price}
            </li>
          ))}
        </ul>
        <h6 className="mt-2 text-success">
          Total: $
          {order.items
            .reduce((sum, item) => sum + item.count * item.price, 0)
            .toFixed(2)}
        </h6>
      </div>
    </div>
  );
};

export default OrderCard;
