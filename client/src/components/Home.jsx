import React, { useState, useEffect } from "react";
import Logo from "../../public/assets/logo.jpg";

const Home = () => {
  const productImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrnIqhzzOaKK0NHg3akr1A9ERI8fd1gC81iw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUEeSjxQ7xrfI0fWjgvKvMWlMDuRD7VMPyQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYeZazWN5diOGN-oskcRbfZnxxwADQKTk6g&s",
    "https://www.paredro.com/wp-content/uploads/2019/04/7uplogo.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNITOnE9eDuoeTseHHpaRx4kaDYUn1WucYQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xE28Yz7_NGTA1Zwt4FwxVQ5LFjGgfI6LzA&s",
    "https://concurso.pritty.com.ar/img/logo_home.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVnUUlznWyPPUqhNyTwYAlyucKxdvzoeDdRw&s",
  ];

  // Estado para manejar la imagen activa en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLogoVisible, setIsLogoVisible] = useState(true); // Estado para controlar la visibilidad del logo grande
  const [fadeOut, setFadeOut] = useState(false); // Estado para controlar el fade out del logo

  // Efecto para cambiar automáticamente la imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 3500); // Cambia de imagen cada 3 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  // Efecto para manejar la transición del logo
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Activar el fade out
    }, 3000); // Después de 3 segundos, comienza el fade out

    const logoDisappearTimer = setTimeout(() => {
      setIsLogoVisible(false); // Después de un pequeño retraso, cambia el logo a tamaño pequeño
    }, 4000); // Lo hace desaparecer después de 1 segundo de desvanecimiento

    return () => {
      clearTimeout(timer);
      clearTimeout(logoDisappearTimer);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Logo que aparece grande al principio */}
      {isLogoVisible && (
        <div style={styles.logoContainer}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              ...styles.logoLarge,
              opacity: fadeOut ? 0 : 1, // Aplicar la opacidad cuando se haga fade out
              transform: fadeOut ? "scale(0.5)" : "scale(1)", // Reducir el tamaño al mismo tiempo
              transition: "opacity 1s ease, transform 1s ease", // Transición suave para el tamaño y opacidad
            }}
          />
        </div>
      )}

      {/* Contenedor para varios carruseles */}
      {!isLogoVisible && (
        <>
          {/* Logo pequeño al inicio de los carruseles */}
          <div style={styles.smallLogoContainer}>
            <img src={Logo} alt="Logo" style={styles.logo} />
          </div>

          <div style={styles.carouselContainer}>
            {/* Carrusel 1 */}
            <div style={styles.carousel}>
              <div style={styles.imageContainer}>
                <img
                  src={productImages[currentIndex]}
                  alt={`Product ${currentIndex}`}
                  style={styles.image}
                />
              </div>
            </div>

            {/* Carrusel 2 */}
            <div style={styles.carousel}>
              <div style={styles.imageContainer}>
                <img
                  src={productImages[(currentIndex + 1) % productImages.length]}
                  alt={`Product ${(currentIndex + 1) % productImages.length}`}
                  style={styles.image}
                />
              </div>
            </div>

            {/* Carrusel 3 */}
            <div style={styles.carousel}>
              <div style={styles.imageContainer}>
                <img
                  src={productImages[(currentIndex + 2) % productImages.length]}
                  alt={`Product ${(currentIndex + 2) % productImages.length}`}
                  style={styles.image}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center", // Centra todo el contenido
    padding: "20px",
    marginTop: "80px", // Agrega un margen superior para desplazar el contenido hacia abajo, evitando la navbar
  },
  logoContainer: {
    marginBottom: "20px", // Espacio entre el logo y los carruseles
  },
  logoLarge: {
    width: "300px", // Logo grande al principio
    height: "300px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  smallLogoContainer: {
    position: "absolute", // Fija el logo pequeño arriba de los carruseles
    top: "140px", // Ajusta la distancia desde la parte superior de la página
    left: "50%", // Centra el logo
    transform: "translateX(-50%)", // Centra el logo horizontalmente
    marginBottom: "20px", // Espacio entre el logo pequeño y los carruseles
  },
  logo: {
    width: "100px", // Logo pequeño
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  carouselContainer: {
    display: "flex", // Organiza los carruseles en una fila
    justifyContent: "center", // Centra los carruseles en el contenedor
    gap: "20px", // Espacio entre los carruseles
    marginTop: "30px",
  },
  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "500px", // Ajusta el tamaño del carrusel
    height: "300px", // Ajusta el tamaño del carrusel
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Home;
