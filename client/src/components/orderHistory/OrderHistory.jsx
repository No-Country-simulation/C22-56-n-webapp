import React, { useEffect, useState } from "react";
import OrderList from "./OrderList";
import OrderChart from "./OrderChart";
import OrderActions from "./OrderActions";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <h2 className="text-center mb-4">Historial de Ventas</h2>
        {orderHistory.length === 0 ? (
          <p className="text-center text-muted">No hay historial de ventas.</p>
        ) : (
          <>
            <OrderList orderHistory={orderHistory} />
            <OrderActions
              setOrderHistory={setOrderHistory}
              orderHistory={orderHistory}
            />
            <OrderChart orderHistory={orderHistory} />
          </>
        )}
      </div>
      <footer
        className="text-center mt-4 py-3"
        style={{ marginTop: "20px" }}
      ></footer>
    </div>
  );
}

export default OrderHistory;
