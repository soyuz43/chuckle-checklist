// services/jokeService.js

const baseURL = 'http://localhost:8088/jokes'; 

// # Function to fetch jokes from the database
export const fetchJokes = async () => {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error('Failed to fetch jokes');
    }
    const data = await response.json();
    return data; // Return the fetched jokes
  } catch (error) {
    console.error("Error fetching jokes:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};

// # Function to post a new joke
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

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Failed to post new joke:", error);
    throw error; 
  }
};
// # Function to delete a joke from the database
export const deleteJoke = async (jokeId) => {
  try {
    const response = await fetch(`${baseURL}/${jokeId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete joke');
    }

    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error("Error deleting joke:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
// # Function to modify the told status of a joke 
export const toggleToldStatus = async (joke) => {
  try {
    const updatedJoke = { ...joke, told: !joke.told };
    console.log(`Sending PUT request to update joke ${joke.id}`);

    const response = await fetch(`http://localhost:8088/jokes/${joke.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJoke)
    });

    if (!response.ok) {
      throw new Error('Failed to update joke status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating joke status:", error);
    throw error;
  }
};
