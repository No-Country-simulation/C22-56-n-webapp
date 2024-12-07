import React from "react";

const CartFooter = ({ onGeneratePDF }) => (
  <div className="mt-4 text-center" style={{ marginTop: "20px" }}>
    <button className="btn btn-primary mt-3" onClick={onGeneratePDF}>
      Finalizar compra
    </button>
  </div>
);

export default CartFooter;
