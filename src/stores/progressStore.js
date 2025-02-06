import { defineStore } from 'pinia';
import { auth, db } from '../firebase';
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    serverTimestamp,
    getDoc
} from 'firebase/firestore';

export const useProgressStore = defineStore('progress', {
    state: () => ({
        completedQuizzes: [],
        totalQuizzes: 0,
        lastUpdated: null,
        isLoading: false,
        error: null
    }),

    getters: {
        completedCount: (state) => state.completedQuizzes.length,
        progressPercentage: (state) => {
            if (state.totalQuizzes === 0) return 0;
            return Math.round((state.completedQuizzes.length / state.totalQuizzes) * 100);
        },
        isQuizCompleted: (state) => (quizId) => {
            return state.completedQuizzes.includes(quizId);
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
                // First get the total number of available quizzes from quizSets
                const { quizSets } = await import('../data/quizSets.js');
                this.totalQuizzes = quizSets.length;
                console.log('Total available quizzes:', this.totalQuizzes);

                // Fetch completed quizzes from user progress
                const progressRef = doc(db, 'userProgress', auth.currentUser.uid);
                const progressDoc = await getDoc(progressRef);

                if (progressDoc.exists()) {
                    const data = progressDoc.data();
                    this.completedQuizzes = data.completedQuizzes || [];
                } else {
                    this.completedQuizzes = [];
                }

                console.log('Completed quizzes:', this.completedQuizzes);
                console.log('Progress percentage:', this.progressPercentage);

                this.lastUpdated = new Date();
            } catch (error) {
                console.error('Error fetching progress:', error);
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },

        async markQuizComplete(quizId) {
            if (!auth.currentUser || auth.currentUser.isAnonymous) {
                console.log('No authenticated user, skipping markQuizComplete');
                return;
            }

            try {
                console.log('Marking quiz complete:', quizId);

                // Add to completed quizzes if not already included
                if (!this.completedQuizzes.includes(quizId)) {
                    this.completedQuizzes.push(quizId);
                    console.log('Updated completedQuizzes:', this.completedQuizzes);
                }

                // Update progress in Firestore
                const progressRef = doc(db, 'userProgress', auth.currentUser.uid);
                await setDoc(progressRef, {
                    completedQuizzes: this.completedQuizzes,
                    lastUpdated: serverTimestamp()
                }, { merge: true });

                console.log('Progress saved to Firestore');

            } catch (error) {
                console.error('Error marking quiz complete:', error);
                throw error;
            }
        },

        reset() {
            this.completedQuizzes = [];
            this.totalQuizzes = 0;
            this.lastUpdated = null;
            this.isLoading = false;
            this.error = null;
        }
    }
}); 