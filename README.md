# Rotomii: A Pokémon Team-Builder

Rotomii is a Pokémon team-builder app that allows users to create and save teams, and evaluate the overall utility and balance of their teams. The app integrates an external API (PokéAPI) with a custom-built relational database to provide an enhanced team-building experience.

## Team Members

- Alex Hart (a1839644) - Backend, authentication, database design
- Nimrit Gill (a1925677) - Frontend/backend design, responsive layout, and user experience
- Kristian Sorono (a1809029) - API integration, search functionality
- Madeleine Harris (a1850837) - Pokémon logic, team analysis, type effectiveness

## Technologies Used

We used HTML, CSS, JavaScript and EJS for the frontend. Backend is Node.js with Express and SQLite3 for the database. For authentication we used Passport.js with express-session. Also used ESLint to keep our code clean.

## Setup Instructions

First, clone the git repo.
Then, in terminal:
```bash
npm install
npm start
```
And finally, open localhost:3000. If that doesn't work, try localhost:8080.

The SQLite database gets created automatically when you first run it.

## List of Features

### Core Functionality
User Accounts & Security
- Register and log in securely with hashed and salted passwords.
- Manage persistent sessions using cookies and express-session.
- Input validation and sanitisation on both frontend and backend for safe data handling.

Team Management
- Create, name, and save multiple Pokémon teams (up to 6 Pokémon per team).
- Add nicknames and personal notes for each Pokémon to personalise your team.
- Edit or delete teams easily through a clean, responsive interface

Search and Selection
- Search for Pokémon by name, type, or generation using the PokéAPI.
- View Pokémon details such as base stats, abilities, and type combinations.
- Add Pokémon directly from search results into a selected team.

Type Effectiveness & Team Balance
- Automatically analyse your team’s strengths and weaknesses.
- View type matchups (weaknesses, resistances, immunities) per Pokémon.
- Get a team-wide summary chart to visualise overall balance.
  
Additional Features
- Fully responsive design across desktop, tablet, and mobile.
- Optional Dark/Light mode toggle to personalise the theme.
- Customisable tagging system to organise Pokémon (e.g., “Tank”, “Speedster”).
- Built-in error handling ensures the app remains stable even when API requests fail.


### Data & Integration
- Seamless integration with PokéAPI to retrieve real-time pokemon data
- Persistent storage of user-created teams in a custom SQLite database
- Proper database relationships between users, teams, and pokémon

### User Experience
- Responsive layout for desktop, tablet and mobile devices
- Fully responsive navigation bar with dynamic content
- Dark/Light mode toggle (our optional feature)
- Intuitive search bar with filtering to help users find Pokemon quickly
- Error handling so the app doesn't crash when things go wrong

### Security Features
We implemented proper security including:
- Input validation on both client and server side
- Protection against SQL injection using parameterised queries
- XSS protection through input sanitisation
- Admin functionality with role-based access
- Secure session configuration

## Database Schema

The main tables we created:
- **Users** - stores user accounts, passwords, preferences
- **Teams** - team info like names and notes
- **Team_Pokemon** - links teams to specific pokémon with nicknames
- **Tags** - user-created tags for organising pokémon
- **Pokemon_Tags** - connects pokémon to tags (many-to-many relationship)

Each user can have multiple teams, each team can have up to 6 pokémon, and users can tag pokémon however they want.

## Known Bugs

- The first search after a refresh may be inaccurate. Press enter again and the problem should resolve.
- The keyboard navigation for the 'add to team' pop up on the search page malfunctions, and requires the user to tab through each pokémon searched.
