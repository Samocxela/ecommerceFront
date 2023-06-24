import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URI = "http://ecommerceback-production-6a3c.up.railway.app/usuarios/";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate(`/login`);
  };

  const store = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (
      nombre.trim() === "" ||
      password.trim() === "" ||
      direccion.trim() === "" ||
      telefono.trim() === "" ||
      email.trim() === ""
    ) {
      setErrorMessage("Por favor, complete todos los campos.");
      setSuccessMessage("");
      return;
    }

    const existingUser = await checkIfUserExists(nombre);
    if (existingUser) {
      setErrorMessage("El nombre de usuario ya está en uso. Por favor, elija otro.");
      setSuccessMessage("");
    } else {
      await axios.post(URI, {
        nombre: nombre,
        password: password,
        direccion: direccion,
        telefono: telefono,
        email: email,
      });

      alert("Usuario registrado exitosamente");
      setErrorMessage("");
      // Restablecer los valores de los campos del formulario
      setNombre("");
      setPassword("");
      setDireccion("");
      setTelefono("");
      setEmail("");
      navigateLogin();
    }
  };

  const checkIfUserExists = async (username) => {
    const res = await axios.get(URI);
    return res.data.some((user) => user.nombre === username);
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={store}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          type="text"
          name="user"
          id="user"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="pass"
          id="pass"
          placeholder="Password"
        />
        <input
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          type="text"
          name="direccion"
          id="direccion"
          placeholder="Address"
        />
        <input
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          type="text"
          name="telefono"
          id="telefono"
          placeholder="Telephone"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <input type="submit" className="btn-login" value="Register" />
      </form>
    </div>
  );
};

export default Register;
