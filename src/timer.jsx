import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60); // 24 hours in seconds
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
  
      return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    };
  
    return (
      <div>
        <h3>Time left to finish this task :  {formatTime(timeRemaining)}</h3>
        
      </div>
    );
  };
  

export default CountdownTimer;
