# Chuckle Checklist

Welcome to the **Chuckle Checklist**, a React-based application designed to lighten your day with a curated collection of jokes. This project leverages a modular architecture with its data stored in a separate Git repository, enabling streamlined updates and management.

## About the Project

The Chuckle Checklist utilizes modern web development practices to deliver a responsive and interactive user experience. The application is structured around key React components and utilizes CSS for styling, ensuring a visually appealing presentation across devices.

## Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
- [Database Repository](#database-repository)
- [Contributing](#contributing)

## Features

- Curated list of jokes and humorous content
- Responsive design for an optimal viewing experience on all devices
- Separate database repository for easy content updates

## Getting Started

To explore or contribute to the Chuckle Checklist project, clone this repository to your local environment. The project relies on standard React development practices for setup and dependencies management.

### Prerequisites

- Node.js and npm (Node Package Manager)
- A modern web browser

### Installation

1. Clone the repository and navigate to the project directory.
2. Install dependencies.

### Running the Application

- Use the appropriate command to start the development server.
- Access the application through your web browser at the designated localhost port.

## Usage

- Use the `JokeForm` component to add new jokes by filling in the joke text and clicking "Add Joke". The joke will be sent to the server and added to the appropriate list (untold or told) based on its initial status.
- You can view, edit, mark as untold/told, or delete jokes from the lists by interacting with their corresponding buttons. Changes are immediately synced with the server.

## Database Repository

The content for the Chuckle Checklist is managed through a dedicated `database.json` file located in a separate repository. This approach allows for the decoupling of data management from application logic, facilitating ease of updates and scalability.

**Database Repository Link**: [Chuckle API Repository](https://github.com/soyuz43/chuckle-API.git)

Visit the database repository for more details on the structure and how to contribute to the content database.

## Contributing

Contributions to both the application and its database are welcome. For any contributions, please fork the respective repository, commit your changes, and submit a pull request for review.


---

**Version: 1.0.0**

**Date: 2024-04-12**
