import React from "react";

const ProductList = () => {
  // Lista de productos
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 1200,
      description: "Alta rendimiento y portabilidad.",
    },
    {
      id: 2,
      name: "Auriculares",
      price: 200,
      description: "Sonido envolvente y cancelación de ruido.",
    },
    { id: 3, name: "Mouse", price: 50, description: "Ergonómico y preciso." },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Productos</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Precio: ${product.price}
                </h6>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
