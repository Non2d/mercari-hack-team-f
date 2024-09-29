import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

interface AuthContextProps {
  user: User | null;
  selectedLabel: number;
  setSelectedLabel: (index: number) => void;
  GPTResponse: any;
  setGPTResponse: (response: any) => void;
}

const AuthContext = createContext<AuthContextProps>({ user: null, selectedLabel: 0, setSelectedLabel: () => {}, GPTResponse: null, setGPTResponse: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<number>(0);
  const [GPTResponse, setGPTResponse] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, selectedLabel, setSelectedLabel, GPTResponse, setGPTResponse}}>
      {children}
    </AuthContext.Provider>
  );
};