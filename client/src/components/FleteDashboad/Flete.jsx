import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Flete() {
  const [shipments, setShipments] = useState([]); // Estado para almacenar los datos de los envíos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Función para obtener los envíos
    const fetchShipments = async () => {
      try {
        const response = await axios.get("/shipment"); // Cambia la URL según tu configuración
        setShipments(response.data); // Guardar los datos en el estado
      } catch (err) {
        setError(err.message); // Manejar errores
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchShipments(); // Llamar a la función al cargar el componente
  }, []);

  // Función para eliminar un envío
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/shipment/${id}`);
      setShipments(shipments.filter((shipment) => shipment.id !== id)); // Eliminar el envío del estado
    } catch (err) {
      setError("Error al eliminar el envío: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando envíos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        Error: {error}
      </div>
    );
  }

  // Agrupar los envíos por email de usuario
  const groupedShipments = shipments.reduce((acc, shipment) => {
    const userEmail = shipment.userEmail;
    if (!acc[userEmail]) {
      acc[userEmail] = [];
    }
    acc[userEmail].push(shipment);
    return acc;
  }, {});

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Envíos por Usuario</h1>

      {Object.keys(groupedShipments).length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No hay envíos disponibles.
        </div>
      ) : (
        Object.keys(groupedShipments).map((userEmail) => (
          <div key={userEmail} className="mb-4">
            <h3>Pedidos de {userEmail}</h3>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Tipo de Usuario</th>
                    <th>Acción</th>{" "}
                    {/* Columna de acción para el botón de eliminar */}
                  </tr>
                </thead>
                <tbody>
                  {groupedShipments[userEmail].map((shipment) => (
                    <tr key={shipment.id}>
                      <td>{shipment.id}</td>
                      <td>{new Date(shipment.date).toLocaleString()}</td>
                      <td>{shipment.name}</td>
                      <td>{shipment.count}</td>
                      <td>${shipment.price.toFixed(2)}</td>
                      <td>{shipment.userName}</td>
                      <td>{shipment.userEmail}</td>
                      <td>{shipment.userType}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(shipment.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
