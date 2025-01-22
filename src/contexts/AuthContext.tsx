import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { set } from 'react-hook-form';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  cartId: number | null;
  setCartId: (cartId: number | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  userId: null,
  setUserId: () => {},
  cartId: null,
  setCartId: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('user_id'));
  const [cartId, setCartId] = useState<number | null>(null); // Initialize as null

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (userId) {
      localStorage.setItem('user_id', userId);
    } else {
      localStorage.removeItem('user_id');
    }
  }, [token, userId]);

  const logout = () => {
    setToken(null);
    setUserId(null);
    setCartId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('ageVerified')
    // console.log('User logged out and tokens removed.');
    // window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated: !!token,
        userId,
        setUserId,
        cartId,
        setCartId,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
