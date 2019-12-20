import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import parser from './parser'
import story from './story'
import { Terminal } from './terminal'

const parse = parser(story, text => store.dispatch({ type: 'ADD_TEXT', payload: { text } }))

export const App = () => (
  <Provider store={store}>
    <Terminal parse={parse} />
  </Provider>
)
