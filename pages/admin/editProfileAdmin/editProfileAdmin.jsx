import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const URIADMIN = 'https://ecommerce-back-omega.vercel.app/usuarios/1/';

const EditAdmin = () => {
  const [password, setPassword] = useState('');
  const [adress, setAdress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const navigateShop = () => {
    navigate(`/editInventory`);
  };

  const update = async (e) => {
    e.preventDefault();

    // Validar los campos de entrada
    if (password === "" || adress === "" || telephone === "" || email === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Realizar la actualización del admin
    try {
      await axios.put(URIADMIN, {
        password: password,
        direccion: adress,
        telefono: telephone,
        email: email,
      });
      setSuccessMessage("Profile updated successfully.");
      navigateShop();
    } catch (error) {
      setErrorMessage("Error updating profile. Please try again.");
      console.error(error);
      return;
    }
  };

  return (
    <div className="register-form">
      <h2>Edit Profile</h2>
      <form onSubmit={update} action="/auth" method="post">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          type="text"
          name="adress"
          placeholder="Address"
          required
        />
        <input
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          type="text"
          name="telephone"
          placeholder="Telephone"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="Email"
          required
        />
        <input type="submit" className="btn-login" value="Edit" />
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default EditAdmin;
