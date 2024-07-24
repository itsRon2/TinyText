'use client'
import { createContext, useContext, useState } from 'react';

const MessageContext = createContext(
    {selectedContacts: []}
);

export const MessageProvider = ({ children }) => {
    const [selectedContacts, setSelectedContacts] = useState([]);

    const updateSelectedContacts = (newSelectedContacts) => {
        setSelectedContacts(newSelectedContacts);
    };

    return (
        <MessageContext.Provider value={{ selectedContacts, updateSelectedContacts }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => useContext(MessageContext);
