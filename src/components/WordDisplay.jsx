import { clsx } from "clsx"

export default function WordDisplay({
    word,
    guessedLetters,
    isGameLost
    }) {
    const letters = word.split("").map((letter, index) => {
        const reveal = isGameLost || guessedLetters.includes(letter)

        return (
        <span
            key={index}
            className={clsx(
            isGameLost &&
                !guessedLetters.includes(letter) &&
                "missed-letter"
            )}
        >
            {reveal ? letter.toUpperCase() : ""}
        </span>
        )
    })

    return <section className="word">{letters}</section>
}
