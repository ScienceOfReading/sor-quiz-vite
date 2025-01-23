import { useAuthStore } from '../stores/authStore';

export async function requireAuth(to, from, next) {
  const authStore = useAuthStore();
  
  // Wait for auth state to be initialized
  if (authStore.loading) {
    await authStore.init();
  }

  if (!authStore.isAuthenticated) {
    // Redirect to login page with return url
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}
