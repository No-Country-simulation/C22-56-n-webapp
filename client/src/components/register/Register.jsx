import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [dni, setDni] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [province, setProvince] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const provinces = {
    "Buenos Aires": [
      "La Plata",
      "Mar del Plata",
      "Bahía Blanca",
      "Tandil",
      "Lomas de Zamora",
      "Avellaneda",
      "Morón",
      "Lanús",
      "Quilmes",
      "San Isidro",
      "Tigre",
      "Vicente López",
      "San Fernando",
      "Moreno",
      "Esteban Echeverría",
      "Almirante Brown",
      "San Martín",
      "La Matanza",
      "Ituzaingó",
    ],
    CABA: [
      "Balvanera",
      "Caballito",
      "Recoleta",
      "Palermo",
      "San Telmo",
      "Villa Devoto",
      "Villa Urquiza",
      "Villa del Parque",
    ],
    Catamarca: [
      "San Fernando del Valle de Catamarca",
      "Belén",
      "Santa María",
      "Andalgalá",
      "Tinogasta",
      "Fiambalá",
    ],
    Chaco: [
      "Resistencia",
      "San Fernando",
      "Villa Ángela",
      "Charata",
      "Sáenz Peña",
      "El Sauzalito",
      "Castelli",
    ],
    Chubut: [
      "Trelew",
      "Puerto Madryn",
      "Comodoro Rivadavia",
      "Rawson",
      "Esquel",
      "Dolavon",
      "Gaiman",
      "Rada Tilly",
    ],
    Córdoba: [
      "Córdoba",
      "Río Cuarto",
      "Villa María",
      "Alta Gracia",
      "Bell Ville",
      "San Francisco",
      "Carlos Paz",
      "Río Tercero",
    ],
    Corrientes: [
      "Corrientes",
      "Goya",
      "Mercedes",
      "Resistencia",
      "Paso de los Libres",
      "Esquina",
      "La Cruz",
    ],
    "Entre Ríos": [
      "Paraná",
      "Concordia",
      "Gualeguaychú",
      "Colón",
      "Victoria",
      "La Paz",
      "Nogoyá",
      "Villaguay",
    ],
    Formosa: [
      "Formosa",
      "Clorinda",
      "Pirané",
      "Ingeniero Juárez",
      "General Güemes",
      "Las Lomitas",
    ],
    Jujuy: [
      "San Salvador de Jujuy",
      "Palpalá",
      "Perico",
      "La Quiaca",
      "El Carmen",
      "Maimará",
      "Humahuaca",
    ],
    "La Pampa": [
      "Santa Rosa",
      "General Pico",
      "Realicó",
      "Toay",
      "Alvear",
      "Catriló",
      "Macachín",
    ],
    "La Rioja": [
      "La Rioja",
      "Chilecito",
      "Aimogasta",
      "Villa Unión",
      "Famatina",
      "Nonogasta",
    ],
    Mendoza: [
      "Capital",
      "Godoy Cruz",
      "Maipú",
      "Luján de Cuyo",
      "San Martín",
      "Lavalle",
      "Tupungato",
      "Rivadavia",
      "General Alvear",
      "San Rafael",
      "Malargüe",
      "Junín",
      "Guaymallén",
      "Las Heras",
      "La Paz",
    ],
    Misiones: [
      "Posadas",
      "Eldorado",
      "Oberá",
      "San Vicente",
      "Leandro N. Alem",
      "Apóstoles",
      "Montecarlo",
    ],
    Neuquén: [
      "Neuquén",
      "San Martín de los Andes",
      "Zapala",
      "Chos Malal",
      "Plaza Huincul",
      "Cutral Có",
    ],
    "Río Negro": [
      "Viedma",
      "General Roca",
      "Cipolletti",
      "Allen",
      "Villa Regina",
      "San Carlos de Bariloche",
      "Jacobacci",
    ],
    Salta: [
      "Salta",
      "Rosario de la Frontera",
      "Orán",
      "Tartagal",
      "Metán",
      "La Caldera",
      "General Güemes",
    ],
    "San Juan": [
      "San Juan",
      "Chimbas",
      "Rivadavia",
      "Santa Lucía",
      "Rawson",
      "Caucete",
      "Sarmiento",
    ],
    "San Luis": [
      "San Luis",
      "Villa Mercedes",
      "La Punta",
      "Merlo",
      "Candelaria",
      "Luján",
      "Santa Rosa",
    ],
    "Santa Fe": [
      "Rosario",
      "Santa Fe",
      "Venado Tuerto",
      "Rafaela",
      "Reconquista",
      "Esperanza",
      "San Lorenzo",
    ],
    "Santiago del Estero": [
      "Santiago del Estero",
      "La Banda",
      "Termas de Río Hondo",
      "Frías",
      "Quimilí",
      "Añatuya",
    ],
    "Tierra del Fuego": ["Ushuaia", "Río Grande", "Tolhuin"],
    Tucumán: [
      "San Miguel de Tucumán",
      "Tafí Viejo",
      "Concepción",
      "Yerba Buena",
      "Monteros",
      "Simoca",
      "Las Talitas",
    ],
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setCity("");
    setAvailableCities(provinces[selectedProvince] || []);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      city === "" ||
      address === "" ||
      dni === "" ||
      province === ""
    ) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setErrorMessage("");
    console.log("Registrando usuario:", {
      email,
      password,
      city,
      address,
      dni,
      province,
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="text-center mb-4">Registro</h2>
            <form onSubmit={handleRegister}>
              <FormInput
                id="email"
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormInput
                id="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FormSelect
                id="province"
                label="Provincia"
                value={province}
                onChange={handleProvinceChange}
                options={Object.keys(provinces)}
                required
              />
              <FormSelect
                id="city"
                label="Ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={availableCities}
                required
              />
              <FormInput
                id="address"
                label="Domicilio"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <FormInput
                id="dni"
                label="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
              {/* Mensaje de error */}
              {errorMessage && <ErrorMessage message={errorMessage} />}
              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
