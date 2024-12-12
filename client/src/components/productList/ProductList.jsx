import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useProducts } from "../../context/ProductsContext.jsx";
import SearchSection from "./SearchSection.jsx";
import ProductCardsSection from "./ProductCardSection.jsx";
import PaginationSection from "./PaginationSection.jsx";
import Order from "../order/Order.jsx";
import NoProductsFound from "./NoProductsFound.jsx";
import ProductosCrud from "./ProductosCrud.jsx";

const ProductList = () => {
  const { products, setProducts } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showCrud, setShowCrud] = useState(false);

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
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowCrud(!showCrud)}
      >
        {showCrud ? "Crear Productos" : "Crear Productos"}
      </button>
      {showCrud && <ProductosCrud />}
      <div className="flex-grow-1">
        <h2 className="text-center mb-4">Lista de Productos</h2>
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="row">
          <div className="col-md-3 mb-4">
            <Order products={products} setProducts={setProducts} />
          </div>
          <ProductCardsSection
            currentProducts={currentProducts}
            handleProductClick={handleProductClick}
            handleBuyClick={handleBuyClick}
          />
          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
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
