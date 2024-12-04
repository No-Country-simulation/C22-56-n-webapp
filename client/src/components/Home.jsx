import React from "react";
import Logo from "../assets/logo.jpg";

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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6tZzb6fDeGJ2v8oL-8k5yeXiK_fSdZsPcfA&s",
    "https://pbs.twimg.com/profile_images/1013761221248634880/cRzWAp_F_400x400.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8nyMb8CaGbA0dnU5FntlUQNy954ORpa6BdQ&s",
    "https://www.circuitogastronomico.com/wp-content/uploads/2022/05/quilmes.jpg",
    "https://i.pinimg.com/736x/78/c8/4e/78c84e48158cbb1021db27567ff3b891.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiupAPXt32PvzKeY-dn1MUUk72mY8MMco-BA&s",
  ];

  return (
    <div className="container text-center pt-5">
      <div className="mb-4" style={{ position: "relative" }}>
        <img
          src={Logo}
          alt="Logo"
          className="rounded-circle"
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-center mt-5 pt-5">
        {productImages.map((imageUrl, index) => (
          <div
            key={index}
            className="m-2"
            style={{
              width: "150px",
              height: "150px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              src={imageUrl}
              alt={`Product ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "center",
                objectPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
