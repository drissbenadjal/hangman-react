import { useContext, useEffect, useState } from "react"

import { LangContext } from "../useContext/langContext";

import { Navbar } from "../components/Navbar";
import { Letter } from '../components/Letter';
import { Hangman } from "../components/Hangman";
import { Endscreen } from "../components/EndScreen";

export const Home = () => {

    const { lang } = useContext(LangContext);

    const [word, setWord] = useState('');
    const DEFAULT_TRY = 11
    const [tryLetters, setTryLetters] = useState(DEFAULT_TRY);
    const [EndValue, setEndValue] = useState(null);
    const [invisible, setInvisible] = useState('');

    const letter = 'abcdefghijklmnopqrstuvwxyz- '.split('');

    const fetchWord = () => {
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
                const underscore = data.word.replace(/[a-z]/gi, '_').replace(/ /g, ' ').replace(/-/g, '-');
                setInvisible(underscore);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchWord();
    }, [lang])

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

    const handleKeyDown = (e) => {
        if (word) {
            if (!letter.includes(e.key.toLowerCase())) {
                return;
            }
            const letterBtn = document.querySelectorAll('.letter');
            letterBtn.forEach(btn => {
                if (btn.innerText.toLowerCase() === e.key.toLowerCase()) {
                    btn.click();
                }
            })
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [word])

    const handleRestart = async () => {
        setTryLetters(DEFAULT_TRY);
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