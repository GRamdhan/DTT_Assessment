import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import HousePage from '../views/HousePage.vue';
import CreateHouse from '../views/CreateHouse.vue';
import EditHouse from '../views/EditHouse.vue';
import AboutPage from '../views/AboutPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/house/:id',
    name: 'HousePage',
    component: HousePage,
    props: true, // Hiermee worden route parameters als props doorgegeven aan de component
  },
  {
    path: '/create-house',
    name: 'CreateHouse',
    component: CreateHouse,
  },
  {
    path: '/house/edit/:id',
    name: 'EditHouse',
    component: EditHouse,
    props: true, // Hiermee worden route parameters als props doorgegeven aan de component
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
  },
  // Catch-all route
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

// Router aanmaken met geschiedenis beheer
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Router exporteren voor gebruik in de app
export default router;
