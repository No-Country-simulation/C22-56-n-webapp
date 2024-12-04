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

  // Efecto para cambiar automáticamente la imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 3500); // Cambia de imagen cada 3 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {/* Logo encima de los carruseles */}
      <div style={styles.logoContainer}>
        <img src={Logo} alt="Logo" style={styles.logo} />
      </div>

      {/* Contenedor para varios carruseles */}
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
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center", // Centra todo el contenido
    padding: "20px",
  },
  logoContainer: {
    marginBottom: "20px", // Espacio entre el logo y los carruseles
  },
  logo: {
    width: "150px", // Ajusta el tamaño del logo
    height: "150px", // Asegúrate de que sea cuadrado para que se vea redondo
    borderRadius: "50%", // Esto hace que el logo sea redondo
    objectFit: "cover", // Asegura que la imagen se recorte correctamente para mantener la forma redonda
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
