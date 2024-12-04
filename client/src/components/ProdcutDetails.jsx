import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`producto/${productId}`);
        setProducto(response.data);
      } catch (err) {
        setError(
          "No se pudo obtener el producto. " +
            (err.response ? err.response.data.error : err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      {producto ? (
        <>
          <h2>{producto.nombre}</h2>
          <p>
            <strong>Descripción:</strong> {producto.descripcion}
          </p>
          <p>
            <strong>Categoría:</strong> {producto.categoria}
          </p>
          <p>
            <strong>Precio:</strong> ${producto.precio}
          </p>
          <p>
            <strong>Cantidad disponible:</strong> {producto.cantidad}
          </p>
          <p>
            <strong>Fecha de creación:</strong>{" "}
            {new Date(producto.fechaCreacion).toLocaleDateString()}
          </p>
          <p>
            <strong>Valor total:</strong> ${producto.precio * producto.cantidad}
          </p>
        </>
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
}

export default ProductDetails;
