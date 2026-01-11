export default function NewGameButton({ startNewGame, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      className="new-game"
      onClick={startNewGame}
      aria-label="Start a new game"
    >
      New Game
    </button>
  )
}
