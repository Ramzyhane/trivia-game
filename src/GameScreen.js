import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SiHappycow } from "react-icons/si";

const GameScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice(); 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=20&category=18');
        const shuffledQuestions = response.data.results.map(question => {
          const shuffledAnswers = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer
          ]);
          return {
            ...question,
            answers: shuffledAnswers
          };
        });
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    const isCorrect = answer === correctAnswer;

    setAnswers(prevAnswers => [
      ...prevAnswers,
      { question: questions[currentQuestionIndex].question, answer, isCorrect }
    ]);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer('');
      }
    }, 2000);
  };

  return (
    <div className="App">
      <h1 > שאלות ותשובות</h1>
      {questions.length > 0 && (
        <div>
          <h2>שאלה {currentQuestionIndex + 1} מתוך {questions.length}</h2>
          <h3>{questions[currentQuestionIndex].question} <span>{<SiHappycow  style={{ color:'#ffcc00' }}/>}</span></h3>

          <ul>
            {shuffleArray(questions[currentQuestionIndex].answers).map((answer, index) => (
              <li key={index}>
                <button onClick={() => handleAnswerSelect(answer)}>{answer}</button>
              </li>
            ))}
          </ul>
          {showFeedback && (
            <div>
              <p>{selectedAnswer === questions[currentQuestionIndex].correct_answer ? 'תשובה נכונה!' : 'תשובה לא נכונה'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
