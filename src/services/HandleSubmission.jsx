// services/HandleSubmission.jsx
import { postJoke } from "./JokeServices.jsx"; 


export const handleSubmit = async () => {
    if (inputValue.trim()) { 
      try {
        await postJoke(inputValue);
        setInputValue(''); // * Reset input field after submission
        
      } catch (error) {
        
      }
    }
  };