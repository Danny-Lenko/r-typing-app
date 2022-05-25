import "./styles.css";
import React from "react";
import useWordsCounter from "./hooks/useWordsCounter";

export default function App() {
  const {
    text,
    handleChange,
    timerStarted,
    textareaRef,
    timeLeft,
    startTimer,
    wordsCount
  } = useWordsCounter(10);

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
