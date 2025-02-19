import React, { createContext, useState, useContext } from 'react';

interface ModalFullContextProps {
    isVisible: boolean;
    showModal: () => void;
    hideModal: () => void;
}

const ModalFullContext = createContext<ModalFullContextProps | undefined>(undefined);

export const ModalFullProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <ModalFullContext.Provider value={{ isVisible, showModal, hideModal }}>
            {children}
        </ModalFullContext.Provider>
    );
};

export const useModalFull = (): ModalFullContextProps => {
    const context = useContext(ModalFullContext);
    if (!context) {
        throw new Error('useModalFull not found.');
    }
    return context;
};
