import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

interface AuthContextProps {
  user: User | null;
  selectedLabel: number;
  setSelectedLabel: (index: number) => void;
}

const AuthContext = createContext<AuthContextProps>({ user: null, selectedLabel: 0, setSelectedLabel: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, selectedLabel, setSelectedLabel }}>
      {children}
    </AuthContext.Provider>
  );
};