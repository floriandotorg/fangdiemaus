import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import mouse from './mouse.jpg'

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
      <div className='intro'>
        <img src={mouse} />
        <h1>Fang die Maus</h1>
        <p>Die Maus war unartig und hat Schokolade stibitzt. Fröhlich kauend sitzt sie auf dem Küchentisch. Fang sie und führe sie ihrer gerechten Strafe zu.</p>
      </div>
      {lines.map((line, n) => <ReactMarkdown key={n} source={line} />) }
      <p>
        Was tust du?> <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={keyDown} autoFocus/>
      </p>
    </>
  )
}
