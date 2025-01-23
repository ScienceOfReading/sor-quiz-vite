&lt;template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-center">{{ isRegister ? 'Register' : 'Login' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          v-model="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          v-model="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {{ isRegister ? 'Register' : 'Login' }}
      </button>
    </form>

    <div class="mt-4">
      <button
        @click="handleGoogleLogin"
        class="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
      >
        <img src="/google-icon.svg" alt="Google" class="w-5 h-5 mr-2" />
        Continue with Google
      </button>
    </div>

    <p class="mt-4 text-center text-sm text-gray-600">
      {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
      <button
        @click="isRegister = !isRegister"
        class="text-blue-600 hover:text-blue-500"
      >
        {{ isRegister ? 'Login' : 'Register' }}
      </button>
    </p>
  </div>
&lt;/template>

&lt;script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const isRegister = ref(false);

const handleSubmit = async () => {
  try {
    error.value = '';
    if (isRegister.value) {
      await authStore.registerWithEmail(email.value, password.value);
    } else {
      await authStore.loginWithEmail(email.value, password.value);
    }
    router.push('/');
  } catch (err) {
    error.value = err.message;
  }
};

const handleGoogleLogin = async () => {
  try {
    error.value = '';
    await authStore.loginWithGoogle();
    router.push('/');
  } catch (err) {
    error.value = err.message;
  }
};
&lt;/script>
