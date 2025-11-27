import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

const Result = () => {
  const navigate = useNavigate();
  const result = JSON.parse(sessionStorage.getItem("quizResult"));
  const [showAnswers, setShowAnswers] = useState(false);

  if (!result) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg">No result found. Please take the quiz first.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
        >
          Go to Quiz
        </button>
      </div>
    );
  }

  const correctCount = result.score;
  const total = result.totalQuestions;
  const percentage = Math.round((correctCount / total) * 100);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz Result</h1>
      <div className="text-center mb-6">
        <p className="text-xl">Score: <span className="font-semibold">{correctCount} / {total}</span></p>
        <p className="text-lg mt-2">Percentage: <span className="font-semibold">{percentage}%</span></p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
          >
            {showAnswers ? "Hide Review" : "Show Review"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Retake Quiz
          </button>
        </div>
      </div>

      {showAnswers && (
        <div>
          {result.review.map((r, idx) => (
            <QuestionCard
              key={r.questionId}
              question={{ ...r, correctAnswer: r.correctAnswer }}
              index={idx}
              userAnswer={r.userAnswer}
              onSelectOption={null}
              showCorrect={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Result;
