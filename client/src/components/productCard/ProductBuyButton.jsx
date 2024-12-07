import React from "react";

const ProductBuyButton = ({ product, handleBuyClick }) => {
  return (
    <button
      className="btn btn-primary mt-auto"
      onClick={(e) => {
        e.stopPropagation();
        if (product.stock > 0) {
          handleBuyClick(product.id);
        } else {
          alert("No hay stock disponible para este producto.");
        }
      }}
      disabled={product.stock <= 0}
    >
      Comprar
    </button>
  );
};

export default ProductBuyButton;
