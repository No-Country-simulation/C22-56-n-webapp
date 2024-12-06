import React, { createContext, useState, useContext } from "react";
import cocaColaImg from "../assets/coca.jpeg";
import fideosImg from "../assets/logo-provi1.jpg";
import jugoTangImg from "../assets/tang.jpeg";
import Soldan from "../assets/soldan.png";
import producto5Img from "../assets/PRITTY-CERO-X-2250-1-7331.webp";
import producto6Img from "../assets/quilmes.jpg";
import producto7Img from "../assets/IMG-20241104-WA0095.jpg";
import producto8Img from "../assets/IMG-20241104-WA0091.jpg";
import producto9Img from "../assets/IMG-20241104-WA0081.jpg";
import producto10Img from "../assets/IMG-20241104-WA0083.jpg";
import producto11Img from "../assets/IMG-20241104-WA0086.jpg";
import producto12Img from "../assets/IMG-20241104-WA0078.jpg";
import producto13Img from "../assets/IMG-20241104-WA0057.jpg";
import producto14Img from "../assets/IMG-20241104-WA0055.jpg";

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
    {
      id: 4,
      name: "Saldan",
      price: 150,
      description: "Agua saborizada.",
      image: Soldan,
      stock: 15,
    },
    {
      id: 5,
      name: "Pritty cero",
      price: 300,
      description: "Gaseosa sabor limon cero azucar",
      image: producto5Img,
      stock: 8,
    },
    {
      id: 6,
      name: "Cerveza Quilmes",
      price: 500,
      description: "Cerveza quilmes el sabor del encuentro",
      image: producto6Img,
      stock: 12,
    },
    {
      id: 7,
      name: "Detergente Heroe",
      price: 120,
      description: "Detergente Heroe concentrado",
      image: producto7Img,
      stock: 18,
    },
    {
      id: 8,
      name: "Leche descremada Ilolay",
      price: 250,
      description: "Leche descremada de 1 litro",
      image: producto8Img,
      stock: 25,
    },
    {
      id: 9,
      name: "Agua mineral Villavicencio",
      price: 400,
      description: "Pureza de la montaña",
      image: producto9Img,
      stock: 7,
    },
    {
      id: 10,
      name: "Livra ",
      price: 700,
      description: "Agua saborizada",
      image: producto10Img,
      stock: 10,
    },
    {
      id: 11,
      name: "Dr. Lemon",
      price: 350,
      description: "Vodka sabor limon",
      image: producto11Img,
      stock: 5,
    },
    {
      id: 12,
      name: "Cafe Cabrales",
      price: 220,
      description: "Cafe torrado",
      image: producto12Img,
      stock: 18,
    },
    {
      id: 13,
      name: "Leche Veronica",
      price: 180,
      description: "Entera y descremada",
      image: producto13Img,
      stock: 22,
    },
    {
      id: 14,
      name: "Edulcorante Ledesma",
      price: 550,
      description: "En su presentacion en sobres",
      image: producto14Img,
      stock: 9,
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
