<template>
  <div v-if="house" class="house-details">
    <header>
      <h1>House Details</h1>
    </header>
    <div class="house-info">
      <img :src="house.image" alt="House image" class="house-image" />
      <div class="details">
        <h2>{{ house.location.street }}, {{ house.location.city }}</h2>
        <p><strong>Postal Code:</strong> {{ house.location.postalCode }}</p>
        <p><strong>Description:</strong> {{ house.description }}</p>
        <p><strong>Price:</strong> €{{ house.price.toLocaleString() }}</p>
        <p><strong>Size:</strong> {{ house.size }} m²</p>
        <p><strong>Bedrooms:</strong> {{ house.rooms.bedrooms }}</p>
        <p><strong>Bathrooms:</strong> {{ house.rooms.bathrooms }}</p>
        <p><strong>Construction Year:</strong> {{ house.constructionYear }}</p>
        <p><strong>Garage:</strong> {{ house.hasGarage ? 'Yes' : 'No' }}</p>
      </div>
      <div class="actions">
        <button @click="editHouse" class="edit-button">Edit</button>
        <button @click="deleteHouse" class="delete-button">Delete</button>
        <button @click="goBack" class="back-button">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'HouseDetails',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const house = ref(null);
    const apiKey = 'U4tnCWEYc37uJdDpN8oyiQOGqXTajzgK'; // API sleutel

    const fetchHouseDetails = async () => {
      const houseId = route.params.id;
      try {
        const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${houseId}`, {
          headers: {
            'X-Api-Key': apiKey,
          },
        });
        if (!response.ok) {
          throw new Error('House not found');
        }
        house.value = await response.json();
      } catch (error) {
        console.error(error);
        router.push('/'); // Redirect naar de homepage als er een fout optreedt
      }
    };

    const editHouse = () => {
      router.push(`/edit/${house.value.id}`);
    };

    const deleteHouse = async () => {
      const confirmDelete = confirm('Are you sure you want to delete this house?');
      if (confirmDelete) {
        try {
          const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${house.value.id}`, {
            method: 'DELETE',
            headers: {
              'X-Api-Key': apiKey,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to delete house');
          }
          router.push('/'); // Redirect naar de homepage na succesvolle verwijdering
        } catch (error) {
          console.error(error);
          alert('An error occurred while deleting the house.');
        }
      }
    };

    const goBack = () => {
      router.push('/'); // Altijd terug naar de homepage
    };

    onMounted(fetchHouseDetails);

    return {
      house,
      editHouse,
      deleteHouse,
      goBack,
    };
  },
};
</script>

<style scoped>
.house-details {
  padding: 20px;
  background-color: #ffffff; /* BACKGROUND 2 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.house-image {
  max-width: 100%;
  border-radius: 8px;
}

.details {
  margin-top: 20px;
}

.details p {
  margin: 8px 0;
  color: #4A4B4C; /* TEXT COLOR */
}

.actions {
  margin-top: 20px;
}

.actions button {
  padding: 6px 12px; /* 50% kleinere knoppen */
  margin-right: 10px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 16px; /* Knop lettertypegrootte */
  font-family: 'Montserrat', sans-serif; /* Professioneel lettertype */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Toevoegen van transitie-effecten */
}

/* Edit button styling */
.edit-button {
  background-color: #EB5440; /* SECONDARY COLOR */
  color: white;
}

.edit-button:hover {
  background-color: #C23B33; /* Donkerdere schaduw bij hover */
  transform: translateY(-1px); /* Kleine verhoging bij hover */
}

/* Delete button styling */
.delete-button {
  background-color: #DC3545; /* Rood voor gevaarlijke actie */
  color: white;
}

.delete-button:hover {
  background-color: #C82333; /* Donkerdere schaduw bij hover */
  transform: translateY(-1px); /* Kleine verhoging bij hover */
}

/* Back button styling */
.back-button {
  background-color: #E8E8E8; /* Tertiary color voor neutrale acties */
  color: #4A4B4C; /* TEXT COLOR */
}

.back-button:hover {
  background-color: #C3C3C3; /* Donkerdere schaduw bij hover */
  transform: translateY(-1px); /* Kleine verhoging bij hover */
}
</style>
