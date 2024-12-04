import React from "react";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

function Cart() {
  const { cart, setCart, products, setProducts } = useCart();

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (product) => product.id !== productToRemove.id
    );

    const countInCart = cart.filter(
      (product) => product.id === productToRemove.id
    ).length;

    if (countInCart > 0) {
      const updatedProductList = [...products];
      const index = updatedProductList.findIndex(
        (product) => product.id === productToRemove.id
      );
      if (index > -1) {
        updatedProductList[index].stock += countInCart;
      }
      setProducts(updatedProductList);
    }

    setCart(updatedCart);
  };

  const getProductCount = (productId) => {
    return cart.filter((product) => product.id === productId).length;
  };

  // Create a map to display unique products with their total counts
  const uniqueProducts = Array.from(
    cart
      .reduce((acc, product) => {
        if (!acc.has(product.id)) {
          acc.set(product.id, {
            ...product,
            count: getProductCount(product.id),
          });
        }
        return acc;
      }, new Map())
      .values()
  );

  // Calculate the total price of all products in the cart
  const totalPrice = uniqueProducts.reduce((sum, product) => {
    return sum + product.price * product.count;
  }, 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      {uniqueProducts.length === 0 ? (
        <p className="text-center text-muted">
          No hay productos en el carrito.
        </p>
      ) : (
        <div className="list-group">
          {uniqueProducts.map((product) => {
            const totalPriceProduct = product.price * product.count;
            return (
              <div
                key={product.id}
                className="card mb-3 shadow-sm"
                style={{ borderRadius: "0.5rem" }}
              >
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title mb-1">{product.name}</h5>
                    <p className="card-text mb-2">Precio: ${product.price}</p>
                    <p className="card-text mb-2">
                      Descripción: {product.description}
                    </p>
                    <small className="text-muted">
                      Cantidad: {product.count}
                    </small>
                    <h6 className="mt-2 text-success">
                      Total: ${totalPriceProduct.toFixed(2)}
                    </h6>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(product)}
                    title="Eliminar producto"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {uniqueProducts.length > 0 && (
        <div className="mt-4 text-center">
          <h4>Total de la compra: ${totalPrice.toFixed(2)}</h4>
        </div>
      )}
    </div>
  );
}

export default Cart;
