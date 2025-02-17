import React, { createContext, useState, useContext } from 'react';

interface ModalContextProps {
    isVisible: boolean;
    showModal: () => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <ModalContext.Provider value={{ isVisible, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal not found.');
    }
    return context;
};
