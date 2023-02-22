import { createContext } from 'react';

export const langContext = () => {
    const context = createContext('fr');
    return context;
}