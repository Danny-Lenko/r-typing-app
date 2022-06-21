import { useEffect, useState, useRef } from 'react'

function useWordsCounter(initialTime) {

   const [countStarted, setCountStarted] = useState(false)
   const [timer, setTimer] = useState(initialTime)
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
   }, [countStarted, timer])
 
   function startTimer() {
     setCountStarted(true)
     ref.current.disabled = false
     ref.current.focus()
     if (timer === 0) {
       setTimer(initialTime)
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
   
   return({
      ref,
      userMsg,
      startTimer,
      handleUserInput,
      timer,
      countStarted,
      wordCount                  
   })
}

export default useWordsCounter