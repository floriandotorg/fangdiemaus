import { createStore } from 'redux'

export default createStore((state = { lines: [] }, action) => {
  switch(action.type) {
    case 'ADD_TEXT':
      state.lines.push(action.payload.text)
      break
    default: break
  }
  return state
})
