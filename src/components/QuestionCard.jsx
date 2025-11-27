import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const QuestionCard = ({ question, index, userAnswer, onSelectOption, showCorrect }) => {

  
           const handleOptionClick = (optionIndex) => {
              if (onSelectOption) {
              onSelectOption(index, optionIndex);
                }
                 };

             return (
          <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-200 hover:shadow-lg 
            transition duration-300">
              <h3 className="text-xl font-semibold mb-4">
              {index + 1}. {question.question}
               </h3>

      <div className="space-y-3">
         {question.options.map((option, optionIndex) => {
          
        let buttonStyle = 'bg-gray-100 hover:bg-blue-100 text-gray-800';

         
          if (!showCorrect && userAnswer === optionIndex) {
            buttonStyle = 'bg-blue-500 text-white shadow-md';
          }

         
       if (showCorrect) {
        if (optionIndex === question.correctAnswer) {
               buttonStyle = 'bg-green-100 text-green-800 font-semibold';
        } else if (userAnswer === optionIndex && optionIndex !== question.correctAnswer) {
             buttonStyle = 'bg-red-100 text-red-800 font-semibold';
            }
          }

          return (
            <button
             key={optionIndex}
                type="button"
        onClick={() => handleOptionClick(optionIndex)}
                disabled={!onSelectOption}
              className={`w-full text-left p-3 rounded-lg ${buttonStyle} transition duration-200`}
            >
            <span className="mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
              {option}

             {showCorrect && optionIndex === question.correctAnswer && (
                <CheckCircleIcon className="w-5 h-5 inline ml-2 text-green-600" />
              )}

            {showCorrect && userAnswer === optionIndex && optionIndex !== question.correctAnswer && (
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
