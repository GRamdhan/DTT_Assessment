<template>
  <div class="edit-house">
    <div class="form-container" v-if="house">
      <h2>Edit House</h2>
      <form @submit.prevent="updateHouse">
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="file" id="image" @change="handleFileUpload" />
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Image Preview" />
          </div>
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input v-model="house.price" type="number" id="price" required />
        </div>
        <div class="form-group">
          <label for="bedrooms">Bedrooms:</label>
          <input v-model.number="house.rooms.bedrooms" type="number" id="bedrooms" required />
        </div>
        <div class="form-group">
          <label for="bathrooms">Bathrooms:</label>
          <input v-model.number="house.rooms.bathrooms" type="number" id="bathrooms" required />
        </div>
        <div class="form-group">
          <label for="size">Size (m²):</label>
          <input v-model.number="house.size" type="number" id="size" required />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="house.description" id="description" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="streetName">Street:</label>
          <input v-model="house.location.street" type="text" id="streetName" required />
        </div>
        <div class="form-group">
          <label for="houseNumber">House Number:</label>
          <input v-model.number="house.location.houseNumber" type="number" id="houseNumber" required />
        </div>
        <div class="form-group">
          <label for="numberAddition">House Number Addition:</label>
          <input v-model="house.location.houseNumberAddition" type="text" id="numberAddition" />
        </div>
        <div class="form-group">
          <label for="zip">Zip:</label>
          <input v-model="house.location.zip" type="text" id="zip" required />
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input v-model="house.location.city" type="text" id="city" required />
        </div>
        <div class="form-group">
          <label for="constructionYear">Construction Year:</label>
          <input v-model.number="house.constructionYear" type="number" id="constructionYear" required />
        </div>
        <div class="form-group">
          <label for="hasGarage">Has Garage:</label>
          <input v-model="house.hasGarage" type="checkbox" id="hasGarage" />
        </div>
        <div class="form-actions">
          <button type="submit" class="update-button">Update House</button>
          <button type="button" @click="cancelEdit" class="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'EditHouse',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const house = ref(null);
    const imageFile = ref(null);
    const previewImage = ref(null);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageFile.value = file;
        previewImage.value = URL.createObjectURL(file);
      }
    };

    const updateHouse = async () => {
      try {
        if (!house.value) {
          alert("House data is not available.");
          return;
        }

        const houseId = house.value.id;
        const formData = new FormData();

        formData.append('price', house.value.price);
        formData.append('bedrooms', house.value.rooms.bedrooms);
        formData.append('bathrooms', house.value.rooms.bathrooms);
        formData.append('size', house.value.size);
        formData.append('streetName', house.value.location.street);
        formData.append('houseNumber', house.value.location.houseNumber);
        formData.append('numberAddition', house.value.location.houseNumberAddition || "");
        formData.append('zip', house.value.location.zip || "");
        formData.append('city', house.value.location.city);
        formData.append('constructionYear', house.value.constructionYear);
        formData.append('hasGarage', house.value.hasGarage ? "true" : "false");
        formData.append('description', house.value.description);

        // Voeg hier de upload van de afbeelding toe
        if (imageFile.value) {
          const imageResponse = await uploadImage(houseId);
          if (!imageResponse.ok) {
            throw new Error(`Image upload failed: ${imageResponse.status}`);
          }
        }

        // Voer de update aanroep uit
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
          method: 'POST',
          headers: {
            'X-Api-Key': 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        router.push(`/house/${house.value.id}`);
      } catch (error) {
        console.error('Error updating house:', error);
        alert(`Error updating house: ${error.message}`);
      }
    };

    const uploadImage = async (houseId) => {
      const formData = new FormData();
      if (imageFile.value) {
        formData.append('image', imageFile.value);
      }

      return await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}/upload`, {
        method: 'POST',
        headers: {
          'X-Api-Key': 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK',
        },
        body: formData,
      });
    };

    const fetchHouseData = async () => {
      const houseId = route.params.id;
      try {
        const fetchedHouse = await store.dispatch('fetchHouseById', houseId);
        if (fetchedHouse && fetchedHouse.length > 0) {
          const houseData = fetchedHouse[0];
          house.value = {
            ...houseData,
            location: houseData.location || { street: '', houseNumber: '', houseNumberAddition: '', city: '', zip: '' },
            rooms: houseData.rooms || { bedrooms: 0, bathrooms: 0 },
          };
        } else {
          console.error('House not found');
          house.value = null;
        }
      } catch (error) {
        console.error('Error fetching house:', error);
        house.value = null;
      }
    };

    onMounted(fetchHouseData);

    const cancelEdit = () => {
      if (house.value) {
        router.push(`/house/${house.value.id}`); // Ga terug naar de detailpagina
      } else {
        router.push('/'); // Redirect naar de homepage als er geen huis is geladen
      }
    };

    return {
      house,
      updateHouse,
      handleFileUpload,
      previewImage,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.edit-house {
  max-width: 800px;
  margin: auto;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff; /* Zorg ervoor dat de inhoud een witte achtergrond heeft */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  margin-top: 10px;
}

.image-preview {
  margin-top: 10px;
  max-height: 500px;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.image-preview img {
  max-width: 50%;
  max-height: 200px;
  object-fit: cover;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.update-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
