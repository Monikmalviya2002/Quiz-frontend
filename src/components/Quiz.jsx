import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import axios from 'axios';



const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const res = await axios.get("http://localhost:7777/api/questions");
                console.log("Fetched questions:", res.data);

                
                const questionsArray = Array.isArray(res.data) ? res.data : [];
                setQuestions(questionsArray);
                setUserAnswers(Array(questionsArray.length).fill(null));
            } catch (error) {
                console.error('Failed to fetch questions:', error);
                setQuestions([]); 
                setUserAnswers([]);
            } finally {
                setLoading(false);
            }
        };
        loadQuestions();
    }, []);

    const handleSelectOption = (questionIndex, optionIndex) => {
        setUserAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[questionIndex] = optionIndex;
            return newAnswers;
        });
    };

    const handleSubmitQuiz = useCallback(async () => {
        try {
            const res = await axios.post("http://localhost:7777/api/submit", { answers: userAnswers });
            sessionStorage.setItem('quizResult', JSON.stringify(res.data));
            navigate('/result');
        } catch (error) {
            console.error('Failed to submit quiz:', error);
            alert('Failed to submit quiz. Please try again.');
        }
    }, [userAnswers, navigate]);

    const handleTimeEnd = useCallback(() => {
        alert("Time's up! Submitting the quiz automatically.");
        handleSubmitQuiz();
    }, [handleSubmitQuiz]);

    if (loading) {
        return <div className="text-center p-10 text-xl">Loading Quiz Questions...</div>;
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        return <div className="text-center p-10 text-xl text-red-600">No quiz questions available.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">MERN Stack Skill Assessment Quiz</h1>
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 p-4 border-b">
                <p className="text-lg">Total Questions: {questions.length}</p>
                <Timer onTimeEnd={handleTimeEnd} />
            </div>

            <div>
                {questions.map((q, index) => (
                    <QuestionCard
                        key={q._id}
                        question={q}
                        index={index}
                        userAnswer={userAnswers[index]}
                        onSelectOption={handleSelectOption}
                    />
                ))}

                <div className="text-center mt-8">
                    <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-xl transition duration-300"
                    >
                        Submit Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
