import React, { useEffect, useMemo, useState } from "react";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

const getStatusClassName = (status) => {
  const className = !!status
    ? status.toLowerCase().replace("_", "-")
    : "unattempted";

  return `status ${className}`;
};

const getGroupedQuestions = (questions, submissions) => {
  if (!questions || !submissions) {
    return;
  }
  const submissionsMap = submissions.reduce((acc, submission) => {
    acc.set(submission.questionId, submission);
    return acc;
  }, new Map());

  const grouppedQuestions = questions.reduce((acc, q) => {
    if (!Array.isArray(acc[q.category])) {
      acc[q.category] = [];
    }

    acc[q.category].push({ ...q, ...submissionsMap.get(q.id) });
    return acc;
  }, {});

  return grouppedQuestions;
};

const getLabels = (grouppedQuestions) => {
  if (!grouppedQuestions) {
    return;
  }
  const categories = Object.keys(grouppedQuestions);
  return categories.map((category) => {
    const solved = grouppedQuestions[category].filter(
      (question) => question.status === "CORRECT"
    ).length;
    return {
      category,
      text: `${category.toUpperCase()} ${solved} / ${
        grouppedQuestions[category].length
      }`,
    };
  });
};

function Questions({ questions }) {
  return (
    <>
      {questions.map((question) => (
        <div className="question" key={question.id}>
          <div className={getStatusClassName(question.status)}></div>
          <h3>{question.name}</h3>
        </div>
      ))}
    </>
  );
}

export default function QuestionList() {
  const [grouppedQuestions, setGrouppedQuestions] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionResponse = await fetch(QUESTIONS_API_BASE_URL);
      const questions = await questionResponse.json();

      const submissionsResponse = await fetch(SUBMISSIONS_API_BASE_URL);
      const submissions = await submissionsResponse.json();

      setGrouppedQuestions(getGroupedQuestions(questions, submissions));
    };

    fetchQuestions();
  }, []);

  const labels = useMemo(
    () => getLabels(grouppedQuestions),
    [grouppedQuestions]
  );

  if (!grouppedQuestions) {
    return <></>;
  }

  return (
    <div id="root">
      {labels.map(({ category, text }) => {
        return (
          <div class="category" key={category}>
            <h2>{text}</h2>
            <Questions questions={grouppedQuestions[category]} />
          </div>
        );
      })}
    </div>
  );
}
