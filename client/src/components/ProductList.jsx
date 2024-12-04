import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Coca Cola",
      price: 1200,
      description: "En sus presentaciones de 1 litro, 2 1/4 litros y 3 litros.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FR61J6DWQLDyDU7XTOnQYmEAOR4LPIbVNQ&s",
    },
    {
      id: 2,
      name: "Fideos La providencia",
      price: 200,
      description: "El mejor sabor en todas sus variedades.",
      image:
        "https://saboreslaprovidencia.com.ar/wp-content/uploads/2022/05/logo-provi1.jpg",
    },
    {
      id: 3,
      name: "Jugo Tang",
      price: 50,
      description: "El sabor de las frutas en tu mesa.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrnIqhzzOaKK0NHg3akr1A9ERI8fd1gC81iw&s",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Productos</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div
              className="card h-100 shadow-sm"
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
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
