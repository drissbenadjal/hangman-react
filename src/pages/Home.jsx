import { useContext, useEffect, useState } from "react"

import { langContext } from '../useContext/langContext';

import { Letter } from '../components/Letter';
import { Endscreen } from "../components/EndScreen";
import { Hangman } from "../components/Hangman";

export const Home = () => {

    const [word, setWord] = useState(false);
    const [invisible, setInvisible] = useState(false);
    const [tryLetters, setTryLetters] = useState(12);
    const [EndValue, setEndValue] = useState(null)

    const letter = 'abcdefghijklmnopqrstuvwxyz- '.split('');

    const fetchWord = async () => {
        fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'locale': 'fr-FR',
            })
        })
            .then(res => res.json())
            .then(data => {
                data.word = data.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                setWord(data.word)
                console.log(data.word)
            })
    }

    useEffect(() => {
        fetchWord();
    }, [])

    useEffect(() => {
        if (word) {
            const count = word.length;
            const underscore = '_'.repeat(count);
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
        setEndValue(null);
        setTryLetters(12);
        fetchWord();
        const letterBtn = document.querySelectorAll('.letter');
        letterBtn.forEach(btn => {
            btn.disabled = false;
        })
        const hangman = document.querySelector('svg');
        hangman.innerHTML = '';
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
        <div className="hangman__wrapper">
            <Hangman tryLetters={tryLetters} />
            <div className="hangman__container">
                <p>Number of try {tryLetters}</p>
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
                <button className="btn--secondary" onClick={handleRestart}>Change word</button>
            </div>
            {
                EndValue && <Endscreen message={EndValue} onClick={() => handleRestart()} word={word} />
            }
        </div>
    )
}