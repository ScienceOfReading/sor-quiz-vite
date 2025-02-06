import { defineStore } from 'pinia';
import { auth, db } from '../firebase';
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from 'firebase/firestore';

export const useProgressStore = defineStore('progress', {
    state: () => ({
        completedQuizzes: [],  // Keep track of completed quizzes
        correctQuizItems: [],  // Store IDs of correctly answered quiz items
        totalQuizzes: 0,       // Total number of available quizzes
        totalQuizItems: 0,     // Total number of quiz items
        lastUpdated: null,
        isLoading: false,
        error: null,
        initialized: false
    }),

    getters: {
        quizCompletionCount: (state) => state.completedQuizzes.length,
        correctItemsCount: (state) => state.correctQuizItems.length,
        progressPercentage: (state) => {
            if (!state.initialized || state.totalQuizItems === 0) return 0;
            return Math.round((state.correctQuizItems.length / state.totalQuizItems) * 100);
        }
    },

    actions: {
        async initialize() {
            try {
                // Load quiz sets first
                const { quizSets } = await import('../data/quizSets.js');
                console.log('Loaded quizSets:', quizSets);

                const publishedQuizSets = quizSets.filter(set => !set.inProgress);
                console.log('Published quizSets:', publishedQuizSets);

                this.totalQuizzes = publishedQuizSets.length;

                // Count total quiz items using the correct property name 'items'
                this.totalQuizItems = publishedQuizSets.reduce((total, set) => {
                    const itemCount = set.items?.length || 0;
                    console.log(`Quiz set ${set.setName}: ${itemCount} items`);
                    return total + itemCount;
                }, 0);

                console.log('Initialization complete:', {
                    totalQuizzes: this.totalQuizzes,
                    totalQuizItems: this.totalQuizItems,
                    publishedSets: publishedQuizSets.map(set => ({
                        name: set.setName,
                        itemCount: set.items?.length || 0
                    }))
                });

                this.initialized = true;
            } catch (error) {
                console.error('Error in initialize:', error);
                throw error;
            }
        },

        async fetchProgress() {
            if (!auth.currentUser || auth.currentUser.isAnonymous) {
                console.log('No authenticated user, skipping progress fetch');
                return;
            }

            this.isLoading = true;
            this.error = null;

            try {
                // Ensure we're initialized
                if (!this.initialized) {
                    await this.initialize();
                }

                // Fetch user's progress from Firestore
                const progressRef = doc(db, 'userProgress', auth.currentUser.uid);
                const progressDoc = await getDoc(progressRef);

                if (progressDoc.exists()) {
                    const data = progressDoc.data();
                    this.completedQuizzes = data.completedQuizzes || [];
                    this.correctQuizItems = data.correctQuizItems || [];
                }

                // Check quizAttempts for historical data
                const attemptsRef = collection(db, 'quizAttempts');
                const q = query(attemptsRef, where('userId', '==', auth.currentUser.uid));
                const querySnapshot = await getDocs(q);

                const completedQuizIds = new Set(this.completedQuizzes);
                const correctItems = new Set(this.correctQuizItems);

                querySnapshot.docs.forEach(doc => {
                    const data = doc.data();
                    if (data.quizId) {
                        completedQuizIds.add(data.quizId);
                    }
                    if (data.userAnswers) {
                        data.userAnswers.forEach(answer => {
                            if (answer.correct && answer.questionId) {
                                correctItems.add(answer.questionId);
                            }
                        });
                    }
                });

                this.completedQuizzes = Array.from(completedQuizIds);
                this.correctQuizItems = Array.from(correctItems);

                console.log('Progress loaded:', {
                    completedQuizzes: this.completedQuizzes.length,
                    correctItems: this.correctQuizItems.length,
                    totalQuizItems: this.totalQuizItems
                });

                this.lastUpdated = new Date();
            } catch (error) {
                console.error('Error fetching progress:', error);
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },

        async markQuizItemCorrect(questionId) {
            if (!auth.currentUser || auth.currentUser.isAnonymous) return;

            try {
                if (!this.correctQuizItems.includes(questionId)) {
                    this.correctQuizItems.push(questionId);
                }

                // Update progress in Firestore
                const progressRef = doc(db, 'userProgress', auth.currentUser.uid);
                await setDoc(progressRef, {
                    correctQuizItems: this.correctQuizItems,
                    lastUpdated: serverTimestamp()
                }, { merge: true });

                console.log('Quiz item progress saved');

            } catch (error) {
                console.error('Error marking quiz item correct:', error);
                throw error;
            }
        }
    }
}); 