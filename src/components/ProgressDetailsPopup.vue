<template>
    <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
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
                        <div class="space-y-2">
                            <div v-for="(quizSet, index) in publishedQuizSets" :key="quizSet.setName"
                                class="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                                @click="showMissedItems(quizSet, index)">
                                <div class="flex justify-between mb-1">
                                    <span
                                        class="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
                                        {{ quizSet.setName }}
                                    </span>
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-medium text-gray-900 dark:text-white">
                                            {{ getQuizSetProgress(quizSet).correct }}/{{ quizSet.items.length }}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 text-gray-500" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-600">
                                    <div class="bg-blue-600 h-1.5 rounded-full"
                                        :style="{ width: `${getQuizSetProgress(quizSet).percentage}%` }">
                                    </div>
                                </div>

                                <!-- Missed Items Section -->
                                <div v-if="selectedQuizSet === index"
                                    class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    <div class="font-medium mb-1">Missed Items:</div>
                                    <ul class="list-disc pl-4">
                                        <li v-for="item in missedItems" :key="item.id">
                                            {{ item.title || 'Untitled Question' }}
                                        </li>
                                    </ul>
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
import { computed, ref } from 'vue';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default {
    name: 'ProgressDetailsPopup',
    props: {
        show: Boolean
    },
    emits: ['close'],
    setup() {
        const progressStore = useProgressStore();
        const selectedQuizSet = ref(null);
        const missedItems = ref([]);

        const showMissedItems = async (quizSet, index) => {
            console.log('Showing missed items for quiz:', {
                quizSet,
                index,
                setName: quizSet.setName,
                items: quizSet.items
            });

            if (selectedQuizSet.value === index) {
                // If clicking the same quiz set, collapse it
                selectedQuizSet.value = null;
                missedItems.value = [];
                return;
            }

            selectedQuizSet.value = index;
            missedItems.value = [];

            try {
                // Get the user's progress for this quiz using the quiz ID from quizSets
                const progressRef = doc(db, 'userProgress', `${auth.currentUser.uid}_${quizSet.id}`);
                const progressDoc = await getDoc(progressRef);

                console.log('Progress doc:', progressDoc.data());

                if (progressDoc.exists()) {
                    const data = progressDoc.data();
                    if (data.userAnswers) {
                        // Filter for incorrect answers and get their titles
                        missedItems.value = data.userAnswers
                            .filter(answer => !answer.correct)
                            .map(answer => ({
                                id: answer.questionId,
                                title: answer.questionTitle || 'Untitled Question'
                            }));

                        console.log('Found missed items:', missedItems.value);
                    }
                }
            } catch (error) {
                console.error('Error fetching missed items:', error);
            }
        };

        const lastUpdatedText = computed(() => {
            if (!progressStore.lastUpdated) return 'Never';
            return new Date(progressStore.lastUpdated).toLocaleString();
        });

        return {
            progressStore,
            selectedQuizSet,
            missedItems,
            showMissedItems,
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

            console.log('Quiz set progress:', {
                setName: quizSet.setName,
                items: quizSet.items,
                correctItems: this.progressStore.correctQuizItems,
                correctCount: correctAnswers,
                total: totalQuestions
            });

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

/* Add these styles to ensure popup is above other content */
.fixed {
    isolation: isolate;
}
</style>