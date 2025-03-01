/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Rwandaflag from "../assets/images/Rwanda.png";
import { UserContext } from "../context/HookContext";
import axiosInstance from "../axiosIntance";

const LevelsPage = () => {
  const { levelId } = useParams();
  const { scores, setScores, userDetails } = useContext(UserContext);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [detectedLevel, setDetectedLevel] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allLessons, setAllLessons] = useState(() => {
    const cachedLessons = localStorage.getItem(
      `lessons_${levelId}_${selectedLanguage.toLowerCase()}`
    );
    return cachedLessons ? JSON.parse(cachedLessons) : [];
  });
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState(60);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const levelMap = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
  };

  const languageOptions = [
    "English",
    "French",
    "Spanish",
    "German",
    "Swahili",
    "Arabic",
    "Chinese",
    "Japanese",
    "Russian",
    "Portuguese",
  ];

  useEffect(() => {
    const currentLevel = levelMap[levelId] || "Beginner";
    const cacheKey = `lessons_${levelId}_${selectedLanguage.toLowerCase()}`;
    const cachedLessons = localStorage.getItem(cacheKey);

    if (!cachedLessons || JSON.parse(cachedLessons).length === 0) {
      fetchLessonsForLevel(currentLevel, selectedLanguage);
    } else {
      setAllLessons(JSON.parse(cachedLessons));
      selectRandomLesson();
    }
  }, [levelId, selectedLanguage]);

  useEffect(() => {
    if (allLessons.length > 0) {
      setDetectedLevel(null);
      setLesson(null);
      setQuiz(null);
      setError(null);
      setLoading(true);
      setUserAnswers({});
      setShowAnswers(false);
      setScore(null);
      selectRandomLesson();
    }
  }, [allLessons]);

  useEffect(() => {
    let interval;
    if (isQuizActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (isQuizActive && timer === 0) {
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [isQuizActive, timer]);

  const fetchLessonsForLevel = async (level, language) => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `
        You are a Kinyarwanda language tutor. Generate lessons for ${level} level only, translating from ${language} to Kinyarwanda:
        - Topics: ${
          level === "Beginner"
            ? '"Greetings", "Numbers and Time", "Basic Directions and Locations", "Basic Food and Drinks Vocabulary", "Common Phrases for Travel"'
            : level === "Intermediate"
            ? '"Shopping and Bargaining", "Healthcare and Emergencies", "Work and Employment", "Socializing and Cultural Norms"'
            : '"News and Current Events", "Advanced Social Etiquette and Culture", "Advanced Business Vocabulary", "Philosophy, Religion, and Worldviews"'
        }
        For each topic:
        1. Provide a lesson with a topic name and a vocabulary table (5 words/phrases) in ${language} and Kinyarwanda.
        2. Include a quiz with 10 questions (e.g., translation, fill-in-the-blank, multiple choice) with 4 options each and one correct answer.
        Return the response as a valid JSON array where each item has an id, level, lesson, and quiz:
        [
          {"id": 1, "level": "${level}", "lesson": {"topic": "string", "vocabulary": [{"${language.toLowerCase()}": "string", "kinyarwanda": "string"}, ...]}, "quiz": [{"question": "string", "options": ["string", "string", "string", "string"], "answer": "string"}, ...]},
          ...
        ]
        - Ensure each quiz has exactly 10 questions with 4 options.
        - Ensure the response is pure JSON without Markdown (no \`\`\`json or similar).
        - Do not include any additional text outside the JSON structure.
      `;

      const response = await callGeminiAPI(prompt);
      let parsedData;
      try {
        parsedData = JSON.parse(
          response
            .trim()
            .slice(response.indexOf("["), response.lastIndexOf("]") + 1)
        );
      } catch (parseErr) {
        if (parseErr.message.includes("Unexpected token")) {
          console.log("Suppressed JSON parsing error:", parseErr.message);
          return;
        }
        throw parseErr;
      }

      console.log(`Lessons for ${level}:`, parsedData);
      setAllLessons(parsedData);
      localStorage.setItem(
        `lessons_${levelId}_${language.toLowerCase()}`,
        JSON.stringify(parsedData)
      );
    } catch (err) {
      if (!err.message.includes("Unexpected token")) {
        setError(`Failed to fetch lessons: ${err.message}`);
      }
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setAllLessons([]);
  };

  const handleRefreshLessons = () => {
    const currentLevel = levelMap[levelId] || "Beginner";
    setAllLessons([]);
    fetchLessonsForLevel(currentLevel, selectedLanguage);
  };

  const selectRandomLesson = () => {
    const currentLevel = levelMap[levelId] || "Beginner";
    setDetectedLevel(currentLevel);

    const levelLessons = allLessons.filter(
      (lessonItem) =>
        lessonItem.level.toLowerCase() === currentLevel.toLowerCase()
    );
    console.log(`Lessons for ${currentLevel}:`, levelLessons);

    if (levelLessons.length > 0) {
      const randomIndex = Math.floor(Math.random() * levelLessons.length);
      const selectedLesson = levelLessons[randomIndex];
      console.log("Selected lesson:", selectedLesson);
      setLesson(selectedLesson.lesson);
      setQuiz(selectedLesson.quiz);
    } else {
      setError(`No lessons available for this level (${currentLevel}).`);
    }
    setLoading(false);
  };

  const callGeminiAPI = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait and try again.");
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      throw err;
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

const handleSubmit = async () => {
  setShowAnswers(true);
  setIsQuizActive(false);
  let correctCount = 0;
  quiz.forEach((item, index) => {
    if (userAnswers[index] === item.answer) {
      correctCount++;
    }
  });
  setScore(correctCount);

  try {
    if (!userDetails || !userDetails[0].id) {
      throw new Error("User details not available");
    }

    // Save the score to the backend
    const response = await axiosInstance.post("/scores/save", {
      userId: userDetails[0].id,
      score: correctCount,
      level: detectedLevel,
    });
    // isTestButtonDisabled
    // Update the scores state in the context
    const newScore = {
      score: correctCount,
      level: detectedLevel,
      created_at: new Date().toISOString(),
    };
    setScores((prev) => [newScore, ...prev]);

    console.log("Score saved:", response.data);
  } catch (err) {
    setError(`Error saving score: ${err.response?.data?.error || err.message}`);
    console.error("Submit error:", err);
  }

  evaluateQuiz(correctCount);
};

  const handleStartQuiz = () => {
    console.log("Quiz button clicked");
    setIsQuizActive(true);
    setTimer(60);
    setUserAnswers({});
    setShowAnswers(false);
    setScore(null);
    setQuizResult(null);
    const modal = document.getElementById("quiz_modal");
    if (modal) {
      console.log("Opening modal");
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  const handleTimerEnd = async () => {
    await handleSubmit();
  };

  const evaluateQuiz = (correctCount) => {
    if (correctCount >= 7) {
      setQuizResult("pass");
    } else {
      setQuizResult("fail");
    }
  };

  const getTimerColor = () => {
    if (timer <= 10) return "text-red-500";
    if (timer <= 30) return "text-yellow-500";
    return "text-green-500";
  };

const isTestButtonDisabled = () => {
  const currentLevelNum = parseInt(levelId);
  const currentLevel = levelMap[currentLevelNum] || "Beginner";

  // Check if the current level is already passed
  const isLevelPassed = scores.some(
    (s) => s.level === currentLevel && s.score >= 7
  );

  // Disable if the current level is already passed
  if (isLevelPassed) {
    return true;
  }

  // Disable higher levels if prerequisites aren't met
  if (currentLevelNum === 2 && !scores.some((s) => s.level === "Beginner" && s.score >= 7)) {
    return true;
  }
  if (
    currentLevelNum === 3 &&
    (!scores.some((s) => s.level === "Beginner" && s.score >= 7) ||
    !scores.some((s) => s.level === "Intermediate" && s.score >= 7)
  )) {
    return true;
  }

  // Enable if not passed and prerequisites are met
  return false;
};

  return (
    <div className="relative p-4">
      <div className="grid grid-cols-2 justify-between items-center">
        <h1 className="text-[20px] font-semibold relative">
          <span>Learn Kinyarwanda</span>
          <span className="absolute top-2 left-[42%]">
            <img src={Rwandaflag} alt="Rwanda Flag" className="w-[5%]" />
          </span>
        </h1>
        <h1 className="text-[20px] font-semibold">
          Detected Level: {detectedLevel}
        </h1>
      </div>

      <div className="absolute top-[100%] left-[50%]">
        {loading && (
          <p>
            <span className="loading loading-bars loading-lg"></span>
          </p>
        )}
      </div>

      {!loading && error && <p className="text-red-500">{error}</p>}

      {!loading && detectedLevel && lesson && (
        <>
          <h3>
            Lesson: <span className="font-semibold">{lesson.topic}</span>
          </h3>
          <table className="table-auto mt-2 w-full table">
            <thead>
              <tr className="hover text-[18px] text-success">
                <th>
                  <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="select select-bordered w-full max-w-xs"
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </th>
                <th>Kinyarwanda</th>
              </tr>
            </thead>
            <tbody>
              {lesson.vocabulary.map((item, index) => (
                <tr key={index} className="hover">
                  <td className="px-4 py-2">
                    {item[selectedLanguage.toLowerCase()]}
                  </td>
                  <td className="px-4 py-2">{item.kinyarwanda}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                <li>
                  Warning: To click on Test button you approve that you are
                  ready to pass the test, failing/winning this test will result
                  in progress of your lessons.
                </li>
                <li>
                  Warning: The test has 10 questions from all studied questions
                  in the lesson. You have 1 minute to complete it. Achieve 70%
                  (7/10 questions) to pass; otherwise, retry after 1 minute.
                </li>
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="btn btn-success"
              onClick={handleStartQuiz}
              disabled={isTestButtonDisabled()}
            >
              Test Your Knowledge
            </button>
            <button className="btn btn-primary" onClick={handleRefreshLessons}>
              Refresh Lessons
            </button>
          </div>

          <dialog id="quiz_modal" className="modal">
            <div className="modal-box max-w-3xl">
              <h3 className="font-bold text-lg">Quiz Time!</h3>
              {isQuizActive && (
                <p className={`font-semibold ${getTimerColor()}`}>
                  Time Remaining: {timer} seconds
                </p>
              )}
              <div className="py-4">
                {quiz && (
                  <>
                    {quizResult === "pass" && (
                      <div className="alert alert-success mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>
                          Congratulations! You scored {score}/10. You can now
                          proceed to the next level.
                        </span>
                      </div>
                    )}
                    {quizResult === "fail" && (
                      <div className="alert alert-error mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>
                          You scored {score}/10. You need 7/10 to pass. Please
                          retry after 1 minute.
                        </span>
                      </div>
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (isQuizActive) handleSubmit();
                      }}
                    >
                      {showAnswers && score !== null && (
                        <p className="text-xl font-semibold mb-4">
                          Your Score: {score}/10
                        </p>
                      )}
                      <ol className="list-decimal ml-6">
                        {quiz.map((item, index) => (
                          <li key={index} className="mt-6">
                            <p className="font-semibold">{item.question}</p>
                            <div className="mt-2">
                              {item.options.map((option, optIndex) => (
                                <div key={optIndex} className="form-control">
                                  <label className="label cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${index}`}
                                      value={option}
                                      checked={userAnswers[index] === option}
                                      onChange={() =>
                                        handleAnswerChange(index, option)
                                      }
                                      className="radio radio-primary mr-2"
                                      disabled={!isQuizActive || showAnswers}
                                    />
                                    <span className="label-text">{option}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                            {showAnswers && (
                              <p className="mt-2">
                                {userAnswers[index] !== item.answer ? (
                                  <>
                                    <span className="text-red-600">
                                      <strong>Your Answer:</strong>{" "}
                                      {userAnswers[index] || "Not answered"}
                                    </span>
                                    <br />
                                    <span className="text-green-600">
                                      <strong>Correct Answer:</strong>{" "}
                                      {item.answer}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-green-600">
                                    <strong>Correct Answer:</strong>{" "}
                                    {item.answer}
                                  </span>
                                )}
                              </p>
                            )}
                          </li>
                        ))}
                      </ol>
                      {!showAnswers && isQuizActive && (
                        <div className="mt-6">
                          <button type="submit" className="btn btn-success">
                            Submit Answers
                          </button>
                        </div>
                      )}
                      {quizResult === "fail" && !isQuizActive && (
                        <div className="mt-6">
                          <button
                            className="btn btn-primary"
                            onClick={handleStartQuiz}
                            disabled={timer > 0}
                          >
                            Retry Quiz (Wait {timer} seconds)
                          </button>
                        </div>
                      )}
                    </form>
                  </>
                )}
              </div>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => document.getElementById("quiz_modal").close()}
                  disabled={isQuizActive}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
};

export default LevelsPage;
