import React from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ orderHistory }) => {
  return (
    <div className="list-group">
      {orderHistory.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
