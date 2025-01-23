&lt;template>
  <header class="bg-white shadow">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-gray-900">SOR Quiz</h1>
          </router-link>
        </div>
        
        <div class="flex items-center">
          <template v-if="authStore.isAuthenticated">
            <span class="text-gray-700 mr-4">{{ authStore.user?.email || 'Anonymous User' }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </router-link>
          </template>
        </div>
      </div>
    </nav>
  </header>
&lt;/template>

&lt;script setup>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
&lt;/script>
