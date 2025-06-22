import React, { useEffect, useRef, useState } from "react";

const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

// function reducer(state, action) {
//   switch (action.type) {
//     case 'load':
//       const questions = action.payload.reduce((acc,question) => {
//         acc[question.id] = {...question};
//         return acc;
//       }, {});
//       return {...state, questions};
//     case 'selectChoice':
//       return {...action.payload};
//     default:
//       throw new Error();
//   }
// }

const getClassName = (choice, correctAnswer, index) => {
  if (choice === index) {
    return index === correctAnswer ? "answer correct" : "answer incorrect";
  }

  return "answer";
};

export default function Question({
  question,
  answers,
  correctAnswer,
  initialChoice,
  onChoiceSelect,
}) {
  const [choice, setChoice] = useState(initialChoice);
  return (
    <>
      <h1>{question}</h1>
      {answers.map((answer, index) => (
        <h2
          className={getClassName(choice, correctAnswer, index)}
          key={index}
          onClick={() => {
            if (choice != null) {
              return;
            }
            setChoice(index);
            onChoiceSelect(index);
          }}
        >
          {answer}
        </h2>
      ))}
    </>
  );
}

export default function Quiz() {
  const [selectedChoices, setSelectedChoices] = useState({});
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(QUIZ_API_BASE_URL);
      const questionsData = await response.json();
      setQuestions(questionsData);
      selectedChoices.current = questionsData.map(() => null);
    };
    fetchQuestions();
  }, [setQuestions]);

  if (!questions) {
    return <></>;
  }

  return (
    <div id="root">
      <Question
        {...questions[currentQuestion]}
        key={currentQuestion}
        initialChoice={selectedChoices[currentQuestion]}
        onChoiceSelect={(choice) => {
          const newSelectedChoices = { ...selectedChoices };
          newSelectedChoices[currentQuestion] = choice;
          setSelectedChoices(newSelectedChoices);
        }}
      />
      <button
        onClick={() => setCurrentQuestion(currentQuestion - 1)}
        disabled={currentQuestion === 0}
      >
        Back
      </button>
      <button
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
        disabled={currentQuestion === questions.length - 1}
      >
        Next
      </button>
    </div>
  );
}
