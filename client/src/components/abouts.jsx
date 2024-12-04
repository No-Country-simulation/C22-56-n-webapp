import React from "react";

function About() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="display-4 text-primary">Nuestra Historia</h1>
        </div>
        <div className="col-12 col-md-8 mx-auto">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-success">
                Distri App: Innovación en Distribución
              </h2>
              <p className="card-text">
                Distri App nació en 2015 con una misión clara: revolucionar la
                forma en que las empresas gestionan sus operaciones de
                distribución y logística. Fundada por un equipo de expertos en
                tecnología y logística, nuestra empresa ha crecido de manera
                constante, enfocándose en ofrecer soluciones tecnológicas a
                medida para cada uno de nuestros clientes.
              </p>
              <p className="card-text">
                Desde el principio, Distri App se ha comprometido a crear
                plataformas eficientes que optimicen los procesos, reduzcan
                costos y aumenten la productividad. Con nuestra visión
                innovadora y un enfoque centrado en el cliente, hemos logrado
                transformar la industria, conectando a distribuidores y
                proveedores con un sistema más ágil y transparente.
              </p>
              <p className="card-text">
                Hoy en día, Distri App cuenta con una amplia red de clientes
                satisfechos en diferentes sectores, y continuamos avanzando
                hacia un futuro lleno de nuevas oportunidades para seguir
                liderando el mercado.
              </p>
              <blockquote className="blockquote mt-4">
                <p>
                  "Nuestra misión es hacer la distribución más inteligente y
                  accesible para todos." – Equipo Distri App
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;