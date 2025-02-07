<template>
    <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div class="mt-3">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Your Progress</h3>
                <div class="mt-2">
                    <!-- Loading State -->
                    <div v-if="!progressStore.initialized || progressStore.isLoading" class="text-center py-4">
                        <div
                            class="animate-spin h-6 w-6 border-2 border-gray-500 border-t-transparent rounded-full mx-auto mb-2">
                        </div>
                        <p class="text-gray-600 dark:text-gray-400">Loading progress...</p>
                    </div>

                    <template v-else>
                        <!-- Overall Stats -->
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div class="text-2xl font-bold text-gray-900 dark:text-white">
                                    {{ progressStore.quizCompletionCount }}/{{ progressStore.totalQuizzes }}
                                </div>
                                <div class="text-sm text-gray-600 dark:text-gray-300">Quizzes Completed</div>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div class="text-2xl font-bold text-gray-900 dark:text-white">
                                    {{ progressStore.correctItemsCount }}/{{ progressStore.totalQuizItems }}
                                </div>
                                <div class="text-sm text-gray-600 dark:text-gray-300">Items Correct</div>
                            </div>
                        </div>

                        <!-- Per Quiz Set Progress -->
                        <div class="space-y-4">
                            <div v-for="quizSet in publishedQuizSets" :key="quizSet.setName"
                                class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                                        {{ quizSet.setName }}
                                    </span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">
                                        {{ getQuizSetProgress(quizSet).correct }}/{{ quizSet.items.length }}
                                    </span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                                    <div class="bg-blue-600 h-2.5 rounded-full"
                                        :style="{ width: `${getQuizSetProgress(quizSet).percentage}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Last Updated -->
                        <div class="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            Last updated: {{ lastUpdatedText }}
                        </div>

                        <!-- Close Button -->
                        <div class="mt-4">
                            <button @click="$emit('close')"
                                class="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                Close
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProgressStore } from '../stores/progressStore';
import { quizSets } from '../data/quizSets';
import { computed } from 'vue';

export default {
    name: 'ProgressDetailsPopup',
    props: {
        show: Boolean
    },
    emits: ['close'],
    setup() {
        const progressStore = useProgressStore();

        const lastUpdatedText = computed(() => {
            if (!progressStore.lastUpdated) return 'Never';
            return new Date(progressStore.lastUpdated).toLocaleString();
        });

        return {
            progressStore,
            lastUpdatedText
        };
    },
    computed: {
        publishedQuizSets() {
            return quizSets.filter(set => !set.inProgress);
        }
    },
    methods: {
        getQuizSetProgress(quizSet) {
            const correctAnswers = quizSet.items.filter(itemId =>
                this.progressStore.correctQuizItems.includes(itemId)
            ).length;

            const totalQuestions = quizSet.items.length;
            const percentage = totalQuestions > 0
                ? (correctAnswers / totalQuestions) * 100
                : 0;

            return {
                correct: correctAnswers,
                total: totalQuestions,
                percentage: Math.round(percentage)
            };
        }
    }
};
</script>

<style scoped>
.bg-opacity-50 {
    backdrop-filter: blur(4px);
}
</style>