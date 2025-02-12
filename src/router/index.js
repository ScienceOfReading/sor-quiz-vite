import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from './guards';
import LoginForm from '../components/auth/LoginForm.vue';
import Home from '../components/Home.vue';
import NewItem from '../components/NewItem.vue';
import GitHubIssues from '../components/GitHubIssues.vue';

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
  {
    path: '/new-item',
    name: 'NewItem',
    component: NewItem
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: () => import('../components/Quiz.vue')
  },
  {
    path: '/issues',
    name: 'issues',
    component: GitHubIssues
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
