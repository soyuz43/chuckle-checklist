import "./App.css";
import React, { useState, useEffect } from "react";
import { fetchJokes, postJoke } from "./services/JokeServices.jsx";
import stevePic from "./assets/steve_output.png"

export const TextInputComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("New One Liner");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    const initFetchJokes = async () => {
      try {
        const fetchedJokes = await fetchJokes();
        setAllJokes(fetchedJokes);
        setUntoldJokes(fetchedJokes.filter((joke) => !joke.told));
        setToldJokes(fetchedJokes.filter((joke) => joke.told));
      } catch (error) {
        console.error("Failed to fetch jokes:", error);
      }
    };
    initFetchJokes();
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setPlaceholderText("Cannot be blank input");
      return;
    }

    try {
      const newJoke = await postJoke(inputValue);
      const updatedAllJokes = [...allJokes, newJoke];
      setAllJokes(updatedAllJokes);
      setUntoldJokes(updatedAllJokes.filter((joke) => !joke.told)); // ! New joke defaults to untold
      setInputValue("");
      setPlaceholderText("New One Liner");
    } catch (error) {
      console.error("Failed to post new joke:", error);
    }
  };

  return (
    <>
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      <h2 className="title">Chuckle Checklist</h2>
        <div className="joke-add-form">
          <input
            className="joke-input"
            type="text"
            value={inputValue}
            placeholder={placeholderText}
            onChange={(event) => {
              setInputValue(event.target.value);   // ! Handles if a user enters text and then deletes it
              if (placeholderText !== "New One Liner") {
                setPlaceholderText("New One Liner");
              }
            }}
          />
          <button className="joke-input-submit" onClick={handleSubmit}>
            Submit Joke
          </button>
        </div>
        <div className="joke-lists-container">
          <div className="jokes-column">
            <h3 className="title">Untold Jokes</h3>
            {untoldJokes.map((joke, index) => (
              <p className="untold-count joke-item" key={index}>
                {joke.text}
              </p>
            ))}
          </div>
          <div className="jokes-column">
            <h3 className="title">Told Jokes</h3>
            {toldJokes.map((joke, index) => (
              <p className="told-count joke-item" key={index}>
                {joke.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
