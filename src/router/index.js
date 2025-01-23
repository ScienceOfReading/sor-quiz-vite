import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from './guards';
import LoginForm from '../components/auth/LoginForm.vue';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
  // Catch all route for 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
