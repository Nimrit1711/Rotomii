# Rotomii: A Pokémon Team-Builder

Rotomii is a Pokémon team-builder app that allows users to create and save teams, and evaluate the overall utility and balance of their teams. The app integrates an external API (PokéAPI) with a custom-built relational database to provide an enhanced team-building experience.

## Team Members

- Alex Hart (a1839644) - Backend stuff, authentication, database design
- Nimrit Gill (a1925677) - Frontend design, making it look good and responsive
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
- User registration and login with hashed and salted passwords
- Session management using secure cookies
- Create and manage teams of up to 6 pokémon, from any pokémon in existence
- Make notes on those teams
- Nickname your favourite pokémon
- Search for pokémon by name and type

### Type Effectiveness Analysis
View detailed type matchups:
- Weaknesses
- Resistances
- Immunities
- View team wide matchup summary of your teams

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
