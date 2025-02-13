<template>
    <div class="p-4">
        <h1 class="text-2xl mb-6">Quiz Set View</h1>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex">
                <button @click="currentTab = 'current'" :class="[
                    currentTab === 'current'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-24 py-2 px-1 text-center border-b-2 font-medium text-sm'
                ]">
                    Current
                </button>
                <button @click="currentTab = 'proposed'" :class="[
                    currentTab === 'proposed'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-24 py-2 px-1 text-center border-b-2 font-medium text-sm'
                ]">
                    Proposed
                </button>
            </nav>
        </div>

        <!-- Tab Content -->
        <div class="mt-4">
            <!-- Current Quiz Sets -->
            <div v-if="currentTab === 'current'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="quizSet in publishedQuizSets" :key="quizSet.setName"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            {{ quizSet.setName }}
                        </h3>
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                            {{ quizSet.items.length }} items
                        </span>
                    </div>

                    <!-- Quiz Set Details -->
                    <div class="space-y-2">
                        <!-- Basic/Expert Mode -->
                        <div class="flex items-center text-sm">
                            <span class="text-gray-600 dark:text-gray-300">Mode:</span>
                            <span :class="[
                                'ml-2 px-2 py-1 rounded text-xs font-medium',
                                quizSet.basicMode
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            ]">
                                {{ quizSet.basicMode ? 'Basic' : 'Expert' }}
                            </span>
                        </div>

                        <!-- Additional Resources -->
                        <div v-if="quizSet.podcastEpisodes || quizSet.resource"
                            class="text-sm text-gray-600 dark:text-gray-300">
                            <div v-if="quizSet.podcastEpisodes" class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                                Includes podcast episodes
                            </div>
                            <div v-if="quizSet.resource" class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Additional resources
                            </div>
                        </div>

                        <!-- Start Quiz Button -->
                        <button @click="startQuiz(quizSet)"
                            class="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>

            <!-- Proposed Quiz Sets -->
            <div v-else>
                Proposed Quiz Sets Content
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { quizSets } from '../data/quizSets';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentTab = ref('current');

// Filter out quiz sets that are in progress
const publishedQuizSets = quizSets.filter(set => !set.inProgress);

// Function to start a quiz
const startQuiz = (quizSet) => {
    // Find the index of the quiz set in the original quizSets array
    const quizIndex = quizSets.findIndex(set => set.setName === quizSet.setName);
    if (quizIndex !== -1) {
        router.push(`/quiz/${quizIndex}`);
    }
};
</script>