<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>

        <!-- Popup content -->
        <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <button @click="$emit('close')"
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h2 class="text-xl font-semibold mb-4 dark:text-white">Your Progress</h2>

            <div class="space-y-4">
                <!-- Overall progress -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-gray-600 dark:text-gray-300">Overall Progress</span>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                            {{ progressStore.progressPercentage }}%
                        </span>
                    </div>
                    <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-green-500 rounded-full transition-all duration-500"
                            :style="{ width: `${progressStore.progressPercentage}%` }"></div>
                    </div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div class="text-2xl font-bold text-gray-900 dark:text-white">
                            {{ progressStore.completedCount }}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-300">Items Correct</div>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div class="text-2xl font-bold text-gray-900 dark:text-white">
                            {{ progressStore.totalQuizItems }}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-300">Total Items</div>
                    </div>
                </div>

                <!-- Last updated -->
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {{ lastUpdatedText }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useProgressStore } from '../stores/progressStore';
import { computed } from 'vue';

const props = defineProps({
    show: Boolean
});

defineEmits(['close']);

const progressStore = useProgressStore();

const lastUpdatedText = computed(() => {
    if (!progressStore.lastUpdated) return 'Never';
    return new Date(progressStore.lastUpdated).toLocaleString();
});
</script>