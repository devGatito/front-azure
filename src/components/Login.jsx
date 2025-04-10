import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3000/api/admin/login", {
        usuario: email,
        password: password,
      });
  
      // Almacenar token y rol del usuario en el localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.usuario.rol);
  
      console.log("Token almacenado:", response.data.token);
      console.log("User Role almacenado:", response.data.usuario.rol);
  
      // Redirigir a la página de Admin Dashboard después del login exitoso
      console.log("Redirigiendo a /admin/dashboard...");
      navigate("/admin/dashboard");  // Aquí está la corrección
    } catch (error) {
      setErrorMessage("Credenciales incorrectas o error en la autenticación.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default Login;
