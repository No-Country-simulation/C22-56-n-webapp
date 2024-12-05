import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

function ProductDetails() {
  const { productId } = useParams();
  const { products } = useProducts();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === parseInt(productId, 10)
    );
    if (foundProduct) {
      setProducto(foundProduct);
      setLoading(false);
    } else {
      setError("Producto no encontrado en el contexto.");
      setLoading(false);
    }
  }, [productId, products]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="ms-3">Cargando...</p>
      </div>
    );
  }

  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      {producto ? (
        <div className="card mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body text-center">
            <img
              src={producto.image}
              alt={producto.name}
              className="rounded-circle border border-3 border-secondary mb-3"
              style={{
                objectFit: "cover",
                height: "200px",
                width: "200px",
              }}
            />
            <h5 className="card-title">{producto.name}</h5>
            <p className="card-text">
              <strong>Descripción:</strong> {producto.description}
            </p>
            <p className="card-text">
              <strong>Precio:</strong> ${producto.price}
            </p>
            <p className="card-text">
              <strong>Cantidad disponible:</strong> {producto.stock}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center">Producto no encontrado.</p>
      )}
    </div>
  );
}

export default ProductDetails;
