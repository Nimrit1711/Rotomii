class TagManager {
  constructor() {
    this.userTags = [];
    this.init();
  }

  async init() {
    await this.loadUserTags();
    this.setupEventListeners();
  }

  async loadUserTags() {
    try {
      const response = await fetch('/api/tags');
      if (response.ok) {
        this.userTags = await response.json();
        this.renderTagSuggestions();
      }
    } catch (error) {
      console.error('Failed to load user tags:', error);
    }
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.tag-btn')) {
        this.handleTagClick(e.target);
      }
      if (e.target.matches('.remove-tag-btn')) {
        this.handleRemoveTag(e.target);
      }
    });

    document.addEventListener('submit', (e) => {
      if (e.target.matches('.add-tag-form')) {
        this.handleAddTag(e);
      }
    });
  }

  async addTagToPokemon(pokemonId, tagName) {
    try {
      const response = await fetch(`/api/pokemon/${pokemonId}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tagName })
      });

      if (response.ok) {
        await this.loadUserTags();
        await this.loadPokemonTags(pokemonId);
        this.showMessage('Tag added successfully!', 'success');
      } else {
        const data = await response.json();
        this.showMessage(data.error || 'Failed to add tag', 'error');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      this.showMessage('Failed to add tag. Log in!', 'error');
    }
  }

  async removeTagFromPokemon(pokemonId, tagName) {
    try {
      const response = await fetch(`/api/pokemon/${pokemonId}/tags`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tagName })
      });

      if (response.ok) {
        await this.loadPokemonTags(pokemonId);
        this.showMessage('Tag removed successfully!', 'success');
      } else {
        const data = await response.json();
        this.showMessage(data.error || 'Failed to remove tag', 'error');
      }
    } catch (error) {
      console.error('Error removing tag:', error);
      this.showMessage('Failed to remove tag', 'error');
    }
  }

  async loadPokemonTags(pokemonId) {
    try {
      const response = await fetch(`/api/pokemon/${pokemonId}/tags`);
      if (response.ok) {
        const tags = await response.json();
        this.renderPokemonTags(pokemonId, tags);
      }
    } catch (error) {
      console.error('Failed to load Pokemon tags:', error);
    }
  }

  async searchPokemonByTags(tags) {
    try {
      const tagParams = tags.join(',');
      const response = await fetch(`/api/pokemon/search?tags=${encodeURIComponent(tagParams)}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to search by tags:', error);
    }
    return [];
  }

  renderPokemonTags(pokemonId, tags) {
    const container = document.querySelector(`[data-pokemon-id="${pokemonId}"] .pokemon-tags`);
    if (!container) return;

    container.innerHTML = '';

    if (tags.length === 0) {
      container.innerHTML = '<span class="no-tags">No tags</span>';
      return;
    }

    tags.forEach((tag) => {
      const tagElement = document.createElement('span');
      tagElement.className = 'pokemon-tag';
      tagElement.innerHTML = `
        ${tag}
        <button class="remove-tag-btn" data-pokemon-id="${pokemonId}" data-tag="${tag}">×</button>
      `;
      container.appendChild(tagElement);
    });
  }

  renderTagSuggestions() {
    const containers = document.querySelectorAll('.tag-suggestions');
    containers.forEach((container) => {
      container.innerHTML = '';
      this.userTags.forEach((tag) => {
        const button = document.createElement('button');
        button.className = 'tag-suggestion-btn';
        button.textContent = tag.tag_name;
        button.onclick = () => {
          const { pokemonId } = container.closest('[data-pokemon-id]').dataset;
          this.addTagToPokemon(pokemonId, tag.tag_name);
        };
        container.appendChild(button);
      });
    });
  }

  handleAddTag(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector('.tag-input');
    const { pokemonId } = form.closest('[data-pokemon-id]').dataset;
    const tagName = input.value.trim();

    if (tagName) {
      this.addTagToPokemon(pokemonId, tagName);
      input.value = '';
    }
  }

  handleRemoveTag(button) {
    const { pokemonId } = button.dataset;
    const tagName = button.dataset.tag;
    this.removeTagFromPokemon(pokemonId, tagName);
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

  createTagInterface(pokemonId) {
    return `
      <div class="tag-interface" data-pokemon-id="${pokemonId}">
        <div class="pokemon-tags"></div>
        <form class="add-tag-form">
          <input type="text" class="tag-input" placeholder="Add tag..." />
          <button type="submit">Add</button>
        </form>
        <div class="tag-suggestions"></div>
      </div>
    `;
  }
}

window.tagManager = new TagManager();
