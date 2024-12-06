import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useProducts } from "../context/ProductsContext";
import Order from "./Order.jsx";
import SearchBar from "./SearchBar";
import Pagination from "./PaginationProd.jsx";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, setProducts } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <h2 className="text-center mb-4">Lista de Productos</h2>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="row">
          <div className="col-md-3 mb-4">
            <Order products={products} setProducts={setProducts} />
          </div>
          <div className="col-md-9">
            <div className="row g-4">
              {currentProducts.length === 0 ? (
                <p className="text-center text-muted">
                  No hay productos disponibles que coincidan con tu búsqueda.
                </p>
              ) : (
                currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    handleProductClick={handleProductClick}
                    handleBuyClick={handleBuyClick}
                  />
                ))
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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
