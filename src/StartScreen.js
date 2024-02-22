import React from 'react'
import axios from 'axios';
import { GiAnt } from "react-icons/gi";
import { AiFillMediumCircle } from "react-icons/ai";
import { BsFillSunriseFill } from "react-icons/bs";




const StartScreen = ({ onStartGame }) => {
  return (
    <div className="start-screen">
      <h1>התחלת משחק חד<span><AiFillMediumCircle style={{fontSize:90,color:'#fb5607'}}/></span>ש<span> <GiAnt style={{fontSize:90,color:'#fb5607'}}/></span></h1>
      <button onClick={onStartGame} className='btn btn-warning' ><span><BsFillSunriseFill style={{fontSize:60,color:'#252422'}}/></span>התחל משחק</button>
      <img src='https://teambuilding.com/wp-content/uploads/2022/10/virtual-team-trivia-banner.jpg' />
    </div>
  );
};

export default StartScreen