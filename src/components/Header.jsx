import { useState } from "react"
import { headerPrompts } from "../data/headerPrompts"

export default function Header() {
  const [prompt] = useState(
    () =>
      headerPrompts[
        Math.floor(Math.random() * headerPrompts.length)
      ]
  )

  return (
    <header className="app-header">
      <h1 className="logo spaced-logo">
        BARE&nbsp;METAL
      </h1>

      <p className="header-prompt">
        {prompt}
      </p>

      <p className="instruction-prompt">
        Click letters below to guess the word before only Assembly remains.
      </p>
    </header>
  )
}
