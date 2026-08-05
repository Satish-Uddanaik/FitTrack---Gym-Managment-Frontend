import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (token) {

            setUser({
                username: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                role: localStorage.getItem("role"),
            });

        }

        setLoading(false);

    }, [token]);

    const login = (authResponse) => {

        localStorage.setItem("token", authResponse.token);
        localStorage.setItem("username", authResponse.username);
        localStorage.setItem("email", authResponse.email);
        localStorage.setItem("role", authResponse.role);

        setToken(authResponse.token);

        setUser({
            username: authResponse.username,
            email: authResponse.email,
            role: authResponse.role,
        });

    };

    const logout = () => {

        localStorage.clear();
        // localStorage.removeItem("token");
        // localStorage.removeItem("username");
        // localStorage.removeItem("email");
        // localStorage.removeItem("role");

        setUser(null);

        setToken(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading,
                isAuthenticated: !!token,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};