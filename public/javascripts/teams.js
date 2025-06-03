// Team management functions

// Create a new team
async function createTeam(teamName, notes = '') {
    try {
        const response = await fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamName,
                notes
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create team');
        }
        
        return data;
    } catch (err) {
        console.error('Error creating team:', err);
        throw err;
    }
}

// Get all teams for the current user
async function getUserTeams() {
    try {
        const response = await fetch('/api/teams');
        
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }
        
        const data = await response.json();
        return data.teams;
    } catch (err) {
        console.error('Error fetching teams:', err);
        throw err;
    }
}

// Get a specific team by ID
async function getTeamById(teamId) {
    try {
        const response = await fetch(`/api/teams/${teamId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch team');
        }
        
        const data = await response.json();
        return data.team;
    } catch (err) {
        console.error('Error fetching team:', err);
        throw err;
    }
}

// Update team information
async function updateTeam(teamId, updates) {
    try {
        const response = await fetch(`/api/teams/${teamId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update team');
        }
        
        return data;
    } catch (err) {
        console.error('Error updating team:', err);
        throw err;
    }
}

// Delete a team
async function deleteTeam(teamId) {
    try {
        const response = await fetch(`/api/teams/${teamId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete team');
        }
        
        return data;
    } catch (err) {
        console.error('Error deleting team:', err);
        throw err;
    }
}

// Add or update a Pokemon in a team
async function addPokemonToTeam(teamId, position, pokemonId, nickname = '', notes = '') {
    try {
        const response = await fetch(`/api/teams/${teamId}/pokemon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                position,
                pokemonId,
                nickname,
                notes
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to add Pokemon to team');
        }
        
        return data;
    } catch (err) {
        console.error('Error adding Pokemon to team:', err);
        throw err;
    }
}

// Remove a Pokemon from a team
async function removePokemonFromTeam(teamId, position) {
    try {
        const response = await fetch(`/api/teams/${teamId}/pokemon/${position}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to remove Pokemon from team');
        }
        
        return data;
    } catch (err) {
        console.error('Error removing Pokemon from team:', err);
        throw err;
    }
}

// Get the count of Pokemon in a team
async function getTeamPokemonCount(teamId) {
    try {
        const response = await fetch(`/api/teams/${teamId}/count`);
        
        if (!response.ok) {
            throw new Error('Failed to get Pokemon count');
        }
        
        const data = await response.json();
        return data.count;
    } catch (err) {
        console.error('Error getting Pokemon count:', err);
        throw err;
    }
}

// Utility function to format Pokemon sprite URL
function getPokemonSpriteUrl(pokemonId) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createTeam,
        getUserTeams,
        getTeamById,
        updateTeam,
        deleteTeam,
        addPokemonToTeam,
        removePokemonFromTeam,
        getTeamPokemonCount,
        getPokemonSpriteUrl
    };
}
