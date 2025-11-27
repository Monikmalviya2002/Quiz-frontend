import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const QuestionCard = ({ question, index, userAnswer, onSelectOption, showCorrect }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-4">
                {index + 1}. {question.question}
            </h3>
            <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                    const isSelected = userAnswer === optionIndex;
                    let bgClass = 'bg-gray-100 hover:bg-blue-100 text-gray-800';
                    if (showCorrect) {
                        if (optionIndex === question.correctAnswer) bgClass = 'bg-green-100 text-green-800 font-semibold';
                        else if (isSelected && optionIndex !== question.correctAnswer) bgClass = 'bg-red-100 text-red-800 font-semibold';
                    } else if (isSelected) {
                        bgClass = 'bg-blue-500 text-white shadow-lg';
                    }

                    return (
                        <button
                            key={optionIndex}
                            type="button"
                            disabled={!onSelectOption}
                            onClick={() => onSelectOption && onSelectOption(index, optionIndex)}
                            className={`w-full text-left p-3 rounded-lg transition duration-200 ${bgClass}`}
                        >
                            <span className="mr-2">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                            {showCorrect && optionIndex === question.correctAnswer && (
                                <CheckCircleIcon className="w-5 h-5 inline ml-2 text-green-600" />
                            )}
                            {showCorrect && isSelected && optionIndex !== question.correctAnswer && (
                                <XCircleIcon className="w-5 h-5 inline ml-2 text-red-600" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionCard;
