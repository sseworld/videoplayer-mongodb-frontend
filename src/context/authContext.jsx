import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem("sseUser")) || null);

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:3030/api/auth/login", inputs, {
            withCredentials: true,
        });
        setCurrentUser(res.data)
    };

    useEffect(() => {
        localStorage.setItem("sseUser" ,JSON.stringify(currentUser));
    }, [currentUser]);

    return(
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
};