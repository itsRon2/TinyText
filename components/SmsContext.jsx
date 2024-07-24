'use client'
import { createContext, useContext, useState } from 'react';

const SmsContext = createContext(
    {selectedContactsSms: []}
);

export const SmsProvider = ({ children }) => {
    const [selectedContactsSms, setSelectedContactsSms] = useState([]);

    const updateSelectedContactsSms = (newSelectedContacts) => {
        setSelectedContactsSms(newSelectedContacts);
    };

    return (
        <SmsContext.Provider value={{ selectedContactsSms, updateSelectedContactsSms }}>
            {children}
        </SmsContext.Provider>
    );
};

export const useSmsContext = () => useContext(SmsContext);
