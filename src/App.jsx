import { useState, useEffect, useRef } from "react"
import { useWindowSize } from "react-use"

import Confetti from "react-confetti"
import { clsx } from "clsx"
import "./App.css"

import Header from "./components/Header"
import GameStatus from "./components/GameStatus"
import LanguageChips from "./components/LanguageChips"
import WordDisplay from "./components/WordDisplay"
import Keyboard from "./components/Keyboard"
import NewGameButton from "./components/NewGameButton"

import { languages } from "./data/languages"
import { getFarewellText, getRandomWord } from "./utils"

import eliminateSound from "./assets/eliminate.mp3"
import winSound from "./assets/win.mp3"
import loseSound from "./assets/lose.mp3"

export default function App() {
  /* ================= CONSTANTS ================= */
  const TOTAL_TIME = 90
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  /* ================= STATE ================= */
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [farewellText, setFarewellText] = useState(null)
  const [isMuted, setIsMuted] = useState(false)

  /* ================= DERIVED VALUES ================= */
  const wrongGuessCount =
    guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const numGuessesLeft = languages.length - 1 - wrongGuessCount
  const isTimeUp = timeLeft === 0

  const isGameWon =
    currentWord.split("").every(letter => guessedLetters.includes(letter))

  const isGameLost =
    wrongGuessCount >= languages.length - 1 || isTimeUp

  const isGameOver = isGameWon || isGameLost

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
  const { width, height } = useWindowSize()

  /* ================= AUDIO ================= */
  const eliminateAudio = useRef(new Audio(eliminateSound))
  const winAudio = useRef(new Audio(winSound))
  const loseAudio = useRef(new Audio(loseSound))

  eliminateAudio.current.volume = 0.35
  winAudio.current.volume = 0.45
  loseAudio.current.volume = 0.45

  const prevWrongGuessCount = useRef(wrongGuessCount)
  const hasPlayedWinSound = useRef(false)
  const hasPlayedLoseSound = useRef(false)

  /* ================= ACTIONS ================= */
  function addGuessedLetter(letter) {
    setGuessedLetters(prev =>
      prev.includes(letter) ? prev : [...prev, letter]
    )
  }

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
    setTimeLeft(TOTAL_TIME)
    setFarewellText(null)

    prevWrongGuessCount.current = 0
    hasPlayedWinSound.current = false
    hasPlayedLoseSound.current = false
  }

  /* ================= GAME STATUS CLASS ================= */
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  })

  /* ================= TIMER ================= */
  useEffect(() => {
    if (isGameOver) return

    const interval = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [isGameOver])

  /* ================= FAREWELL TEXT (FIXED) ================= */
  useEffect(() => {
    if (!isLastGuessIncorrect) return

    const language = languages[wrongGuessCount - 1]?.name
    if (!language) return

    setFarewellText(getFarewellText(language))
  }, [wrongGuessCount])

  /* ================= ELIMINATION SOUND ================= */
  useEffect(() => {
    if (isMuted) return

    if (wrongGuessCount > prevWrongGuessCount.current) {
      eliminateAudio.current.currentTime = 0
      eliminateAudio.current.play().catch(() => {})
    }

    prevWrongGuessCount.current = wrongGuessCount
  }, [wrongGuessCount, isMuted])

  /* ================= WIN SOUND ================= */
  useEffect(() => {
    if (isMuted) return

    if (isGameWon && !hasPlayedWinSound.current) {
      winAudio.current.currentTime = 0
      winAudio.current.play().catch(() => {})
      hasPlayedWinSound.current = true
    }

    if (!isGameWon) {
      hasPlayedWinSound.current = false
    }
  }, [isGameWon, isMuted])

  /* ================= LOSE SOUND ================= */
  useEffect(() => {
    if (isMuted) return

    if (isGameLost && !hasPlayedLoseSound.current) {
      loseAudio.current.currentTime = 0
      loseAudio.current.play().catch(() => {})
      hasPlayedLoseSound.current = true
    }

    if (!isGameLost) {
      hasPlayedLoseSound.current = false
    }
  }, [isGameLost, isMuted])

  /* ================= RENDER ================= */
  return (
    <main className={isGameLost ? "game-lost" : ""}>
      {isGameWon && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={350}
          gravity={0.25}
        />
      )}


      <button
        className="mute-toggle"
        onClick={() => setIsMuted(prev => !prev)}
        aria-label="Toggle sound"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      <Header />

      <GameStatus
        className={gameStatusClass}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        isGameOver={isGameOver}
        isLastGuessIncorrect={isLastGuessIncorrect}
        farewellText={farewellText}
      />

      <LanguageChips
        languages={languages}
        wrongGuessCount={wrongGuessCount}
      />

      <p className="remaining-guesses">
        Remaining guesses: <span>{numGuessesLeft}</span>
      </p>

      <p className="game-timer">
        Time left: <span>{timeLeft}s</span>
      </p>

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

      {isGameOver && <NewGameButton startNewGame={startNewGame} />}
    </main>
  )
}
