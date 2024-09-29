<template>
  <div class="house-page" v-if="house">
    <div class="house-details">
      <img :src="house.image" alt="House Image" class="house-image" />
      <div class="details-info">
        <h1>
          {{ house.location.city }}, {{ house.location.street }} 
          {{ house.location.houseNumber }} - {{ house.location.zip }}
        </h1>
        <p class="description">{{ house.description }}</p>
        <div class="details">
          <!-- Loop door houseDetails om details van het huis weer te geven -->
          <div class="detail-item" v-for="(value, key) in houseDetails" :key="key">
            <img :src="icons[key]" alt="" />
            <p>{{ value }}</p>
          </div>
        </div>

        <div class="actions" v-if="house.madeByMe">
          <!-- Knop om het huis te verwijderen -->
          <button @click="confirmDeleteHouse" class="delete-button">
            <img :src="icons.delete" alt="Delete Icon" />
            Delete House
          </button>
          <!-- Link naar de edit-pagina van het huis -->
          <router-link :to="`/house/edit/${house.id}`" class="edit-button">
            <img :src="icons.edit" alt="Edit Icon" />
            Edit House
          </router-link>
        </div>
      </div>
    </div>
    <!-- Knop om terug te gaan naar de vorige pagina -->
    <button @click="goBack" class="back-button">
      <img :src="icons.back" alt="Back Icon" />
      Back
    </button>
  </div>
  <div v-else>
    <!-- Bericht voor het laden van huisdetails -->
    <p>Loading house details...</p>
  </div>
</template>

<script>
// Import Vuex en iconen
import { mapGetters } from 'vuex';
import priceIcon from '@/assets/images/ic_price@3x.png';
import sizeIcon from '@/assets/images/ic_size@3x.png';
import bedIcon from '@/assets/images/ic_bed@3x.png';
import bathIcon from '@/assets/images/ic_bath@3x.png';
import deleteIcon from '@/assets/images/ic_delete@3x.png';
import backIcon from '@/assets/images/ic_back_white@3x.png';
import constructionYearIcon from '@/assets/images/ic_construction_date@3x.png';
import garageIcon from '@/assets/images/ic_garage@3x.png';
import editIcon from '@/assets/images/ic_edit@3x.png';

export default {
  name: 'HousePage',
  data() {
    return {
      houseId: this.$route.params.id,  // Verkrijg het huis ID uit de routeparameters
      house: null,  // Initialiseer huis met null
      icons: {  // Icons voor verschillende details
        price: priceIcon,
        size: sizeIcon,
        bed: bedIcon,
        bath: bathIcon,
        delete: deleteIcon,
        back: backIcon,
        constructionYear: constructionYearIcon,
        garage: garageIcon,
        edit: editIcon
      }
    };
  },
  computed: {
    ...mapGetters(['houses']),  // Haal huizen uit Vuex
    houseDetails() {
      return {
        price: `€${this.house.price.toLocaleString()}`,  // Formatteer prijs
        size: `${this.house.size} m²`,  // Voeg grootte toe
        bedrooms: `${this.house.rooms.bedrooms} Beds`,  // Aantal slaapkamers
        bathrooms: `${this.house.rooms.bathrooms} Baths`,  // Aantal badkamers
        constructionYear: `Construction Year: ${this.house.constructionYear}`,  // Bouwjaar
        garage: `Garage: ${this.house.hasGarage ? 'Yes' : 'No'}`,  // Garage beschikbaar
        createdAt: `Created at: ${new Date(this.house.createdAt).toLocaleDateString()}`,  // Datum van aanmaak
        madeByMe: `Made by me: ${this.house.madeByMe ? 'Yes' : 'No'}`,  // Gemaakt door de gebruiker
      };
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);  // Ga terug naar de vorige pagina
    },
    async confirmDeleteHouse() {
      const confirmation = window.confirm('Weet je zeker dat je deze aanbieding wilt verwijderen?');  // Bevestigingsdialoog
      if (confirmation) {
        await this.deleteHouse();  // Verwijder huis indien bevestigd
      }
    },
    async deleteHouse() {
      try {
        await this.$store.dispatch('deleteHouse', this.houseId);  // Verwijder het huis uit de Vuex-store
        this.$router.push('/'); // Redirect naar de homepage na verwijdering
      } catch (error) {
        console.error('Verwijderen van huis mislukt:', error);
        alert('Er is een fout opgetreden bij het verwijderen van het huis. Probeer het opnieuw.');  // Foutmelding
      }
    },
    async loadHouse() {
      try {
        // Laad huisgegevens uit Vuex-store
        if (this.houses && Array.isArray(this.houses)) {
          const house = this.houses.find(h => h.id === parseInt(this.houseId));  // Zoek het huis op ID
          if (house) {
            this.house = house;  // Stel huisgegevens in
          } else {
            console.error('Huis niet gevonden');
            alert('Huis niet gevonden. Controleer de aanbieding opnieuw.');  // Foutmelding
          }
        } else {
          console.error('Geen huizen data beschikbaar');
          alert('Geen huisdata beschikbaar. Probeer het later opnieuw.');  // Foutmelding
        }
      } catch (error) {
        console.error('Kon huisdetails niet laden:', error);
        alert('Er is een fout opgetreden bij het laden van de huisdetails. Probeer het opnieuw.');  // Foutmelding
      }
    }
  },
  created() {
    this.loadHouse();  // Laad huisgegevens bij het creëren van de component
  }
};
</script>

