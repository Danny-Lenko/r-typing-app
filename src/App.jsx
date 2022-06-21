import React from 'react'
import useWordsCounter from './hooks/useWordsCounter'
import './styles.css'

function App() {
  const {
    ref,
    userMsg,
    startTimer,
    handleUserInput,
    timer,
    countStarted,
    wordCount                  
  } = useWordsCounter(7)

  return(
    <>
      <h2>How fast do you type?</h2>

      <textarea
        disabled 
        ref={ref}
        value={userMsg}
        onChange={e => handleUserInput(e)}
      ></textarea>

      <p>Time remaining: {timer}</p>

      <button
        onClick={startTimer}
        disabled={countStarted ? true : false}
      >
        Start
      </button>

      <h2>Word Count: {wordCount}</h2>
    </>
  )
}

export default App