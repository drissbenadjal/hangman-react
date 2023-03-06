import React, { useContext } from 'react'
import { LangContext } from "../useContext/langContext";

export const Endscreen = ({ message, onClick, word }) => {

    const { lang } = useContext(LangContext);

    let messageAffiche = "Error";
    if (message === 'win') {
        lang === 'fr-FR' ? messageAffiche = 'Vous avez gagné GG' : messageAffiche = 'You win GG'
    }
    if (message === 'loose') {
        lang === 'fr-FR' ? messageAffiche = 'Vous avez perdu réessayez' : messageAffiche = 'You loose try again'
    }

    return (
        <div className="screen">
            <h3>{messageAffiche}</h3>
            <p>
                {
                    lang === 'fr-FR' ? 'Le mot était ' : 'The word was '
                }
                {word}</p>
            <button className="btn" onClick={onClick}>
                {
                    lang === 'fr-FR' ? 'Recommencer' : 'Restart'
                }
            </button>
        </div>
    )
}