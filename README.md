# 🧠 Bare Metal

**Bare Metal** is a developer-themed word guessing game built with **React**.  
Each wrong guess progressively eliminates a programming language — until only **Assembly** remains.

> When abstractions fail, you’re left with Bare Metal.

---

## 🎮 How the Game Works

- A random word is selected at the start of each game
- Guess letters using an on-screen keyboard
- Every incorrect guess removes one programming language
- The game ends when:
  - ✅ The word is fully guessed
  - ❌ All high-level languages are eliminated
  - ⏱ The timer runs out

---

## ✨ Features

- Interactive word tiles with visible blanks
- On-screen keyboard with correct / wrong feedback
- Progressive elimination of programming languages
- Random farewell messages on each elimination
- Difficulty levels: **Easy, Medium, Hard**
- Countdown timer
- 🎉 Full-screen confetti on win
- 🔊 Sound effects for elimination, win, and loss
- 🔇 Mute / unmute sound control
- 🎯 Auto-focus on “New Game” button after game ends
- Fully responsive UI (handles long words on mobile)
- Accessible UI with keyboard focus management and ARIA support

---

## 🛠 Tech Stack

- **React** (Hooks, functional components)
- **JavaScript (ES6+)**
- **CSS** (Flexbox, Grid, responsive design)
- **Vite** for development and build

---

## 🧠 Key Learnings

- Managing complex state and derived values cleanly
- Correct handling of side effects using `useEffect` and `useRef`
- Preventing unnecessary re-renders and unstable UI
- Designing game-like UX instead of form-based UI
- Improving accessibility and keyboard usability
- Debugging real-world React issues (timers, re-renders, audio)

---

## 🚀 Getting Started

```bash
git clone https://github.com/aako-aakash/BARE-METAL.git
cd bare-metal
npm install
npm run dev

```

👨‍💻 Author
# Akash Kumar Saw
B.Tech CSE (AI & Machine Learning)
D Y Patil University, School of Engineering and Technology

🔗 LinkedIn: https://www.linkedin.com/in/akash-kumar-saw-bb1630258

