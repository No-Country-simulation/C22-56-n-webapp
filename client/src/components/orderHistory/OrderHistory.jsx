import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

function OrderHistory() {
  const { cart } = useCart();
  const { user, userType } = useUser();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("orderHistory");
    if (storedHistory) {
      setOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  const generateExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(
      orderHistory.flatMap((order) =>
        order.items.map((item) => ({
          Usuario: order.user.name,
          Email: order.user.email,
          TipoUsuario: order.user.userType,
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

    try {
      for (const order of orderHistory) {
        for (const item of order.items) {
          const newOrder = {
            date: order.date,
            name: item.name,
            count: item.count,
            price: item.price,
            user: {
              name: order.user.name,
              email: order.user.email,
              userType: order.user.userType,
            },
          };

          await axios.post("/orders", newOrder);
        }
      }
      alert("Archivo Excel generado y datos enviados a /orders");
    } catch (error) {
      console.error("Error al enviar los datos a /orders:", error);
    }
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
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <h2 className="text-center mb-4">Historial de Ventas</h2>
        {orderHistory.length === 0 ? (
          <p className="text-center text-muted">No hay historial de compras.</p>
        ) : (
          <>
            <div className="list-group">
              {orderHistory.map((order, index) => (
                <div
                  key={index}
                  className="card mb-3 shadow-sm"
                  style={{ borderRadius: "0.5rem", marginTop: "20px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      Compra del {new Date(order.date).toLocaleString()}
                    </h5>
                    <h6 className="text-muted">
                      Usuario: {order.user.name} ({order.user.email})
                    </h6>
                    <ul className="list-unstyled">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          <strong>{item.name}</strong> - {item.count} x ${" "}
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
              <button
                className="btn btn-danger ms-2"
                onClick={clearOrderHistory}
              >
                Eliminar Historial
              </button>
            </div>

            <div className="mt-4" style={{ marginTop: "20px" }}>
              <h4>Ventas por Día</h4>
              <Line data={getChartData()} />
            </div>
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
