<template>
  <div class="home-page">
    <!-- Zoekbalk -->
    <div class="search-bar">
      <input 
        type="text" 
        v-model="localSearchTerm" 
        placeholder="Search..." 
        class="search-input"
      />
      <button @click="search" class="search-button">
        <img src="../assets/images/ic_search@3x.png" alt="Search Icon" />
      </button>
      <button @click="clearSearch" class="clear-button">
        <img src="../assets/images/ic_clear_white@3x.png" alt="Clear Icon" />
      </button>
      <select v-model="localSearchCategory" class="search-category">
        <option value="city">City</option>
        <option value="description">Description</option>
        <option value="price">Price</option>
        <option value="size">Size</option>
      </select>
    </div>

    <!-- Huiskaarten -->
    <div v-if="filteredHouses.length" class="house-list">
      <div v-for="house in filteredHouses" :key="house.id" class="house-card">
        <img :src="house.image || '../assets/images/img_placeholder_house@3x.png'" alt="House Image" class="house-card-image" />
        <div class="house-card-info">
          <h2>{{ house.location?.city || 'Onbekend' }}</h2>
          <p class="price">
            <img src="../assets/images/ic_price@3x.png" alt="Price Icon" /> 
            €{{ house.price ? house.price.toLocaleString() : '0' }}
          </p>
          <p class="size">
            <img src="../assets/images/ic_size@3x.png" alt="Size Icon" /> 
            {{ house.size || 0 }} m²
          </p>
          <p class="beds">
            <img src="../assets/images/ic_bed@3x.png" alt="Bedrooms Icon" /> 
            {{ house.rooms?.bedrooms || 0 }} Beds
          </p>
          <p class="baths">
            <img src="../assets/images/ic_bath@3x.png" alt="Bathrooms Icon" /> 
            {{ house.rooms?.bathrooms || 0 }} Baths
          </p>
          <p class="created-at">
            Created At: {{ house.createdAt ? new Date(house.createdAt).toLocaleDateString() : 'Onbekend' }}
          </p>
          <p class="construction-year">
            <img src="../assets/images/ic_construction_date@3x.png" alt="Construction Year Icon" /> 
            Construction Year: {{ house.constructionYear || 'Onbekend' }}
          </p>
          <p class="garage">
            <img src="../assets/images/ic_garage@3x.png" alt="Garage Icon" /> 
            {{ house.hasGarage ? 'Yes' : 'No' }}
          </p>
          <p class="made-by-me">
            Made by me: {{ house.madeByMe ? 'Yes' : 'No' }}
          </p>
          <router-link :to="{ name: 'HousePage', params: { id: house.id } }">
            <button class="view-details-button">View Details</button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <img src="../assets/images/img_empty_houses@3x.png" alt="No Houses Image" class="empty-image" />
      <p>No houses found.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      localSearchTerm: '',
      localSearchCategory: 'city'
    };
  },
  computed: {
    ...mapGetters(['filteredHouses']),
  },
  methods: {
    ...mapMutations(['setSearchTerm', 'setSearchCategory']),
    search() {
      this.setSearchTerm(this.localSearchTerm);
      this.setSearchCategory(this.localSearchCategory);
    },
    clearSearch() {
      this.localSearchTerm = '';
      this.localSearchCategory = 'city';
      this.setSearchTerm('');
      this.setSearchCategory('city');
    }
  },
  async created() {
    try {
      await this.$store.dispatch('fetchHouses');
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: url('../assets/images/img_background@3x.png') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 10px;
  flex: 1;
}

.search-button, .clear-button {
  border: none;
  background: none;
  cursor: pointer;
  margin-left: 10px;
}

.search-button img, .clear-button img {
  width: 24px;
  height: 24px;
}

.search-category {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 10px;
  background: #ffffff;
}

.clear-button {
  background-color: #ff4c4c;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-button img {
  width: 20px;
  height: 20px;
}

.clear-button:hover {
  background-color: #ff1a1a;
}

.house-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.house-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.house-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.house-card-info {
  padding: 10px;
}

.price, .size, .beds, .baths, .created-at, .construction-year, .garage, .made-by-me {
  font-size: 16px;
  color: #333;
  margin: 5px 0;
}

.price img, .size img, .beds img, .baths img, .created-at img, .construction-year img, .garage img, .made-by-me img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
}

.view-details-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.view-details-button:hover {
  background-color: #0056b3;
}

.empty-image {
  width: 100%;
  max-width: 400px;
  height: auto;
}
</style>
