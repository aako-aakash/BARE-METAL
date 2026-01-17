export default function DifficultySelector({ difficulty, setDifficulty, isGameOver }) {
  return (
    <div className="difficulty-selector">
      <button
        className={difficulty === "easy" ? "active" : ""}
        onClick={() => setDifficulty("easy")}
        disabled={!isGameOver}
      >
        Easy
      </button>

      <button
        className={difficulty === "medium" ? "active" : ""}
        onClick={() => setDifficulty("medium")}
        disabled={!isGameOver}
      >
        Medium
      </button>

      <button
        className={difficulty === "hard" ? "active" : ""}
        onClick={() => setDifficulty("hard")}
        disabled={!isGameOver}
      >
        Hard
      </button>
    </div>
  )
}
