import { useState } from "react"
import Confetti from "react-confetti"
import { clsx } from "clsx"
import './App.css'

import Header from "./components/Header"
import GameStatus from "./components/GameStatus"
import LanguageChips from "./components/LanguageChips"
import WordDisplay from "./components/WordDisplay"
import Keyboard from "./components/Keyboard"
import NewGameButton from "./components/NewGameButton"

import { languages } from "./data/languages"
import { getFarewellText, getRandomWord } from "./utils"

export default function App() {
  
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])
  
    const numGuessesLeft = languages.length - 1

    const wrongGuessCount =
      guessedLetters.filter(letter => !currentWord.includes(letter)).length

    const isGameWon =
      currentWord.split("").every(letter => guessedLetters.includes(letter))

    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost

    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect =
      lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    
    function addGuessedLetter(letter) {
        setGuessedLetters(prev =>
          prev.includes(letter) ? prev : [...prev, letter]
        )
    }

    function startNewGame() {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    
    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    return (
      <main>
          {isGameWon && <Confetti />}

          <Header />

          <GameStatus
              className={gameStatusClass}
              isGameWon={isGameWon}
              isGameLost={isGameLost}
              isGameOver={isGameOver}
              isLastGuessIncorrect={isLastGuessIncorrect}
              farewellText={
                isLastGuessIncorrect
                  ? getFarewellText(languages[wrongGuessCount - 1].name)
                  : null
              }
          />

          <LanguageChips
              languages={languages}
              wrongGuessCount={wrongGuessCount}
          />

          <WordDisplay
              word={currentWord}
              guessedLetters={guessedLetters}
              isGameLost={isGameLost}
          />

          <Keyboard
              alphabet={alphabet}
              guessedLetters={guessedLetters}
              currentWord={currentWord}
              isGameOver={isGameOver}
              addGuessedLetter={addGuessedLetter}
          />

          {isGameOver && (
              <NewGameButton startNewGame={startNewGame} />
          )}
      </main>
    )
}

