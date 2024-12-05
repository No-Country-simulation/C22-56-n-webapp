import React from "react";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logo from "../assets/logo.jpg";

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

  const totalPrice = uniqueProducts.reduce((sum, product) => {
    return sum + product.price * product.count;
  }, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    const logoSize = 40;
    const logoX = 10;
    const logoY = 10;
    doc.setFillColor(255, 255, 255);
    doc.ellipse(
      logoX + logoSize / 2,
      logoY + logoSize / 2,
      logoSize / 2,
      logoSize / 2,
      "F"
    );
    doc.addImage(logo, "PNG", logoX, logoY, logoSize, logoSize);

    doc.setFontSize(16);
    doc.text("TICKET DE COMPRA", 200, 30, { align: "right" });

    let startY = 60;
    const imageSize = 20;

    uniqueProducts.forEach((product, index) => {
      const xImage = 10;
      const yImage = startY + index * (imageSize + 10);

      doc.setFillColor(255, 255, 255);
      doc.ellipse(
        xImage + imageSize / 2,
        yImage + imageSize / 2,
        imageSize / 2,
        imageSize / 2,
        "F"
      );
      doc.addImage(product.image, "PNG", xImage, yImage, imageSize, imageSize);

      doc.setFontSize(12);
      doc.text(product.name, xImage + imageSize + 5, yImage + 5);
      doc.text(
        `Cantidad: ${product.count}`,
        xImage + imageSize + 5,
        yImage + 10
      );
      doc.text(
        `$${product.price.toFixed(2)}`,
        xImage + imageSize + 5,
        yImage + 15
      );

      startY = yImage + imageSize + 10;
    });

    doc.setFontSize(12);
    doc.text(`Total de la compra: $${totalPrice.toFixed(2)}`, 10, startY + 10);

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text(
      `Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      10,
      pageHeight - 10
    );

    doc.save("ticket_compra.pdf");

    const newOrder = {
      date: new Date(),
      items: uniqueProducts.map((product) => ({
        name: product.name,
        price: product.price,
        count: product.count,
      })),
    };

    const existingHistory =
      JSON.parse(localStorage.getItem("orderHistory")) || [];
    existingHistory.push(newOrder);
    localStorage.setItem("orderHistory", JSON.stringify(existingHistory));

    setCart([]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
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
                    <div className="d-flex align-items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "15px",
                        }}
                      />
                      <div>
                        <h5 className="card-title mb-1">{product.name}</h5>
                        <p className="card-text mb-2">
                          Precio: ${product.price}
                        </p>
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
            <button className="btn btn-primary mt-3" onClick={generatePDF}>
              Finalizar compra
            </button>
          </div>
        )}
      </div>
      <footer className="text-center mt-4 py-3"></footer>
    </div>
  );
}

export default Cart;
