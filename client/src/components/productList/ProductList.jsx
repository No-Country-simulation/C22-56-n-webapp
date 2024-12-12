import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import SearchSection from "./SearchSection.jsx";
import ProductCardsSection from "./ProductCardSection.jsx";
import PaginationSection from "./PaginationSection.jsx";
import Order from "../order/Order.jsx";
import NoProductsFound from "./NoProductsFound.jsx";
import ProductosCrud from "./ProductosCrud.jsx";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]); // Estado local para los productos
  const { addToCart } = useCart(); // Hook de carrito
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(""); // Filtro de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 6; // Cantidad de productos por página
  const [showCrud, setShowCrud] = useState(false); // Mostrar o no la sección de CRUD de productos

  // Obtener los productos desde la API al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/productos"); // Realiza el GET a la API de productos
        setProducts(response.data); // Actualiza el estado con los productos obtenidos
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // El efecto solo se ejecuta una vez, al montar el componente

  // Función que maneja el clic en un producto (navegar a la página de detalles)
  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  // Función que maneja el clic en "Comprar" (agregar el producto al carrito)
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

  // Filtrar los productos según la búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Calcular el total de páginas

  // Obtener los productos que se mostrarán en la página actual
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Función para manejar el cambio de página
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
