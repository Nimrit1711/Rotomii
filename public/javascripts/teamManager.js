class TeamManager {
  constructor() {
    this.userTeams = [];
    this.init();
  }

  async init() {
    await this.loadUserTeams();
    this.setupEventListeners();
  }

  async loadUserTeams() {
    try {
      const response = await fetch('/teams/api/list');
      if (response.ok) {
        this.userTeams = await response.json();
      }
    } catch (error) {
      console.error('Failed to load user teams:', error);
    }
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.add-to-team-btn')) {
        this.handleAddToTeamClick(e.target);
      }
      const teamOption = e.target.closest('.team-selection-option');
        if (teamOption) {
          this.handleTeamSelection(teamOption);
        }
      if (e.target.matches('.close-team-modal')) {
        this.closeTeamModal();
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('.team-modal-overlay')) {
        this.closeTeamModal();
      }
    });
  }

  handleAddToTeamClick(button) {
    const { pokemonId } = button.dataset;
    const { pokemonName } = button.dataset;
    this.showTeamSelectionModal(pokemonId, pokemonName);
  }

  showTeamSelectionModal(pokemonId, pokemonName) {
    const modal = this.createTeamSelectionModal(pokemonId, pokemonName);
    document.body.appendChild(modal);
  }

  createTeamSelectionModal(pokemonId, pokemonName) {
    const modal = document.createElement('div');
    modal.className = 'team-modal-overlay';
    modal.innerHTML = `
      <div class="team-modal">
        <div class="team-modal-header">
          <h3>Add ${pokemonName} to Team</h3>
          <button tabindex="${pokemonId}+20" class="close-team-modal">×</button>
        </div>
        <div class="team-modal-body">
          ${this.userTeams.length === 0
            ? '<p>No teams available. Create a team first!</p>'
            : `<div class="team-list">
              ${this.userTeams.map((team) => `
                <div class="team-selection-option"
                     data-team-id="${team.team_id}"
                     data-pokemon-id="${pokemonId}"
                     data-pokemon-name="${pokemonName}">
                  <span class="team-name">${team.team_name}</span>
                  <span class="team-notes">${team.notes || ''}</span>
                </div>
              `).join('')}
            </div>`
          }
          <div class="nickname-section">
            <label for="pokemon-nickname">Nickname (optional):</label>
            <input type="text" id="pokemon-nickname" placeholder="Enter nickname..." />
          </div>
        </div>
      </div>
    `;
    return modal;
  }

  async handleTeamSelection(teamOption) {
    const { teamId } = teamOption.dataset;
    const { pokemonId } = teamOption.dataset;
    const { pokemonName } = teamOption.dataset;
    const nicknameInput = document.querySelector('#pokemon-nickname');
    const nickname = nicknameInput ? nicknameInput.value.trim() : '';

    try {
      const response = await fetch(`/api/teams/${teamId}/add-pokemon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pokemonId: parseInt(pokemonId, 10),
          nickname
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.showMessage(`${pokemonName} added to team successfully!`, 'success');
        this.closeTeamModal();
      } else {
        const errorData = await response.json();
        this.showMessage(errorData.error || 'Failed to add Pokemon to team', 'error');
      }
    } catch (error) {
      console.error('Error adding Pokemon to team:', error);
      this.showMessage('Failed to add Pokemon to team', 'error');
    }
  }

  closeTeamModal() {
    const modal = document.querySelector('.team-modal-overlay');
    if (modal) {
      modal.remove();
    }
  }

  showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 4px;
      color: white;
      background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
      z-index: 1000;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  createAddToTeamButton(pokemonId, pokemonName) {
    return `
      <button class="add-to-team-btn"
              data-pokemon-id="${pokemonId}"
              data-pokemon-name="${pokemonName}">
        Add to Team
      </button>
    `;
  }
}

window.teamManager = new TeamManager();
