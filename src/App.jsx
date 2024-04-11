import "./App.css";
import React, { useState, useEffect } from "react";
import { fetchJokes, postJoke, deleteJoke } from "./services/JokeServices.jsx";
import stevePic from "./assets/steve_output.png"

export const TextInputComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("New One Liner");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    fetchAllJokes();
  }, []);

  const fetchAllJokes = async () => {  
      const fetchedJokes = await fetchJokes();
      setAllJokes(fetchedJokes);
      setUntoldJokes(fetchedJokes.filter((joke) => !joke.told));
      setToldJokes(fetchedJokes.filter((joke) => joke.told));
    
  };

  const handleDelete = async (jokeId) => {  // ! jokeId is the key in the <p> tags!!
      await deleteJoke(jokeId);
      fetchAllJokes(); // * Refetch jokes & update the ui after deletion
    
  };

  // ! HandleSubmit
  const handleSubmit = async () => {
    if (!inputValue.trim()) {                             // * Check if the input value is empty or just whitespace
      setPlaceholderText("Cannot be blank input");        // * If input is empty, set placeholder text to indicate that
      return;                                             // * Return to prevent extecution
    }

    try {
      const newJoke = await postJoke(inputValue);
      const updatedAllJokes = [...allJokes, newJoke];
      setAllJokes(updatedAllJokes);                                 // * Update the state with the new array of all jokes
      setUntoldJokes(updatedAllJokes.filter((joke) => !joke.told)); // #  Updates the UI with the new submission ('told' property=false when submitted)
      setInputValue("");                                            // * reset the input value to indicate submission
      setPlaceholderText("New One Liner");
    } catch (error) {
      console.error("Failed to post new joke:", error);            //  Catch & log errors if one arises
    }
  };

  return (
    <>
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h2>Chuckle Checklist</h2>
        <div className="joke-add-form">
          <input
            className="joke-input"
            type="text"
            value={inputValue}
            placeholder={placeholderText}
            onChange={(event) => {
              setInputValue(event.target.value);   // ! Handles text input changes that are not submitted
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
          <div className="joke-list-container">
            <h2>Untold Jokes <span className="untold-count">({untoldJokes.length})</span></h2>
            <ul>
              {untoldJokes.map((joke, index) => (
                <li key={index} className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p> 
                  <div> 
                    <button className="joke-list-action-delete" onClick={() => handleDelete(joke.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
        </div>
        <div className="joke-list-container">
          <h2>Told Jokes <span className="told-count">({toldJokes.length})</span></h2>
          <ul>
            {toldJokes.map((joke, index) => (
              <li key={index} className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p> 
                <div> 
                  <button className="joke-list-action-delete" onClick={() => handleDelete(joke.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </>
);
}
