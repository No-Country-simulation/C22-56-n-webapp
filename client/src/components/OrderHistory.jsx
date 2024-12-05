import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function OrderHistory() {
  const { cart } = useCart();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      orderHistory.flatMap((order) =>
        order.items.map((item) => ({
          Producto: item.name,
          Cantidad: item.count,
          PrecioUnitario: item.price,
          Total: item.count * item.price,
          Fecha: order.date,
        }))
      )
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Historial de Compras");
    XLSX.writeFile(wb, "historial_compras.xlsx");
  };

  const clearOrderHistory = () => {
    localStorage.removeItem("orderHistory");
    setOrderHistory([]);
  };

  const getChartData = () => {
    const salesByDate = orderHistory.reduce((acc, order) => {
      const date = new Date(order.date).toLocaleDateString();
      const total = order.items.reduce(
        (sum, item) => sum + item.count * item.price,
        0
      );
      acc[date] = (acc[date] || 0) + total;
      return acc;
    }, {});

    const dates = Object.keys(salesByDate);
    const sales = dates.map((date) => salesByDate[date]);

    return {
      labels: dates,
      datasets: [
        {
          label: "Ventas Totales por Día",
          data: sales,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Historial de Compras</h2>
      {orderHistory.length === 0 ? (
        <p className="text-center text-muted">No hay historial de compras.</p>
      ) : (
        <>
          <div className="list-group">
            {orderHistory.map((order, index) => (
              <div
                key={index}
                className="card mb-3 shadow-sm"
                style={{ borderRadius: "0.5rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    Compra del {new Date(order.date).toLocaleString()}
                  </h5>
                  <ul className="list-unstyled">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.name}</strong> - {item.count} x $
                        {item.price} = ${item.count * item.price}
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
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="btn btn-primary" onClick={generateExcel}>
              Generar Excel
            </button>
            <button className="btn btn-danger ms-2" onClick={clearOrderHistory}>
              Eliminar Historial
            </button>
          </div>

          <div className="mt-4">
            <h4>Ventas por Día</h4>
            <Line data={getChartData()} />
          </div>
        </>
      )}
    </div>
  );
}

export default OrderHistory;