<style scoped>
.house-page {
  padding: 20px;  /* Padding voor de huispagina */
}

.house-details {
  display: flex;  /* Flex-container voor huisdetails */
  flex-direction: column;  /* Stapel de elementen verticaal */
  align-items: center;  /* Centreer de elementen */
  margin-bottom: 20px;  /* Onder marge */
}

.house-image {
  width: 100%;  /* Volledige breedte voor de huisafbeelding */
  max-height: 400px;  /* Maximale hoogte voor de afbeelding */
  object-fit: cover;  /* Zorg voor een goede afbeelding weergave */
}

.details-info {
  text-align: center;  /* Centreer tekst in de details-info */
  margin: 20px 0;  /* Marges boven en onder */
}

.description {
  font-size: 16px;  /* Lettergrootte voor de beschrijving */
  margin: 10px 0;  /* Marges boven en onder */
}

.details {
  display: flex;  /* Flex-container voor details */
  flex-wrap: wrap;  /* Wrap details naar de volgende regel indien nodig */
  justify-content: center;  /* Centreer de details */
}

.detail-item {
  display: flex;  /* Flex-container voor detail-items */
  align-items: center;  /* Centreer items verticaal */
  margin: 5px;  /* Marges rondom detail-items */
}

.actions {
  margin: 10px 0;  /* Marges boven en onder voor acties */
}

.delete-button,
.edit-button,
.back-button {
  background-color: #f44336;  /* Achtergrondkleur voor de delete-knop */
  color: white;  /* Kleur van de tekst */
  border: none;  /* Geen rand */
  padding: 10px 15px;  /* Voeg padding toe */
  margin: 5px;  /* Ruimte tussen knoppen */
  cursor: pointer;  /* Verander cursor naar pointer bij hover */
}

.back-button {
  background-color: #2196F3;  /* Achtergrondkleur voor de terug-knop */
}

.back-button img,
.edit-button img,
.delete-button img {
  margin-right: 5px;  /* Voeg marge rechts toe voor iconen */
}

.back-button:hover,
.edit-button:hover,
.delete-button:hover {
  opacity: 0.8;  /* Verander de opacity bij hover */
}

/* Responsive styles */
@media (max-width: 600px) {
  .house-image {
    max-height: 250px;  /* Verminder maximale hoogte van de afbeelding op kleine schermen */
  }
  .details-info {
    font-size: 14px;  /* Verklein lettergrootte op kleine schermen */
  }
  .delete-button,
  .edit-button,
  .back-button {
    width: 100%;  /* Maak knoppen volledig breed op kleine schermen */
    padding: 12px;  /* Voeg extra padding toe */
  }
}
</style>
