import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import type { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    // State för att hålla reda på den inloggade användaren
    const [user, setUser] = useState<User | null>(null);

    // Logga in användaren genom att skicka credentials till backend och spara token o user i state
    const login = async (credentials: LoginCredentials) => {

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            if (!res.ok) {
                throw new Error("Inloggningen misslyckades.");
            }
            const data = await res.json() as AuthResponse;
            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    }

    // Logga ut användaren genom att ta bort token och nollställa user
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    // Validera token för att behålla användarens inloggning även efter uppdatering av sidan
    const validateToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/validate", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error("Token är ogiltig.");
            }
            const data = await res.json() as User;
            setUser(data);
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <AuthContext.Provider value ={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType=> {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }
    return context;
}