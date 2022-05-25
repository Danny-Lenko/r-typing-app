import "./styles.css";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [timerStarted, setTimerStarted] = useState(false);
  const [wordsCount, setWordsCount] = useState(0);
  const textareaRef = useRef();

  useEffect(() => {
    if (timeLeft > 0 && timerStarted) {
      setTimeout(() => {
        setTimeLeft((prevState) => prevState - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      endTry();
    }
  }, [timeLeft, timerStarted]);

  function handleChange(e) {
    setText(e.target.value);
  }

  function startTimer() {
    setTimeLeft(5);
    setTimerStarted(true);
    setText("");
    setWordsCount(0);
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  }

  function endTry() {
    setTimerStarted(false);
    setWordsCount(calculateWordsNumber(text));
  }

  function calculateWordsNumber(text) {
    return text.split(" ").filter((char) => char !== "").length;
  }

  return (
    <div className="App">
      <h2>How fast do you type?</h2>

      <textarea
        value={text}
        onChange={handleChange}
        disabled={!timerStarted}
        ref={textareaRef}
      />

      <p>Time remaining: {timeLeft}</p>

      <button onClick={startTimer} disabled={timerStarted}>
        Start
      </button>

      <h2>Word count: {wordsCount}</h2>
    </div>
  );
}
