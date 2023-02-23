export const Endscreen = ({ message, onClick, word }) => {
    let messageAffiche = "Error";
    if (message === 'win') {
        messageAffiche = 'You win GG'
    }
    if (message === 'loose') {
        messageAffiche = 'You loose try again'
    }

    return (
        <div className="screen">
            <h3>{messageAffiche}</h3>
            <p>The word was {word}</p>
            <button className="btn" onClick={onClick}>restart the game</button>
        </div>
    )
}