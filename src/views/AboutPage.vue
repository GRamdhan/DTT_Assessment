<template>
  <div class="about-page">
    <div class="about-content">
      <h1>About Us</h1>
      <p>Welcome to our house listing app! We are dedicated to helping you find your perfect home. Our platform offers a range of features to help you search for, view, and manage house listings with ease.</p>
      <p>Our team is committed to providing a seamless experience, whether you're buying or selling a home. Feel free to explore our website and get in touch if you have any questions.</p>
      <p>Thank you for visiting!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
.about-page {
  padding: 20px;
  background-image: url('@/assets/images/img_background@3x.png'); /* Achtergrondafbeelding toegevoegd */
  background-size: cover; /* Zorg ervoor dat de afbeelding de volledige achtergrond bedekt */
  background-position: center; /* Zorg ervoor dat de afbeelding gecentreerd is */
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* Zorg ervoor dat de pagina volledig zichtbaar is met uitzondering van de navbar */
}

.about-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.about-content h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.about-content p {
  font-size: 16px;
  color: #666;
  margin: 10px 0;
}
</style>
