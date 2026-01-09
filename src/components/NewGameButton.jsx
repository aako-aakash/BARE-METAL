export default function NewGameButton({ startNewGame }) {
  return (
    <button
      className="new-game"
      onClick={startNewGame}
    >
      New Game
    </button>
  )
}
