import React, { createContext, useState } from 'react';

const LangContext = createContext();

const LangContextProvider = ({ children }) => {

    const [lang, setLang] = useState('fr-FR');

    const toggleLang = () => {
        if (lang === 'fr-FR') {
            setLang('en-GB');
        } else {
            setLang('fr-FR');
        }
    }

    return (
        <LangContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LangContext.Provider>
    )
}

export { LangContext, LangContextProvider };