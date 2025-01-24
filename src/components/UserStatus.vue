<template>
    <div class="user-status flex items-center gap-2 p-2 text-sm">
        <template v-if="authStore.user">
            <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                <img v-if="authStore.user.photoURL" :src="authStore.user.photoURL"
                    :alt="authStore.user.displayName || authStore.user.email" class="w-6 h-6 rounded-full" />
                <span v-else class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {{ ((authStore.user.displayName || authStore.user.email || '?')[0] || '?').toUpperCase() }}
                </span>

                <span class="truncate max-w-[150px]">
                    {{ authStore.user.displayName || authStore.user.email }}
                </span>

                <span v-if="authStore.user.providerData && authStore.user.providerData[0]"
                    class="text-xs px-2 py-0.5 rounded-full" :class="providerClass">
                    {{ getProviderName(authStore.user.providerData[0].providerId) }}
                </span>

                <button @click="handleSignOut"
                    class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
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
                class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
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

const providerClass = computed(() => {
    const providerId = authStore.user?.providerData?.[0]?.providerId;
    return {
        'bg-blue-100 text-blue-800': providerId === 'google.com',
        'bg-gray-900 text-white': providerId === 'github.com',
        'bg-gray-100 text-gray-800': providerId === 'password'
    };
});

const getProviderName = (providerId) => {
    switch (providerId) {
        case 'google.com':
            return 'Google';
        case 'github.com':
            return 'GitHub';
        case 'password':
            return 'Email';
        default:
            return 'Other';
    }
};

const handleSignOut = async () => {
    try {
        await authStore.signOut();
        router.push('/login');
    } catch (error) {
        console.error('Sign out error:', error);
    }
};
</script>