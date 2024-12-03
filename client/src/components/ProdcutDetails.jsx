import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductDetails({ productId }) {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los detalles del producto desde la API con axios
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Realizar la solicitud GET con axios
        const response = await axios.get(`producto/${productId}`);

        // Al recibir los datos, los almacenamos en el estado 'producto'
        setProducto(response.data);
      } catch (err) {
        // Si ocurre un error, actualizamos el estado 'error'
        setError(
          "No se pudo obtener el producto. " +
            (err.response ? err.response.data.error : err.message)
        );
      } finally {
        // Independientemente del resultado, dejamos de mostrar "Cargando..."
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // El hook se vuelve a ejecutar solo si cambia 'productId'

  // Si está cargando, mostramos un mensaje
  if (loading) return <p>Cargando...</p>;

  // Si hubo un error, mostramos el mensaje de error
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "600px",
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
