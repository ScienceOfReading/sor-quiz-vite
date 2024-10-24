// src/stores/quizStore.js
import { defineStore } from 'pinia';
import { db } from '../firebase'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';

export const quizStore = defineStore('quiz', {
    state: () => ({
        quizAttempts: [],
        userAnswers: [], // Store user answers here
    }),
    actions: {
        async recordQuizAttempt(quizStarted) {
            const attempt = {
                quizStarted,
                userAnswers: this.$userAnswers, // Include user answers
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
        async saveUserAnswers(userAnswers) {
            console.log("In saveUserAnswers, userAnswers: ", userAnswers)
            const attempt = {
                userAnswers: userAnswers,
                timestamp: new Date(),
            };

            // Firestore logic to save user answers
            try {
                const docRef = await addDoc(collection(db, 'userAnswers'), attempt);
                console.log("User answers saved with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        setUserAnswers(answers) {
            this.userAnswers = answers; // Update user answers
        },
    },
});
