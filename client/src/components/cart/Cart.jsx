import React from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import logo from "../../assets/logo.jpg";
import CartHeader from "./CartHeader";
import CartProduct from "./CartProduct";
import CartTotal from "./CartTotal";

function Cart() {
  const { cart, setCart, products, setProducts } = useCart();
  const { user, userType } = useUser();

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
      user: {
        name: user.name,
        email: user.email,
        userType: userType,
      },
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

  const sendOrderToServer = async () => {
    try {
      for (const product of uniqueProducts) {
        const newOrder = {
          date: new Date(),
          name: product.name,
          count: product.count,
          price: product.price,
          user: {
            name: user.name,
            email: user.email,
            userType: userType,
          },
        };

        await axios.post("/orders", newOrder);
      }
      alert(`Pedido enviado exitosamente.`);
    } catch (error) {
      console.error("Error al enviar los datos a /orders:", error);
      alert("Hubo un error al enviar el pedido.");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ marginTop: "40px" }}
    >
      <div className="flex-grow-1">
        <CartHeader />
        {uniqueProducts.length === 0 ? (
          <p className="text-center text-muted">
            No hay productos en el carrito.
          </p>
        ) : (
          <div className="list-group">
            {uniqueProducts.map((product) => (
              <CartProduct
                key={product.id}
                product={product}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        )}
        {uniqueProducts.length > 0 && <CartTotal totalPrice={totalPrice} />}
        {uniqueProducts.length > 0 && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={generatePDF}>
              Generar PDF
            </button>
            <button
              className="btn btn-success ms-2"
              onClick={sendOrderToServer}
            >
              Enviar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
