// src/components/Timer.js
import React, { useState, useEffect } from 'react';

// Quiz duration is set here (e.g., 10 minutes)
const QUIZ_DURATION_SECONDS = 10 * 60; // 10 minutes 

const Timer = ({ onTimeEnd }) => {
    const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeEnd(); // Automatically submit quiz when timer ends 
            return;
        }

        // Set up the countdown interval
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [timeLeft, onTimeEnd]);

    // Formatting time to MM:SS
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Highlight time if low (e.g., last minute)
    const timerClass = timeLeft < 60 ? 'text-red-600 font-bold' : 'text-gray-800';

    return (
        <div className={`text-xl p-2 rounded border border-gray-300 ${timerClass}`}>
            ⏰ Time Left: {timeDisplay}
        </div>
    );
};

export default Timer;