import "./App.css"
import React, { useState } from 'react';
import { handleSubmit } from "./services/HandleSubmission";




export const TextInputComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [placeholderText, setPlaceholderText] = useState('New One Liner');

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      // If input is empty, update placeholder and prevent further execution
      setPlaceholderText('Cannot be blank input');
      return; // Prevents the submission logic from executing
    }

    try {
      await postJoke(inputValue);
      setInputValue(''); // Reset input field after successful submission
      setPlaceholderText('New One Liner'); // Reset placeholder text
      // Optionally: Trigger any UI updates or notifications here
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Failed to post new joke:", error);
    }
  };

  return (
    <>
      <input
        className="joke-input"
        type="text"
        value={inputValue}
        placeholder={placeholderText}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (placeholderText !== 'New One Liner') {
            // Reset placeholder text when the user starts typing
            setPlaceholderText('New One Liner');
          }
        }}
      />
      <button onClick={handleSubmit}>Submit Joke</button>
    </>
  );
};