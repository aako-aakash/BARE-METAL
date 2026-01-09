import { clsx } from "clsx"

export default function LanguageChips({ languages, wrongGuessCount }) {
    const languageElements = languages.map((lang, index) => {
        const isLost = index < wrongGuessCount

        return (
        <span
            key={lang.name}
            className={clsx("chip", isLost && "lost")}
            style={{
            backgroundColor: lang.backgroundColor,
            color: lang.color
            }}
        >
            {lang.name}
        </span>
        )
    })

    return (
        <section className="language-chips">
        {languageElements}
        </section>
    )
}
