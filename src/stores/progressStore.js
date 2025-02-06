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
        correctQuizItems: [], // Store IDs of correctly answered quiz items
        totalQuizItems: 0,    // Total number of quiz items in active quizzes
        lastUpdated: null,
        isLoading: false,
        error: null
    }),

    getters: {
        completedCount: (state) => state.correctQuizItems.length,
        progressPercentage: (state) => {
            if (state.totalQuizItems === 0) return 0;
            return Math.round((state.correctQuizItems.length / state.totalQuizItems) * 100);
        }
    },

    actions: {
        async fetchProgress() {
            if (!auth.currentUser || auth.currentUser.isAnonymous) {
                console.log('No authenticated user, skipping progress fetch');
                return;
            }

            this.isLoading = true;
            this.error = null;

            try {
                // Get quizzes from quizSets, excluding in-progress ones
                const { quizSets } = await import('../data/quizSets.js');
                const publishedQuizSets = quizSets.filter(set => !set.inProgress);

                // Count total quiz items in active sets
                this.totalQuizItems = publishedQuizSets.reduce((total, set) => {
                    return total + (set.quizItems?.length || 0);
                }, 0);
                console.log('Total quiz items:', this.totalQuizItems);

                // Fetch user's correct answers from quizAttempts
                const attemptsRef = collection(db, 'quizAttempts');
                const q = query(attemptsRef, where('userId', '==', auth.currentUser.uid));
                const querySnapshot = await getDocs(q);

                // Get unique correctly answered quiz items
                const correctItems = new Set();
                querySnapshot.docs.forEach(doc => {
                    const data = doc.data();
                    if (data.userAnswers) {
                        data.userAnswers.forEach(answer => {
                            if (answer.correct && answer.questionId) {
                                correctItems.add(answer.questionId);
                            }
                        });
                    }
                });

                this.correctQuizItems = Array.from(correctItems);
                console.log('Correctly answered items:', this.correctQuizItems.length);

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