import "./style.css";
function ProgressBar({ answeredQuestions, totalQuestions }) {
  const percentage = (answeredQuestions / totalQuestions) * 100;

  const progressBarStyle = {
    width: `${percentage}%`,
  };

  return (
    <div className="progress-bar">
      <div className="progress" style={progressBarStyle}>
        {answeredQuestions} / {totalQuestions}
      </div>
    </div>
  );
}

export default ProgressBar;
