export const Letter = ({ children, onClick }) => {
    return (
        <button className="letter" onClick={onClick}>{children}</button>
    )
}