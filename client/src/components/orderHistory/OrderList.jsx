import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [userFilter, setUserFilter] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response.data);
      setFilteredOrders(response.data); // Initially, set filtered orders to all orders
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

  useEffect(() => {
    fetchOrders();
  }, []);

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
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
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
                    className="btn btn-danger"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No hay pedidos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
