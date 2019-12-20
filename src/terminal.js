import _ from 'lodash'
import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { useLocalStorage } from 'react-use'
import mouse from './mouse.jpg'

export const Terminal = ({ parse }) => {
  const [input, setInput] = useState('')
  const lines = useSelector(state => state.lines)
  const dispatch = useDispatch()
  const inputField = useRef()
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [history, setHistory] = useLocalStorage('history', [])

  const keyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()

      if (_.last(history) !== input) {
        setHistory([input, ...history])
      }

      dispatch({ type: 'ADD_TEXT', payload: { text: `Was tust du?>  ${input}`} })
      parse(input)

      setInput('')
      setHistoryIndex(-1)
    } else if (e.keyCode === 40) {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        setInput(history[historyIndex + 1])
        setHistoryIndex(historyIndex + 1)
      }
    } else if (e.keyCode === 38) {
      e.preventDefault()
      if (historyIndex > 0) {
        setInput(history[historyIndex - 1])
        setHistoryIndex(historyIndex - 1)
      } else {
        setInput('')
      }
    }
  }

  const onClick = () => inputField.current.focus()

  useEffect(() => {
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      <div className='intro'>
        <img src={mouse} />
        <h1>Fang die Maus</h1>
        <p>Die Maus war unartig und hat Schokolade stibitzt. Fröhlich kauend sitzt sie auf dem Küchentisch. Fang sie und führe sie ihrer gerechten Strafe zu.</p>
      </div>
      {lines.map((line, n) => <ReactMarkdown key={n} source={line} />) }
      <p>
        Was tust du?> <input value={input} ref={inputField} onChange={e => setInput(e.target.value)} onKeyDown={keyDown} autoFocus/>
      </p>
    </>
  )
}
