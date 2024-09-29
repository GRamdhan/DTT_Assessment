import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      houses: [], // Lijst van huizen
      searchTerm: '', // Zoekterm voor huizen
      searchCategory: 'city', // Huidige zoekcategorie
      currentUser: null, // Huidige gebruiker
    };
  },
  getters: {
    houses(state) {
      return state.houses; // Geeft de lijst van huizen terug
    },
    filteredHouses(state) {
      const term = state.searchTerm.toLowerCase(); // Zoekterm in kleine letters
      const category = state.searchCategory; // Huidige zoekcategorie

      if (!term) return state.houses; // Geen zoekterm, geef alle huizen terug

      return state.houses.filter((house) => {
        let value = '';

        // Bepaal welke waarde te filteren op basis van de categorie
        if (category === 'city') {
          value = house.location?.city || ''; // Stad
        } else if (category === 'description') {
          value = house.description || ''; // Beschrijving
        } else if (category === 'price') {
          value = house.price?.toString() || ''; // Prijs
        } else if (category === 'size') {
          value = house.size?.toString() || ''; // Grootte
        }

        return value.toLowerCase().includes(term); // Controleer of de waarde de zoekterm bevat
      });
    },
    getHouseById: (state) => (id) => {
      return state.houses.find((house) => house.id === id); // Zoek huis op ID
    },
    isOwner: (state) => (house) => {
      return state.currentUser && house.addedBy === state.currentUser.id; // Controleer of de huidige gebruiker de eigenaar is
    },
  },
  mutations: {
    setHouses(state, houses) {
      state.houses = houses; // Zet de lijst van huizen
    },
    addHouse(state, house) {
      const index = state.houses.findIndex((h) => h.id === house.id); // Zoek index van huis
      if (index !== -1) {
        state.houses.splice(index, 1, house); // Update bestaand huis
      } else {
        state.houses.push(house); // Voeg nieuw huis toe
      }
    },
    removeHouse(state, houseId) {
      state.houses = state.houses.filter((house) => house.id !== houseId); // Verwijder huis op ID
    },
    setSearchTerm(state, term) {
      state.searchTerm = term; // Zet de zoekterm
    },
    setSearchCategory(state, category) {
      state.searchCategory = category; // Zet de zoekcategorie
    },
    setCurrentUser(state, user) {
      state.currentUser = user; // Zet de huidige gebruiker
    },
  },
  actions: {
    async fetchHouses({ commit }) {
      try {
        const response = await fetch('https://api.intern.d-tt.nl/api/houses', {
          headers: {
            'X-Api-Key': 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK', // API-sleutel voor authenticatie
          },
        });
        const data = await response.json();

        if (response.ok) {
          commit('setHouses', data); // Zet de huizen als de fetch succesvol is
        } else {
          console.error('Error fetching houses:', data); // Log foutmelding bij mislukte fetch
        }
      } catch (error) {
        console.error('Error fetching houses:', error); // Log fout bij netwerkproblemen
      }
    },

    async createHouse({ commit }, newHouse) {
      try {
        const formData = new FormData();
        Object.keys(newHouse).forEach((key) => formData.append(key, newHouse[key])); // Voeg alle velden toe aan formData

        const response = await fetch('https://api.intern.d-tt.nl/api/houses', {
          method: 'POST', // POST-aanroep om een nieuw huis aan te maken
          headers: {
            'X-Api-Key': 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK', // API-sleutel
          },
          body: formData, // Stuur de formData als body
        });

        if (response.ok) {
          const house = await response.json();
          commit('addHouse', house); // Voeg het nieuwe huis toe
          return house; // Geef het huis terug
        } else {
          const errorData = await response.json();
          console.error('Error creating house:', errorData); // Log foutmelding bij aanmaken huis
        }
      } catch (error) {
        console.error('Error creating house:', error); // Log fout bij netwerkproblemen
      }
    },

    async fetchHouseById({ commit, getters }, id) {
      const cachedHouse = getters.getHouseById(id); // Kijk of het huis al in de cache staat
      if (cachedHouse) {
        return cachedHouse; // Geef cached huis terug
      }
      try {
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
          headers: {
            'X-Api-Key': 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK', // API-sleutel
          },
        });
        const data = await response.json();

        if (response.ok) {
          commit('addHouse', data); // Voeg het huis toe aan de state
          return data; // Geef het huis terug
        } else {
          console.error('Error fetching house:', data); // Log foutmelding bij fetch
        }
      } catch (error) {
        console.error('Error fetching house:', error); // Log fout bij netwerkproblemen
      }
    },

    async updateHouse({ commit }, house) {
      try {
        const formData = new FormData();
        Object.keys(house).forEach((key) => {
          formData.append(key, house[key]); // Voeg alle velden toe aan formData
        });

        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${house.id}`, {
          method: 'POST', // Gebruik POST hier voor update
          headers: {
            'X-Api-Key': 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK', // API-sleutel
          },
          body: formData, // Stuur de formData als body
        });

        if (response.ok) {
          const updatedHouse = await response.json();
          commit('addHouse', updatedHouse); // Update het huis in de state
          return updatedHouse; // Geef het bijgewerkte huis terug
        } else {
          const errorData = await response.json();
          console.error('Error updating house:', errorData); // Log foutmelding bij update
        }
      } catch (error) {
        console.error('Error updating house:', error); // Log fout bij netwerkproblemen
      }
    },

    async deleteHouse({ commit }, houseId) {
      try {
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
          method: 'DELETE', // DELETE-aanroep om een huis te verwijderen
          headers: {
            'X-Api-Key': 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK', // API-sleutel
          },
        });

        if (response.ok) {
          commit('removeHouse', houseId); // Verwijder het huis uit de state
        } else {
          const errorData = await response.json();
          console.error('Error deleting house:', errorData); // Log foutmelding bij verwijderen
        }
      } catch (error) {
        console.error('Error deleting house:', error); // Log fout bij netwerkproblemen
      }
    },
  },
});

export default store; // Exporteer de store
