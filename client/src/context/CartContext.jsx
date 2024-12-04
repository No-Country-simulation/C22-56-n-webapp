import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado del carrito
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Estado de los productos (esto es opcional y solo si lo necesitas en Cart)
  const [products, setProducts] = useState([
    // Agrega aquí la lista de productos inicial si es necesario
  ]);

  // Actualiza el localStorage cuando el carrito cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, products, setProducts }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
