// context/UserContext.js
'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

const UserContext = createContext();

export const UserProvider = ({ children, session }) => {
    const [user, setUser] = useState(session?.user || null);

    useEffect(() => {
        if (session && session.user) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);

    const logout = async () => {
        await signOut({ redirect: false });
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
