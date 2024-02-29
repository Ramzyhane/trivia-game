import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillSunriseFill } from "react-icons/bs";

const OffGameScreen = (handleEndGame) => {

  const totalQuestions = 20;

  return (
    <div>
      <h5>
        <p style={{padding:34}}>
          The totalQuestions is :  {totalQuestions}<br/>
          The AnswerTrue is: <br/>
          The AnswerFalse is: 
        </p> 
      </h5>
      <Link to='/GameScreen'><button  className='btn' ><span></span>Start New Game</button></Link> 

    </div>
  );
};

export default OffGameScreen;
