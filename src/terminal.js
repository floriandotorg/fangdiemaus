import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const Terminal = ({ parse }) => {
  const [input, setInput] = useState('')
  const lines = useSelector(state => state.lines)

  const keyDown = (e) => {
    if (e.keyCode === 13) {
      parse(input)
      setInput('')
    }
  }

  return (
    <>
      { lines.map((line, n) => <p key={n}>{line}</p>) }
      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={keyDown} />
    </>
  )
}
