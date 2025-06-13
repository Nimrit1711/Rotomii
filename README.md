# Rotomii: A Pokémon Team-Builder
Rotomii is a Pokémon team-builder app that allows users to create and save teams, and evaluate the overall utility and balance of their teams.
The app integrates an external API (PokeAPI) with a custome-built relational database to provide an enhanced team-building experience 

## Setup Instructions
First, clone the attached git repo.
Then, in terminal:
```bash
npm install
npm start
```
And finally, open localhost:3000. If that doesn't work, try localhost:8080.

## List of features
Core Functionality 
- User registration and login with hashed and salted passwords
- Session management using secure cookies
- Create and manage teams of up to 6 pokémon, from any pokémon in existance
- Make notes on those teams
- Nickname your favourite pokémon
View detailed type matchups:
- Weaknesses
- Resistances
- Immunities
- View team wide matchup summary of your teams
- create an account to save your data
- login from anywhere to view and edit your teams

Data & Integration
- seamless integration with PokeApi to retrieve real-time pokemon data
- Persistent storage of user-created teams on a custome MySQL database

User Experience 
- Responsive layout for desktop, tablet and mobile devices
- fully responsive naigation bar with dynamic content
- Dark/Light mode toggle
- intutive search bar with tag-based filtering to help users find Pokemon quickly

## Scalability and Maintainbility 
Modular code structure:
- separate routes, controllers and models
- reusable EJs components
- Restful API design for ser-side routes
- Easily extensible artchitecture to add new feautres like team sharing 
 
## Known bugs
- the first search after a refresh may be inaccurate. Press enter again and the problem should resolve.
- the keyboard navigation for the 'add to team' pop up on the search page malfunctions, and requires the user to tab through each pokémon searched.
