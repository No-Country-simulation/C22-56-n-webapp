import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [userFilter, setUserFilter] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (err) {
      setError("No se pudieron cargar los pedidos.");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`/orders/${orderId}`);
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders); // Ensure filter stays in sync
    } catch (err) {
      setError("No se pudo eliminar el pedido.");
    }
  };

  const sendOrderToShipment = async (order) => {
    try {
      const shipmentData = {
        id: order.id,
        date: order.date,
        name: order.name,
        count: order.count,
        price: order.price,
        user: {
          name: order.userName,
          email: order.userEmail,
          userType: order.userType,
        },
      };

      await axios.post("/shipment", shipmentData);
      alert(`El pedido con ID ${order.id} fue enviado al envío correctamente.`);
    } catch (err) {
      console.error("Error al enviar el pedido a la ruta /shipment:", err);
      setError("Hubo un error al enviar el pedido al envío.");
    }
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setUserFilter(filter);

    // Filter orders by username
    if (filter) {
      setFilteredOrders(
        orders.filter((order) =>
          order.userName.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredOrders(orders); // Reset filter when input is empty
    }
  };

  // Group orders by username
  const groupOrdersByUser = (orders) => {
    return orders.reduce((groups, order) => {
      const user = order.userName;
      if (!groups[user]) {
        groups[user] = [];
      }
      groups[user].push(order);
      return groups;
    }, {});
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Group filtered orders by user name
  const groupedOrders = groupOrdersByUser(filteredOrders);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Listado de Pedidos</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filter input */}
      <div className="mb-4">
        <label htmlFor="userFilter" className="form-label">
          Filtrar por Nombre de Usuario:
        </label>
        <input
          id="userFilter"
          type="text"
          className="form-control"
          value={userFilter}
          onChange={handleFilterChange}
          placeholder="Ingresa el nombre del usuario"
        />
      </div>

      {Object.keys(groupedOrders).length > 0 ? (
        Object.keys(groupedOrders).map((userName) => (
          <div key={userName}>
            <h3>Pedidos de {userName}</h3>
            <table className="table table-bordered table-hover">
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {groupedOrders[userName].map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.name}</td>
                    <td>{order.count}</td>
                    <td>${order.price}</td>
                    <td>{order.userName}</td>
                    <td>{order.userEmail}</td>
                    <td>{order.userType}</td>
                    <td>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => sendOrderToShipment(order)}
                      >
                        Enviar a Envío
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div className="text-center">No hay pedidos disponibles</div>
      )}
    </div>
  );
};

export default OrderList;
