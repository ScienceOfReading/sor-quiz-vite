import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from './guards';
import LoginForm from '../components/auth/LoginForm.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  // Add the auth guard to protected routes
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: () => import('../components/Quiz.vue'),
    beforeEnter: requireAuth
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
