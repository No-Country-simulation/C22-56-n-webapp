import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Order from "./order";

const ProductList = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Coca Cola",
      price: 1200,
      description: "En sus presentaciones de 1 litro, 2 1/4 litros y 3 litros.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FR61J6DWQLDyDU7XTOnQYmEAOR4LPIbVNQ&s",
      stock: 10,
    },
    {
      id: 2,
      name: "Fideos La providencia",
      price: 200,
      description: "El mejor sabor en todas sus variedades.",
      image:
        "https://saboreslaprovidencia.com.ar/wp-content/uploads/2022/05/logo-provi1.jpg",
      stock: 5,
    },
    {
      id: 3,
      name: "Jugo Tang",
      price: 50,
      description: "El sabor de las frutas en tu mesa.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrnIqhzzOaKK0NHg3akr1A9ERI8fd1gC81iw&s",
      stock: 20,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleBuyClick = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.stock > 0) {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, stock: p.stock - 1 } : p
        )
      );
      addToCart(product);
    } else {
      alert("No hay stock disponible para este producto.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Productos</h2>
      <div className="row">
        <div className="col-md-3 mb-4">
          <Order products={products} setProducts={setProducts} />
        </div>
        <div className="col-md-9">
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-md-4">
                <div
                  className="card h-100 shadow-sm d-flex flex-column"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
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
                    <p className="card-text mb-3 flex-grow-1">
                      {product.description}
                    </p>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
