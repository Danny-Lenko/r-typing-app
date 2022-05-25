import { useState, useEffect, useRef } from "react";

export default function useWordsCounter(defaultStartingTime) {
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(defaultStartingTime);
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
    setTimeLeft(defaultStartingTime);
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

  return {
    text,
    handleChange,
    timerStarted,
    textareaRef,
    timeLeft,
    startTimer,
    wordsCount
  };
}
