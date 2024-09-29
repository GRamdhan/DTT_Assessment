<template>
  <div id="app">
    <!-- Je AppHeader component wordt hier weergegeven -->
    <AppHeader />
    <!-- Dit is de plek waar je andere componenten worden weergegeven -->
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
/* Global styles for your app */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; /* Dit zorgt ervoor dat je content niet verborgen is achter de vaste header */
  background: url('./assets/images/img_background@3x.png') no-repeat center center fixed; /* Achtergrondafbeelding instellen */
  background-size: cover; /* Zorg ervoor dat de achtergrondafbeelding de hele pagina bedekt */
}
</style>
