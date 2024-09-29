<template>
  <header>
    <div class="logo-container">
      <!-- Logo van het bedrijf DTT wordt weergegeven -->
      <img src="@/assets/images/img_logo_dtt@3x.png" alt="DTT Logo" class="logo" />
    </div>
    <nav>
      <ul>
        <!-- Link naar de homepage; markeert actief als de huidige route de homepage is -->
        <li :class="{ active: $route.path === '/' }">
          <router-link to="/">Home</router-link>
        </li>
        <!-- Link naar de pagina voor het aanmaken van een woninglijst -->
        <li :class="{ active: $route.path === '/create-house' }">
          <router-link to="/create-house">Create Listing</router-link>
        </li>
        <!-- Link naar de 'Over' pagina -->
        <li :class="{ active: $route.path === '/about' }">
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader', // Naam van de component
};
</script>

<style scoped>
header {
  background-color: #ffffff; /* Achtergrondkleur van de header */
  padding: 1rem 2rem; /* Ruimte rondom de header */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Schaduw onder de header */
  display: flex; /* Flexbox voor lay-out */
  align-items: center; /* Centraal uitlijnen van items in de header */
  justify-content: space-between; /* Ruimte tussen logo en navigatie */
  position: fixed; /* Header blijft bovenaan het scherm vaststaan */
  top: 0; /* Plaats de header bovenaan */
  width: 100%; /* Maak de header breed over het hele scherm */
  z-index: 1000; /* Zorgt ervoor dat de header boven andere elementen staat */
}

.logo-container {
  flex: 1; /* Flexbox-eigenschap om ruimte in te nemen */
}

.logo {
  height: 40px; /* Hoogte van het logo */
}

nav ul {
  list-style: none; /* Geen opsommingstekens voor de lijst */
  padding: 0; /* Geen padding rondom de lijst */
  margin: 0; /* Geen marge rondom de lijst */
  display: flex; /* Flexbox voor de navigatielinks */
  gap: 1.5rem; /* Ruimte tussen de navigatielinks */
}

nav li {
  position: relative; /* Voor het gebruik van absolute positionering voor de onderstreping */
}

nav a {
  text-decoration: none; /* Geen onderstreping van links */
  color: #333; /* Kleur van de tekst */
  font-size: 16px; /* Lettergrootte */
  font-weight: 500; /* Gewicht van het lettertype */
  transition: color 0.3s ease, text-decoration 0.3s ease; /* Zachte overgangseffecten bij hover */
}

nav li.active a {
  color: #007bff; /* Kleur van actieve link */
  font-weight: bold; /* Maak de tekst van de actieve link vetgedrukt */
}

nav a:hover {
  color: #0056b3; /* Kleur van de link wanneer je eroverheen hovert */
  text-decoration: underline; /* Onderstreep de link bij hover */
}

nav li.active::after {
  content: ''; /* Voegt een visueel element toe na de actieve link */
  display: block; /* Zorgt ervoor dat het zichtbaar is */
  width: 100%; /* Volledige breedte van de link */
  height: 2px; /* Hoogte van de onderstreping */
  background-color: #007bff; /* Kleur van de onderstreping */
  position: absolute; /* Plaats het absoluut ten opzichte van de li */
  bottom: -5px; /* Plaatst het 5px onder de link */
  left: 0; /* Begin bij de linkzijde */
}
</style>
