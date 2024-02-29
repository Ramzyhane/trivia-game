import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SiHappycow } from "react-icons/si";
import { IoTimer } from "react-icons/io5";
import { FaRegHourglassHalf } from "react-icons/fa6";
import OffGameScreen from './OffGameScreen';


const GameScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerCount, setTimerCount] = useState(0);
  
  const totalQuestions = 20;


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

  useEffect(() =>{
    const timer = setInterval(() =>{
      setSeconds(seconds => seconds + 1);
      setTimerCount(timerCount => timerCount + 1);  
      
      if (timerCount >= 15) { 
        goToNextQuestion();
        setSeconds(0); 
        
      }
      if(seconds === 59){
        setMinutes(minutes => minutes + 1);
        setSeconds(0);
      }
      if(currentQuestionIndex === totalQuestions-1){
        setSeconds(0);
        setMinutes(0)
      }
    },1000);

    return () => clearInterval(timer); 

  }, [seconds, timerCount]); 

  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length ) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer('');
      setTimerCount(0); 
    } else {
      handleEndGame();
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    const isCorrect = answer === correctAnswer;

    setAnswers(prevAnswers => [
      ...prevAnswers,
      { question: questions[currentQuestionIndex].question, answer, isCorrect }
    ]);

    if (isCorrect) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }
   
      setSeconds(0); 

    setTimeout(() => {
      setShowFeedback(false);
      goToNextQuestion(); 
    }, 2000);
  };

  const handleEndGame = () => {
    const hasPassed = correctAnswersCount >= 15;

    if (hasPassed) { 
      alert(`כל הכבוד! עברת את המשחק! ענית על ${correctAnswersCount} שאלות נכונות מתוך ${totalQuestions}.`);
    } else {
      alert(`לצערנו, לא עברת את המשחק. ענית על ${correctAnswersCount} שאלות נכונות מתוך ${totalQuestions}.`);
    }
  };

  return (
    <div className="App">
      <h1>שאלות ותשובות</h1>
      <h4><span style={{color:'#9932CC'}}><IoTimer/></span> {minutes}:{seconds} <span style={{color:'#9932CC'}}><FaRegHourglassHalf/></span></h4>
      {questions.length > 0 && (
        <div>
          <h2>שאלה {currentQuestionIndex + 1} מתוך {totalQuestions}</h2>
           {currentQuestionIndex === totalQuestions - 1 && (
             <Link to="/OffGameScreen" ><button className='bn632-hover bn24'>סיום המשחק </button></Link>
          )}
          <h3>{questions[currentQuestionIndex].question} <span><SiHappycow style={{ color:'#ffcc00' }} /></span></h3>

          <ul>
            {shuffleArray(questions[currentQuestionIndex].answers).map((answer, index) => (
              <li  key={index}>
                <button onClick={() => handleAnswerSelect(answer)} className='bn5' >{answer}</button>
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
