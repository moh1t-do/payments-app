import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const authContext = createContext(false);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:8000/api/v1/user/verify', { token })
                .then(res => {
                    setAuth(true);
                })
                .catch(error => {
                    setAuth(false);
                });
        }
    }, []);
    return (<authContext.Provider value={auth}>
        {children}
    </authContext.Provider>);
}

export function useAuth() {
    return useContext(authContext);
}