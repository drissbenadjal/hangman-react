import { useEffect, useRef } from "react"

export const Hangman = ({ tryLetters }) => {

    const svg = useRef(null);

    useEffect(() => {
        const hangmanassets = [
            {
                'error': 11,
                'svg': '<rect x="49" y="337" width="147" height="8" fill="white" />'
            },
            {
                'error': 10,
                'svg': '<rect x="127" y="50" width="288" height="7.99999" transform="rotate(90 127 50)" fill="white" />'
            },
            {
                'error': 9,
                'svg': '<rect x="292" y="58" width="165" height="7.99999" transform="rotate(-180 292 58)" fill="white" />'
            },
            {
                'error': 8,
                'svg': '<rect x="183.225" y="57.6569" width="80" height="7.99999" transform="rotate(135 183.225 57.6569)" fill="white" />'
            },
            {
                'error': 7,
                'svg': '<rect x="284" y="98" width="40" height="8" transform="rotate(-90 284 98)" fill="white" />'
            },
            {
                'error': 6,
                'svg': '<circle cx="288" cy="120" r="21" stroke="white" strokeWidth="8" />'
            },
            {
                'error': 5,
                'svg': '<rect x="284" y="239" width="95" height="8" transform="rotate(-90 284 239)" fill="white" />'
            },
            {
                'error': 4,
                'svg': '<rect x="288" y="178" width="48" height="8" transform="rotate(-30 288 178)" fill="white" />'
            },
            {
                'error': 3,
                'svg': '<rect width="48" height="8" transform="matrix(-0.866025 -0.5 -0.5 0.866025 288.569 178)" fill="white" />'
            },
            {
                'error': 2,
                'svg': '<rect width="48" height="8" transform="matrix(0.707107 0.707107 0.707107 -0.707107 284 236.657)" fill="white" />'
            },
            {
                'error': 1,
                'svg': '<rect width="48" height="8" transform="matrix(-0.707107 0.707107 0.707107 0.707107 285.941 231)" fill="white" />'
            }
        ];

        const hangman = svg.current;
        const hangmanassetsLength = hangmanassets.length;
        const hangmanassetsError = hangmanassets.map(asset => asset.error);
        const hangmanassetsSvg = hangmanassets.map(asset => asset.svg);

        for (let i = 0; i < hangmanassetsLength; i++) {
            if (tryLetters === hangmanassetsError[i + 1]) {
                hangman.innerHTML += hangmanassetsSvg[i];
            }
        }

    }, [tryLetters])

    return (
        <svg ref={svg} width="500" height="500" viewBox="0 0 381 395" fill="none" xmlns="http://www.w3.org/2000/svg">
        </svg>
    )
}