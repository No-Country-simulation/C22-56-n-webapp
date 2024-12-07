import React from "react";
import { Line } from "react-chartjs-2";

const OrderChart = ({ orderHistory }) => {
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
    <div className="mt-4" style={{ marginTop: "20px" }}>
      <h4>Ventas por Día</h4>
      <Line data={getChartData()} />
    </div>
  );
};

export default OrderChart;
