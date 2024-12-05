import React from "react";

function About() {
  return (
    <div className="row">
      <div className="col-12 text-center mb-4">
        <h1 className="display-4 text-primary">Nuestra Historia</h1>
      </div>
      <div className="col-12 col-md-8 mx-auto">
        <div className="card shadow-lg border-light">
          <img
            src="https://www.fennixdistribuidora.com.br/wp-content/uploads/2021/09/distribuidora-de-alimentos.png"
            className="card-img-top"
            alt="Imagen representativa de la empresa"
          />
          <div className="card-body">
            <h2 className="card-title text-success mb-3">
              Distri App: Innovación en Distribución
            </h2>
            <p className="card-text">
              Distri App nació en 2015 con una misión clara: revolucionar la
              forma en que las empresas gestionan sus operaciones de
              distribución y logística. Fundada por un equipo de expertos en
              tecnología y logística, nuestra empresa ha crecido de manera
              constante, enfocándose en ofrecer soluciones tecnológicas a medida
              para cada uno de nuestros clientes.
            </p>
            <p className="card-text">
              Desde el principio, Distri App se ha comprometido a crear
              plataformas eficientes que optimicen los procesos, reduzcan costos
              y aumenten la productividad. Con nuestra visión innovadora y un
              enfoque centrado en el cliente, hemos logrado transformar la
              industria, conectando a distribuidores y proveedores con un
              sistema más ágil y transparente.
            </p>
            <p className="card-text">
              Hoy en día, Distri App cuenta con una amplia red de clientes
              satisfechos en diferentes sectores, y continuamos avanzando hacia
              un futuro lleno de nuevas oportunidades para seguir liderando el
              mercado.
            </p>
            <blockquote className="blockquote mt-4 border-start border-5 border-success ps-3">
              <p className="mb-0">
                "Nuestra misión es hacer la distribución más inteligente y
                accesible para todos." – Equipo Distri App
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
