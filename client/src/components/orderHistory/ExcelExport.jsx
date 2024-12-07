import React from "react";
import * as XLSX from "xlsx";

const ExcelExport = ({ orderHistory }) => {
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

  return (
    <button className="btn btn-primary" onClick={generateExcel}>
      Generar Excel
    </button>
  );
};

export default ExcelExport;
