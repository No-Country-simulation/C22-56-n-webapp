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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    const logoDisappearTimer = setTimeout(() => {
      setIsLogoVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(logoDisappearTimer);
    };
  }, []);

  return (
    <div className="container text-center pt-5">
      {isLogoVisible && (
        <div className="mb-4" style={{ position: "relative" }}>
          <img
            src={Logo}
            alt="Logo"
            className={`rounded-circle transition-opacity duration-1000 ${
              fadeOut ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              transition: "opacity 1s, transform 1s",
            }}
          />
        </div>
      )}

      {!isLogoVisible && (
        <>
          <div className="position-relative mb-4" style={{ marginTop: "30px" }}>
            <img
              src={Logo}
              alt="Logo"
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginTop: "-50px",
                marginBottom: "-50px",
              }}
            />
          </div>

          <div className="d-flex justify-content-center gap-3 mt-5 pt-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="d-flex align-items-center justify-content-center"
                style={{ width: "500px", height: "300px" }}
              >
                <div className="overflow-hidden w-100 h-100">
                  <img
                    src={
                      productImages[(currentIndex + i) % productImages.length]
                    }
                    alt={`Product ${(currentIndex + i) % productImages.length}`}
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
