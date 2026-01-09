import { clsx } from "clsx"

export default function Keyboard({
    alphabet,
    guessedLetters,
    currentWord,
    isGameOver,
    addGuessedLetter
    }) {
    const keys = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)

        return (
        <button
            key={letter}
            className={clsx({ correct: isCorrect, wrong: isWrong })}
            disabled={isGameOver}
            aria-disabled={isGuessed}
            aria-label={`Letter ${letter}`}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>
        )
    })

    return <section className="keyboard">{keys}</section>
}
