import React, { useState } from 'react';
import axios from 'axios';

const LoginModal = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;
      onLoginSuccess(token);
    } catch (err) {
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;