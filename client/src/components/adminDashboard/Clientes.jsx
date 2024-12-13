import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    dni: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setClientes(response.data);
        setCargando(false);
      })
      .catch((error) => {
        setError(error.message);
        setCargando(false);
      });
  }, []);

  const handleEdit = (cliente) => {
    setEditingUser(cliente);
    setFormData({
      name: cliente.name,
      email: cliente.email,
      address: cliente.address,
      dni: cliente.dni,
      role: cliente.role,
      password: "",
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/delete/${id}`)
      .then(() => {
        setClientes(clientes.filter((cliente) => cliente.id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/update/${editingUser.id}`, formData)
      .then((response) => {
        setClientes(
          clientes.map((cliente) =>
            cliente.id === editingUser.id ? response.data.user : cliente
          )
        );
        setEditingUser(null);
        setFormData({
          name: "",
          email: "",
          address: "",
          dni: "",
          role: "",
          password: "",
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (cargando) {
    return (
      <Container>
        <Spinner animation="border" variant="primary" />
        <span> Cargando...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-4">Clientes</h1>

      {editingUser && (
        <div>
          <h2>Editar Usuario</h2>
          <Form onSubmit={handleUpdate} className="mb-4">
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Dirección"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    placeholder="DNI"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formRole">
                  <Form.Label>Rol</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Rol"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </Form>
        </div>
      )}

      <ListGroup>
        {clientes.map((cliente) => (
          <ListGroup.Item key={cliente.id} className="mb-3">
            <h4>{cliente.name}</h4>
            <p>Email: {cliente.email}</p>
            <p>Dirección: {cliente.address}</p>
            <p>DNI: {cliente.dni}</p>
            <p>Rol: {cliente.role}</p>

            <Button
              variant="warning"
              onClick={() => handleEdit(cliente)}
              className="mr-2"
            >
              Editar
            </Button>
            <Button variant="danger" onClick={() => handleDelete(cliente.id)}>
              Eliminar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Clientes;
