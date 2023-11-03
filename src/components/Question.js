// Question.js
import React, { useState, useEffect } from "react";
import "./style.css";
function Question({ question, handleAnswer, isLastQuestion }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    handleAnswer(selectedAnswer);
    // setSelectedAnswer("");
  };

  useEffect(() => {
    if (isSubmitted && !isLastQuestion) {
      setSelectedAnswer("");
    }
  }, [isSubmitted, isLastQuestion]);

  return (
    <div className="question">
      <h2>{question.question}</h2>
      <form>
        {question.options.map((option, index) => (
          <label key={index} className="radio-label">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </form>
      {/* <button onClick={handleSubmit}>Submit</button> */}
      {isLastQuestion ? (
        <button onClick={handleSubmit}>Finish</button>
      ) : (
        <button onClick={handleSubmit}>Next</button>
      )}
    </div>
  );
}

export default Question;
