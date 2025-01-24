<template>
    <div class="user-status flex items-center gap-2 p-2 text-sm">
        <template v-if="authStore.user">
            <div class="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <!-- User Status -->
                <span class="text-gray-600">
                    {{ authStore.user.isAnonymous ? 'Anonymous User' : (authStore.user.email || 'Signed In') }}
                </span>

                <!-- Sign Out Button (only show for non-anonymous users) -->
                <button v-if="!authStore.user.isAnonymous" @click="handleSignOut"
                    class="ml-2 text-gray-500 hover:text-red-500" title="Sign Out">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </template>
        <template v-else>
            <router-link to="/login" class="text-gray-600 hover:text-gray-800">
                Sign In
            </router-link>
        </template>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleSignOut = async () => {
    try {
        await authStore.signOut();
        router.push('/login');
    } catch (error) {
        console.error('Sign out error:', error);
    }
};
</script>