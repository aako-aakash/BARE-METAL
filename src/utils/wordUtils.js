import { words } from "../data/words"

export const easyWords = words.filter(
  word => word.length >= 4 && word.length <= 6
)

export const mediumWords = words.filter(
  word => word.length >= 7 && word.length <= 9
)

export const hardWords = words.filter(
  word => word.length >= 10
)


export function getResponsiveWord(difficulty = "medium") {
    
  const isMobile = window.innerWidth < 480

  let pool = mediumWords

  if (difficulty === "easy") pool = easyWords
  if (difficulty === "hard") pool = hardWords

  
  if (isMobile) {
    pool = pool.filter(word => word.length <= 9)
  }

  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}
