// src/contexts/useAuth.js

import { createContext, useContext, useEffect, useState } from 'react';
import { login, is_authenticated, register } from '../endpoints/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading]                 = useState(true);
  const nav                                   = useNavigate();

  // Verifica si el usuario ya estaba autenticado
  const get_authenticated = async () => {
    try {
      const success = await is_authenticated();
      setIsAuthenticated(success);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Login tradicional
  const login_user = async (username, password) => {
    const success = await login(username, password);
    if (success) {
      setIsAuthenticated(true);
      nav('/');
    }
  };

  // Registro de nuevo usuario
  const register_user = async (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await register(username, email, password);
      alert('Usuario registrado con éxito');
      // ← Redirige aquí, justo después de registrarse
      nav('/login');
    } catch {
      alert('Error al registrar el usuario');
    }
  };

  useEffect(() => {
    get_authenticated();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login_user, register_user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
