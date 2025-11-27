import React, { useState, useEffect } from 'react';

const QUIZ_DURATION_SECONDS = 10 * 60; 

const Timer = ({ onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);

  
     useEffect(() => {
          if (timeLeft <= 0) {
        onTimeEnd();
      return;
    }

          const timer = setInterval(() => {
           setTimeLeft(prev => prev - 1);
    }, 1000);

         return () => clearInterval(timer);
  }, [timeLeft, onTimeEnd]);

 
       const minutes = Math.floor(timeLeft / 60);
              const seconds = timeLeft % 60;
          const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  
       const timerStyle = timeLeft < 60 ? 'text-red-600 font-bold' : 'text-gray-800';

       return (
    <div className={`text-xl p-2 rounded border border-gray-300 ${timerStyle}`}>
      ⏰ Time Left: {displayTime}
    </div>
  );
};

export default Timer;
