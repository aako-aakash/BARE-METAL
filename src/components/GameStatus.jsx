export default function GameStatus({
  className,
  isGameWon,
  isGameLost,
  isGameOver,
  isLastGuessIncorrect,
  farewellText
}) {
  function renderStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
        return <p className="farewell-message">{farewellText}</p>
        }

        if (isGameWon) {
        return (
            <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
            </>
        )
        }

        if (isGameLost) {
        return (
            <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
        }

        return null
    }

    return (
        <section
        className={className}
        aria-live="polite"
        role="status"
        >
        {renderStatus()}
        </section>
    )
}
