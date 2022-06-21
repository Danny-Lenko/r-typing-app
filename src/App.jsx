import React, { useEffect, useState, useRef } from 'react'
import './styles.css'

function App() {
  const [countStarted, setCountStarted] = useState(false)
  const [timer, setTimer] = useState(5)
  const [interval, setInterval] = useState(false)
  const [userMsg, setUserMsg] = useState('')
  const [wordCount, setWordCount] = useState('')

  const ref = useRef(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (countStarted) {
        setTimer(prevState => prevState - 1)
        setInterval(prevState => !prevState)  
      }
    }, 1000)
    if (timer <= 0) manageTimeIsOut(timerId)
  }, [countStarted, interval])

  function startTimer() {
    setCountStarted(true)
    ref.current.disabled = false
    ref.current.focus()
    if (timer === 0) {
      setTimer(5)
      setWordCount(0)
      setUserMsg('')
    }
  }

  function manageTimeIsOut(timer) {
    clearInterval(timer)
    ref.current.disabled = true
    setCountStarted(false)
    setWordCount(userMsg.split(' ').filter(word => word !== '').length)
  }

  function handleUserInput(e) {
    setUserMsg(e.target.value)
  }

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