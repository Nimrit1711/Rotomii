class PokemonSearch {
  constructor() {
    this.searchForm = null;
    this.searchInput = null;
    this.tagSearchInput = null;
    this.resultsContainer = null;
    this.init();
  }

  init() {
    this.setupSearchForm();
    this.setupEventListeners();
  }

  setupSearchForm() {
    this.searchForm = document.querySelector(".search-box");
    this.searchInput = document.querySelector(".search-text");
    this.resultsContainer =
      document.querySelector(".search-results") ||
      this.createResultsContainer();

    if (this.searchForm) {
      this.enhanceSearchForm();
    }
  }

  enhanceSearchForm() {
    const tagSearchDiv = document.createElement("div");
    tagSearchDiv.className = "search-tags";
    tagSearchDiv.innerHTML = `
      <input type="text" class="tag-search-input" placeholder="Search by tags (eg favourite,fire)..." />
    `;

    this.searchForm.parentNode.insertBefore(
      tagSearchDiv,
      this.searchForm.nextSibling,
    );
    this.tagSearchInput = tagSearchDiv.querySelector(".tag-search-input");
  }

  createResultsContainer() {
    const container = document.createElement("div");
    container.className = "search-results";
    document.querySelector(".main-body").appendChild(container);
    return container;
  }

  setupEventListeners() {
    if (this.searchForm) {
      this.searchForm.addEventListener("submit", (e) => this.handleSearch(e));
    }

    if (this.tagSearchInput) {
      this.tagSearchInput.addEventListener("input", (e) =>
        this.handleTagSearch(e),
      );
    }

    if (this.searchInput) {
      const debouncedSearch = this.debounce(
        (e) => this.handleLiveSearch(e),
        300,
      );
      this.searchInput.addEventListener("input", debouncedSearch);
    }
  }

  async handleSearch(event) {
    event.preventDefault();
    const query = this.searchInput.value.trim();
    const tagQuery = this.tagSearchInput
      ? this.tagSearchInput.value.trim()
      : "";

    if (!query && !tagQuery) return;

    this.showLoading();

    try {
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (tagQuery) params.append("tags", tagQuery);

      const response = await fetch(`/api/pokemon/search?${params}`);
      if (response.ok) {
        const results = await response.json();
        await this.displayResults(results);
      } else {
        this.showError("Search failed. Please try again.");
      }
    } catch (error) {
      console.error("Search error:", error);
      this.showError("Search failed. Please try again.");
    }
  }

  async handleTagSearch(event) {
    const tagQuery = event.target.value.trim();
    if (!tagQuery) {
      this.clearResults();
      return;
    }

    this.showLoading();

    try {
      const response = await fetch(
        `/api/pokemon/search?tags=${encodeURIComponent(tagQuery)}`,
      );
      if (response.ok) {
        const results = await response.json();
        await this.displayResults(results);
      }
    } catch (error) {
      console.error("Tag search error:", error);
    }
  }

  async handleLiveSearch(event) {
    const query = event.target.value.trim();
    if (query.length < 2) {
      this.clearResults();
      return;
    }

    try {
      const response = await fetch(
        `/api/pokemon/search?q=${encodeURIComponent(query)}`,
      );
      if (response.ok) {
        const results = await response.json();
        await this.displayResults(results.slice(0, 5));
      }
    } catch (error) {
      console.error("Live search error:", error);
    }
  }

  async displayResults(results) {
    this.clearResults();

    if (results.length === 0) {
      this.resultsContainer.innerHTML = "<p>No Pokemon found.</p>";
      return;
    }

    const resultElements = await Promise.all(
      results.map((pokemon) => this.createPokemonCard(pokemon)),
    );

    resultElements.forEach((element) => {
      this.resultsContainer.appendChild(element);
    });

    if (window.tagManager) {
      window.tagManager.renderTagSuggestions();
      results.forEach((pokemon) => {
        window.tagManager.loadPokemonTags(pokemon.id);
      });
    }
  }

  async createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    card.setAttribute("data-pokemon-id", pokemon.id);

    try {
      const detailResponse = await fetch(`/api/pokemon/${pokemon.id}`);
      const details = await detailResponse.json();

      const types = details.types ? details.types.map((t) => t.type.name) : [];
      const sprite =
        (details.sprites && details.sprites.front_default) ||
        "/images/pokeball-placeholder.png";

      card.innerHTML = `
        <div class="pokemon-header">
          <img src="${sprite}" alt="${pokemon.name}" class="pokemon-sprite" />
          <div class="pokemon-info">
            <h3>${pokemon.name}</h3>
            <div class="pokemon-types">
              ${types.map((type) => `<span class="pokemon-type">${type}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="pokemon-actions">
          ${window.teamManager ? window.teamManager.createAddToTeamButton(pokemon.id, pokemon.name) : ""}
        </div>
        ${window.tagManager ? window.tagManager.createTagInterface(pokemon.id) : ""}
      `;
    } catch (error) {
      console.error("Error loading Pokemon details:", error);
      card.innerHTML = `
        <div class="pokemon-header">
          <div class="pokemon-info">
            <h3>${pokemon.name}</h3>
          </div>
        </div>
        <div class="pokemon-actions">
          ${window.teamManager ? window.teamManager.createAddToTeamButton(pokemon.id, pokemon.name) : ""}
        </div>
        ${window.tagManager ? window.tagManager.createTagInterface(pokemon.id) : ""}
      `;
    }

    return card;
  }

  showLoading() {
    this.resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
  }

  showError(message) {
    this.resultsContainer.innerHTML = `<div class="error">${message}</div>`;
  }

  clearResults() {
    this.resultsContainer.innerHTML = "";
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PokemonSearch();
});
