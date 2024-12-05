import React, { useState } from "react";

const Order = ({ products, setProducts }) => {
  const handleOrderChange = (event) => {
    const value = event.target.value;
    let sortedProducts = [];

    if (value === "priceAsc") {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (value === "priceDesc") {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    } else if (value === "alphaAsc") {
      sortedProducts = [...products].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (value === "alphaDesc") {
      sortedProducts = [...products].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="orderSelect"
        className="form-label fs-5 fw-bold text-dark"
      >
        Ordenar por:
      </label>
      <select
        id="orderSelect"
        className="form-select shadow-sm rounded-3 border-primary"
        onChange={handleOrderChange}
      >
        <option value="priceAsc">Menor a mayor</option>
        <option value="priceDesc">Mayor a menor</option>
        <option value="alphaAsc">Nombre: de A a Z</option>
        <option value="alphaDesc">Nombre: de Z a A</option>
      </select>
    </div>
  );
};

export default Order;
