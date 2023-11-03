import React, { useState, useEffect } from "react";
import Question from "./Question";
import "./style.css";
import questions from "../data/question.json";
import ProgressBar from "./Progressbar";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const [questionTimer, setQuestionTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const questionTimeLimit = 30; // adjust this as needed

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (currentQuestion < questions.length && !quizCompleted) {
      setQuestionTimer(questionTimeLimit);

      const timer = setInterval(() => {
        setQuestionTimer((prevTime) => prevTime - 1);
      }, 5000);

      // Clear the timer when the question changes or the quiz is completed
      return () => clearInterval(timer);
    }
  }, [currentQuestion, questions, quizCompleted]);

  const startQuiz = () => {
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setAnsweredQuestions(0);
    setScore(0);
    setTotalTime(0);
  };

  const handleAnswer = (answer) => {
    if (answer) {
      setAnsweredQuestions(answeredQuestions + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true);
      setEndTime(Date.now());
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }

    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    if (areAllQuestionsAnswered()) {
      // Refresh the page when all questions are answered
      window.location.reload();
    }
  }, [answeredQuestions]);

  useEffect(() => {
    if (quizCompleted) {
      // Quiz is completed
      // Calculate time taken and display the results
      const timeTakenInSeconds = (endTime - startTime) / 1000;
      setTotalTime(timeTakenInSeconds);
    }
  }, [quizCompleted, startTime, endTime]);

  function areAllQuestionsAnswered() {
    return answeredQuestions === questions.length;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledQuestions = shuffleArray(questions);

  return (
    <div className="quiz">
      <ProgressBar
        answeredQuestions={answeredQuestions}
        totalQuestions={questions.length}
      />

      <Question
        key={currentQuestion}
        question={shuffledQuestions[currentQuestion]}
        handleAnswer={handleAnswer}
        isLastQuestion={quizCompleted}
      />

      {quizCompleted && (
        <div>
          <p>Time Taken: {totalTime.toFixed(2)} seconds</p>
          <p>
            Score: {score} / {questions.length}
          </p>
          <button onClick={startQuiz}>Reload Quiz</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
