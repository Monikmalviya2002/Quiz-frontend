// src/api/quizApi.js

// 🚨 CHANGE THIS LINE: Update the port to 7777
const API_BASE_URL = 'http://localhost:7777/api';

/**
 * Fetches all question data from the backend.
 */
export const fetchQuestions = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/questions`);
        if (!response.ok) {
            // Check for specific HTTP errors
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        // Return a default empty array on failure
        return []; 
    }
};