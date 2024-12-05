import React, { createContext, useState, useContext } from "react";
import cocaColaImg from "../assets/coca.jpeg";
import fideosImg from "../assets/logo-provi1.jpg";
import jugoTangImg from "../assets/tang.jpeg";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Coca Cola",
      price: 1200,
      description: "En sus presentaciones de 1 litro, 2 1/4 litros y 3 litros.",
      image: cocaColaImg,
      stock: 10,
    },
    {
      id: 2,
      name: "Fideos La providencia",
      price: 200,
      description: "El mejor sabor en todas sus variedades.",
      image: fideosImg,
      stock: 5,
    },
    {
      id: 3,
      name: "Jugo Tang",
      price: 50,
      description: "El sabor de las frutas en tu mesa.",
      image: jugoTangImg,
      stock: 20,
    },
  ]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
