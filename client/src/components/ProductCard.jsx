import React from "react";

const ProductCard = ({ product, handleProductClick, handleBuyClick }) => {
  return (
    <div className="col-md-4">
      <div
        className="card h-100 shadow-sm d-flex flex-column"
        onClick={() => handleProductClick(product.id)}
        style={{ cursor: "pointer", marginTop: "20px", bottom: "20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{
              height: "200px",
              width: "200px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Precio: ${product.price}
          </h6>
          <p className="card-text mb-3 flex-grow-1">{product.description}</p>
          <p className="card-text mb-3">
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? product.stock : "Sin stock"}
          </p>
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
