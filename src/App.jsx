import "./App.css";
import React, { useState, useEffect } from 'react';
import { fetchJokes, postJoke } from "./services/JokeServices.jsx";

export const TextInputComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [placeholderText, setPlaceholderText] = useState('New One Liner');
  const [jokes, setJokes] = useState([]); // State for storing jokes

  useEffect(() => {
    // Fetch jokes on component mount
    const initFetchJokes = async () => {
      try {
        const fetchedJokes = await fetchJokes();
        setJokes(fetchedJokes); // Update the jokes state with the fetched jokes
      } catch (error) {
        console.error("Failed to fetch jokes:", error);
      }
    };
    initFetchJokes();
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setPlaceholderText('Cannot be blank input');
      return; 
    }

    try {
      const newJoke = await postJoke(inputValue); // Assuming this returns a joke object
      setJokes(prevJokes => [...prevJokes, newJoke]); // Append the new joke object
      setInputValue(''); // Clear the input field
      setPlaceholderText('New One Liner'); // Reset the placeholder
    } 
    catch (error) {
      console.error("Failed to post new joke:", error);
    }
  };

  return (
    <>
      <div>
        <h2 className="title">Chuckle Checklist</h2>
        <div>
          <input
            className="joke-input"
            type="text"
            value={inputValue}
            placeholder={placeholderText}
            onChange={(event) => {
              setInputValue(event.target.value);
              if (placeholderText !== 'New One Liner') {
                setPlaceholderText('New One Liner');
              }
            }}
          />
          <button onClick={handleSubmit}>Submit Joke</button>
        </div>
        {/* Display jokes below */}
        <div className="main">
          {jokes.map((joke, index) => (
            <p key={index}>{joke.text}</p> // Ensure we're accessing the text property
          ))}
        </div>
      </div>
    </>
  );
};
