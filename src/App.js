import React from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  return (
    <div className="app" style={{ textAlign: "center", marginBottom: "20px" }}>
      <h3>Assignment: JavaScript Dynamic Quiz Application</h3>
      <h1>Quiz Application</h1>
      <h5>
        <p>Randomize order of questions each time the quiz is started. </p>
        <p>
          At the end of quiz you can see the amount of time u spend on the quiz.
        </p>
        <p>
          Each question should be answered within 5 seconds of time else it will
          take to next question quiz.
        </p>
        <p>
          Progress bar is there indicating how many questions have been
          answered.
        </p>
      </h5>
      <Quiz />
      <footer style={{ textAlign: "center", marginTop: "100px" }}>
        Name - Anuj Boricha
      </footer>
    </div>
  );
}

export default App;
