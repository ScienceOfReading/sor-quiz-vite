// src/stores/quizStore.js
import { defineStore } from 'pinia';
import { db } from '../firebase'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';

export const quizStore = defineStore('quiz', {
    state: () => ({
        quizAttempts: [],
    }),
    actions: {
        async recordQuizAttempt(quizStarted) {
            const attempt = {
                quizStarted,
                timestamp: new Date(),
            };
            this.quizAttempts.push(attempt);
            console.log("Quiz attempt recorded:", attempt);

            // Firestore logic to save the attempt
            try {
                const docRef = await addDoc(collection(db, 'quizAttempts'), attempt);
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
    },
});
