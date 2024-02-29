import React from 'react'
import axios from 'axios';
import { GiAnt } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { AiFillMediumCircle } from "react-icons/ai";
import { BsFillSunriseFill } from "react-icons/bs";




const StartScreen = () => {
  return (
    <div className="start-screen">
      <h1 >התחלת משחק חד<span><AiFillMediumCircle style={{fontSize:90,color:'#fb5607'}}/></span>ש<span> <GiAnt style={{fontSize:90,color:'#fb5607'}}/></span></h1>
      <Link to='/GameScreen'><button  className='bn5' ><span><BsFillSunriseFill style={{fontSize:60,color:'#252422'}}/></span>התחל משחק</button></Link> 
      <img src='https://teambuilding.com/wp-content/uploads/2022/10/virtual-team-trivia-banner.jpg' />
    </div>
  );
};

export default StartScreen