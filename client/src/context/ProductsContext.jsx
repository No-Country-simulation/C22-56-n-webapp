import React, { createContext, useState, useContext } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
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
