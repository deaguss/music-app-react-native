import React, { createContext, useState, useContext } from 'react';
import { Player } from '@/components';

interface PlayerModalContextProps {
    isPlayerVisible: boolean;
    showPlayer: () => void;
    hidePlayer: () => void;
}

const PlayerModalContext = createContext<PlayerModalContextProps | undefined>(undefined);

export const PlayerModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlayerVisible, setPlayerVisible] = useState(false);

    const showPlayer = () => setPlayerVisible(true);
    const hidePlayer = () => setPlayerVisible(false);

    return (
        <PlayerModalContext.Provider value={{ isPlayerVisible, showPlayer, hidePlayer }}>
            {children}
            {isPlayerVisible && <Player onClose={hidePlayer} />}
        </PlayerModalContext.Provider>
    );
};

export const usePlayerModal = (): PlayerModalContextProps => {
    const context = useContext(PlayerModalContext);
    if (!context) {
        throw new Error('usePlayerModal not found.');
    }
    return context;
};
