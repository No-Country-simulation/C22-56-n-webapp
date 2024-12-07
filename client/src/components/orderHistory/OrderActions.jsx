import React from "react";
import ExcelExport from "./ExcelExport";

const OrderActions = ({ setOrderHistory, orderHistory }) => {
  const clearOrderHistory = () => {
    localStorage.removeItem("orderHistory");
    setOrderHistory([]);
  };

  return (
    <div className="mt-4 text-center">
      <ExcelExport orderHistory={orderHistory} />
      <button className="btn btn-danger ms-2" onClick={clearOrderHistory}>
        Eliminar Historial
      </button>
    </div>
  );
};

export default OrderActions;
