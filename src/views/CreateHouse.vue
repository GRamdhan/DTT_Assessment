<template>
  <div class="create-house">
    <h1>Create a New House Listing</h1>
    <form @submit.prevent="submitForm"> <!-- Voorkom de standaard formulierverzending -->
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" v-model="form.price" id="price" required /> <!-- Invoerveld voor prijs -->
      </div>

      <div class="form-group">
        <label for="bedrooms">Bedrooms:</label>
        <input type="number" v-model="form.bedrooms" id="bedrooms" required /> <!-- Invoerveld voor slaapkamers -->
      </div>

      <div class="form-group">
        <label for="bathrooms">Bathrooms:</label>
        <input type="number" v-model="form.bathrooms" id="bathrooms" required /> <!-- Invoerveld voor badkamers -->
      </div>

      <div class="form-group">
        <label for="size">Size (m²):</label>
        <input type="number" v-model="form.size" id="size" required /> <!-- Invoerveld voor grootte in m² -->
      </div>

      <div class="form-group">
        <label for="streetName">Street Name:</label>
        <input type="text" v-model="form.streetName" id="streetName" required /> <!-- Invoerveld voor straatnaam -->
      </div>

      <div class="form-group">
        <label for="houseNumber">House Number:</label>
        <input type="text" v-model="form.houseNumber" id="houseNumber" required /> <!-- Invoerveld voor huisnummer -->
      </div>

      <div class="form-group">
        <label for="numberAddition">Number Addition:</label>
        <input type="text" v-model="form.numberAddition" id="numberAddition" /> <!-- Invoerveld voor nummer toevoeging -->
      </div>

      <div class="form-group">
        <label for="zip">ZIP Code:</label>
        <input type="text" v-model="form.zip" id="zip" required /> <!-- Invoerveld voor postcode -->
      </div>

      <div class="form-group">
        <label for="city">City:</label>
        <input type="text" v-model="form.city" id="city" required /> <!-- Invoerveld voor stad -->
      </div>

      <div class="form-group">
        <label for="constructionYear">Construction Year:</label>
        <input type="number" v-model="form.constructionYear" id="constructionYear" required /> <!-- Invoerveld voor bouwjaar -->
      </div>

      <div class="form-group">
        <label for="hasGarage">Has Garage:</label>
        <input type="checkbox" v-model="form.hasGarage" id="hasGarage" /> <!-- Checkbox voor garage -->
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="form.description" id="description" rows="4" required></textarea> <!-- Invoerveld voor beschrijving -->
      </div>

      <div class="form-group">
        <label for="image">Upload Image:</label>
        <input type="file" @change="onFileChange" id="image" /> <!-- Invoerveld voor het uploaden van een afbeelding -->
      </div>

      <!-- Preview uploaded image -->
      <div v-if="imagePreview" class="image-preview-container"> <!-- Voorbeeld van geüploade afbeelding -->
        <p>Image Preview:</p>
        <img :src="imagePreview" alt="Image preview" class="image-preview"/> <!-- Afbeeldingsvoorbeeld -->
      </div>

      <button type="submit">Submit</button> <!-- Verzenden knop -->
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CreateHouse',
  data() {
    return {
      form: {
        price: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        streetName: '',
        houseNumber: '',
        numberAddition: '',
        zip: '',
        city: '',
        constructionYear: '',
        hasGarage: false,
        description: ''
      },
      imageFile: null, // Voor het opslaan van de afbeelding
      imagePreview: null // Voor het tonen van een voorbeeld van de afbeelding
    };
  },
  methods: {
    ...mapActions(['createHouse', 'uploadHouseImage']), // Map Vuex acties naar component methodes
    async submitForm() {
      try {
        // Maak de huisvermelding aan
        const houseId = await this.createHouse(this.form);
        
        if (this.imageFile) {
          // Upload de afbeelding als deze beschikbaar is
          await this.uploadHouseImage({ houseId, imageFile: this.imageFile });
        }

        this.$router.push('/'); // Redirect naar de homepage na succesvolle verzending
      } catch (error) {
        console.error('Failed to create house:', error); // Log foutmelding bij mislukte creatie
        // Behandel fout, bijvoorbeeld door een foutmelding aan de gebruiker te tonen
      }
    },
    onFileChange(event) {
      this.imageFile = event.target.files[0]; // Sla het geselecteerde bestand op
      if (this.imageFile) {
        this.imagePreview = URL.createObjectURL(this.imageFile); // Maak een URL voor de voorbeeldafbeelding
      }
    }
  }
};
</script>

<style scoped>
.create-house {
  max-width: 700px; /* Maximale breedte van de container */
  margin: auto; /* Centreren van de container */
  padding: 2rem; /* Padding voor de container */
  background-color: #ffffff; /* Achtergrondkleur */
  border-radius: 8px; /* Ronde hoeken */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Schaduw effect */
  font-family: 'Arial', sans-serif; /* Lettertype */
  margin-top: 80px; /* Bovenmarge */
}

.create-house h1 {
  text-align: center; /* Centreren van de titel */
  margin-bottom: 2rem; /* Onder-marge voor de titel */
  font-size: 28px; /* Lettergrootte van de titel */
  color: #333; /* Kleur van de titel */
}

.form-group {
  margin-bottom: 1.5rem; /* Onder-marge voor elk formulierelement */
}

.form-group label {
  display: block; /* Label op een nieuwe regel */
  margin-bottom: 0.5rem; /* Onder-marge voor label */
  font-weight: 600; /* Vetgedrukt label */
  color: #444; /* Kleur van het label */
}

.form-group input,
.form-group textarea {
  width: 100%; /* Volledige breedte van de invoervelden */
  padding: 0.75rem; /* Padding voor invoervelden */
  border: 1px solid #ddd; /* Rand voor invoervelden */
  border-radius: 6px; /* Ronde hoeken voor invoervelden */
  box-sizing: border-box; /* Box-sizing voor nauwkeurige breedte en hoogte */
  font-size: 16px; /* Lettergrootte voor invoervelden */
}

.form-group input[type="checkbox"] {
  width: auto; /* Checkbox breedte */
}

.image-preview-container {
  margin-top: 1rem; /* Bovenmarge voor afbeeldingsvoorbeeld */
}

.image-preview {
  display: block; /* Afbeelding als blok weergeven */
  max-width: 100%; /* Maximale breedte van de afbeelding */
  height: auto; /* Automatische hoogte voor de afbeelding */
  border: 1px solid #ddd; /* Rand voor afbeelding */
  border-radius: 6px; /* Ronde hoeken voor afbeelding */
}

button {
  display: block; /* Knop als blok weergeven */
  width: 100%; /* Volledige breedte van de knop */
  padding: 0.75rem; /* Padding voor knop */
  background-color: #007bff; /* Achtergrondkleur van de knop */
  color: #ffffff; /* Kleur van de tekst in de knop */
  border: none; /* Geen rand voor de knop */
  border-radius: 6px; /* Ronde hoeken voor de knop */
  cursor: pointer; /* Handcursor bij hover */
  font-size: 16px; /* Lettergrootte voor knop */
  font-weight: 600; /* Vetgedrukte tekst voor knop */
  transition: background-color 0.3s ease; /* Animatie voor achtergrondkleur */
}

button:hover {
  background-color: #0056b3; /* Achtergrondkleur bij hover */
}
</style>
