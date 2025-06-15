import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import PasswordChecker from '../views/PasswordChecker.vue';
;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/password-checker',  // ここを修正
    name: 'PasswordChecker',
    component: PasswordChecker,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;