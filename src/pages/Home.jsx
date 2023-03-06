import { useContext, useEffect, useState } from "react"

import { LangContext } from "../useContext/langContext";

import { Navbar } from "../components/Navbar";
import { Letter } from '../components/Letter';
import { Hangman } from "../components/Hangman";
import { Endscreen } from "../components/EndScreen";

export const Home = () => {

    const { lang } = useContext(LangContext);

    const [word, setWord] = useState(false);
    const [invisible, setInvisible] = useState(false);
    const [tryLetters, setTryLetters] = useState(12);
    const [EndValue, setEndValue] = useState(null);

    const letter = 'abcdefghijklmnopqrstuvwxyz- '.split('');

    const fetchWord = async () => {
        fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'locale': lang
            })
        })
            .then(res => res.json())
            .then(data => {
                setWord(data.word)
                console.log(data.word + ' ' + lang)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchWord();
    }, [lang])

    useEffect(() => {
        if (word) {
            const underscore = word.replace(/[a-z]/gi, '_').replace(/ /g, ' ').replace(/-/g, '-');
            setInvisible(underscore);
        }
    }, [word])

    const checkLetters = (letter) => {
        if (tryLetters === 0) return;
        const wordArray = word.split('');
        const invisibleArray = invisible.split('');
        let count = 0;
        wordArray.forEach((wordLetter, index) => {
            if (wordLetter === letter) {
                invisibleArray[index] = letter;
                count++;
            }
        })
        if (count === 0) {
            setTryLetters(tryLetters - 1);
        }
        setInvisible(invisibleArray.join(''));
    }

    const handleLetter = (e) => {
        if (word) {
            checkLetters(e.target.innerText.toLowerCase());
            e.target.disabled = true;
        }
    }

    const handleRestart = () => {
        setTryLetters(12);
        fetchWord();
        const letterBtn = document.querySelectorAll('.letter');
        letterBtn.forEach(btn => {
            btn.disabled = false;
        })
        const hangman = document.querySelector('svg');
        hangman.innerHTML = '';
        setEndValue(null);
    }

    useEffect(() => {
        if (word || invisible) {
            if (tryLetters === 0) {
                setEndValue("loose")
            }
            if (invisible === word) {
                setEndValue("win")
            }
        }
    }, [invisible, tryLetters, word])

    return (
        <>
            <Navbar onClick={() => handleRestart()} />
            <div className="hangman__wrapper">
                <Hangman tryLetters={tryLetters} />
                <div className="hangman__container">
                    <p>
                        {
                            lang === 'en-GB' ? 'Number of try ' : 'Nombre de tentatives '
                        }
                        {tryLetters}</p>
                    <h2 className="invisible-word">{invisible}</h2>
                    <div className="letter__container">
                        {
                            letter.map((letter, index) => {
                                return (
                                    <Letter key={index} onClick={(e) => handleLetter(e)}>{letter}</Letter>
                                )
                            })
                        }
                    </div>
                    <button className="btn--secondary" onClick={handleRestart}>
                        {
                            lang === 'en-GB' ? 'Change word' : 'Changer de mot'
                        }
                    </button>
                </div>
                {
                    EndValue && <Endscreen message={EndValue} onClick={() => handleRestart()} word={word} />
                }
            </div>
        </>
    )
}