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
    "https://media.licdn.com/dms/image/v2/D4D0BAQGhxw2CpMErng/company-logo_200_200/company-logo_200_200/0/1692192864709?e=2147483647&v=beta&t=RiuvfJ0SKMrKP7O1hPdIJQFEMeL2g2iOPXclO43xmt4",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyuXxvhsnncJ_j5qCr2vw5OlBhx86w--9pHQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMZrkZ8Oa0g3zDaaTcfRa7ua26Ti3MjoVE3w&s",
    "https://pbs.twimg.com/profile_images/1290415520060018688/oYoZsmHe_400x400.jpg",
    "https://mir-s3-cdn-cf.behance.net/projects/404/7308aa192368169.Y3JvcCwxODQxLDE0NDAsMjA5LDA.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB041M2I3GKtVMpSZ1UswPApWaTmgACu_K7g&s",
    "https://i0.wp.com/www.sitemarca.com/wp-content/uploads/2020/04/Banner_300x250px-03.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAGkeb83Rc8yI1iYBnxwPAseYdmOdvyKWtPA&s",
    "https://http2.mlstatic.com/D_NQ_NP_780168-MLA79602406701_092024-O.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtHC2oeHw7ApPZvBrT74OXnBlnGUPuNQv9nw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcFnz00qgb-Le7TY1TMLjSm93yUdwbrZVs5Q&s",
    "https://http2.mlstatic.com/D_NQ_NP_827332-MLU74423526378_022024-O.webp",
    "https://i.pinimg.com/736x/d3/ed/fa/d3edfaed52ae2d57a6a8a348279c0b42.jpg",
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <img
        src={Logo}
        alt="Logo"
        className="rounded-circle"
        style={{
          marginTop: "50px",
          marginBottom: "-50px",
          width: "10vw",
          height: "10vw",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <div className="d-flex flex-wrap justify-content-center mt-5 pt-5">
        {productImages.map((imageUrl, index) => (
          <div
            key={index}
            className="m-2"
            style={{
              width: "15vw",
              height: "15vw",
              maxWidth: "150px",
              maxHeight: "150px",
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
                objectFit: "cover",
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
