// services/jokeService.js

const baseURL = 'http://localhost:8088/jokes'; 

// * Function to post a new joke
export const postJoke = async (jokeText) => {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: jokeText,
        told: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Error posting joke');
    }

    const data = await response.json(); // * Waits for the response body to be  parsed as JSON, then assigns that to the data variable.
    return data;
  } catch (error) {
    console.error("Failed to post new joke:", error);
    throw error;
  }
};
