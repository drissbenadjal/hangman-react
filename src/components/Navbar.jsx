import React, { useContext } from 'react';

import { LangContext } from '../useContext/langContext';

export const Navbar = ({ onClick }) => {
    const { lang, toggleLang } = useContext(LangContext);

    const handleClick = () => {
        toggleLang();
        onClick();
    }

    return (
        <nav>
            <h1>HANGMAN {lang === 'fr-FR' ? 'Français' : 'English'}</h1>
            <button className='btn--nav' onClick={handleClick}>
                {
                    lang === 'fr-FR' ? 'Change to English' : 'Changer en Français'
                }
            </button>
        </nav>
    )
}