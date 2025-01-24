<template>
    <div class="user-status flex items-center gap-2 p-2 text-sm">
        <template v-if="authStore.user">
            <div class="flex flex-col gap-1 bg-gray-100 rounded-lg px-3 py-2">
                <!-- User Status -->
                <span class="text-gray-600">
                    {{ displayName }}
                </span>

                <!-- Login/Sign Out Buttons -->
                <router-link v-if="authStore.user.isAnonymous" to="/login"
                    class="text-blue-500 hover:text-blue-600 text-sm transition-colors">
                    Sign In
                </router-link>
                <button v-else @click="handleSignOut"
                    class="text-gray-500 hover:text-red-500 text-sm transition-colors flex items-center gap-1"
                    title="Sign Out">
                    <span>Sign Out</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </template>
        <template v-else>
            <router-link to="/login"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm transition-colors">
                Sign In
            </router-link>
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const displayName = computed(() => {
    if (authStore.user.isAnonymous) return 'Anonymous User';
    if (!authStore.user.email) return 'Signed In';
    return authStore.user.email.split('@')[0];
});

const handleSignOut = async () => {
    try {
        await authStore.signOut();
        router.push('/login');
    } catch (error) {
        console.error('Sign out error:', error);
    }
};
</script>