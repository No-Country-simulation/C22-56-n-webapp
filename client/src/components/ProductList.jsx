import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useProducts } from "../context/ProductsContext";
import Order from "./Order";

const ProductList = () => {
  const { products, setProducts } = useProducts();
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
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <h2 className="text-center mb-4">Lista de Productos</h2>
        <div className="row">
          <div className="col-md-3 mb-4">
            <Order products={products} setProducts={setProducts} />
          </div>
          <div className="col-md-9">
            <div className="row g-4">
              {products.length === 0 ? (
                <p className="text-center text-muted">
                  No hay productos disponibles.
                </p>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="col-md-4">
                    <div
                      className="card h-100 shadow-sm d-flex flex-column"
                      onClick={() => handleProductClick(product.id)}
                      style={{ cursor: "pointer", marginTop: "20px" }}
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
                              alert(
                                "No hay stock disponible para este producto."
                              );
                            }
                          }}
                          disabled={product.stock <= 0}
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <footer
        className="text-center mt-4 py-3"
        style={{ marginTop: "20px" }}
      ></footer>
    </div>
  );
};

export default ProductList;
