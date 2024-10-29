// src/stores/quizStore.js
import { defineStore } from 'pinia';
import { db } from '../firebase'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';

export const quizStore = defineStore('quiz', {
    state: () => ({
        quizAttempts: [],
        userAnswers: [], // Store user answers here
        draftQuizEntry: {
            title: 'Sample Title',
            subtitle: 'Sample Subtitle',
            Question: 'What is your question?',
            questionP2: '',
            answer_type: 'mc',
            option1: 'First option',
            option2: 'Second option',
            option3: 'Third option',
            option4: 'Fourth option',
            option5: 'Fifth option',
            correctAnswer: 1,
            explanation: 'Here is why option 1 is correct...',
            explanation2: '',
            videoUrl: '',
            videoId: '',
            image: '',
            imageUrl: '',
            imageAltText: '',
            podcastEpisode: {
                title: '',
                EpisodeUrl: '',
                audioUrl: '',
                description: '',
                podcastStartTime: 0,
            },
            podcastEpisode2: {
                title: '',
                EpisodeUrl: '',
                audioUrl: '',
                description: '',
                podcastStartTime: 0,
            },
            cautionLevel: '',
            caution: '',
            citations: [],
            ref1: '',
            ref2: '',
            resources: [],
            closingText: '',
            closingText2: '',
            modal: ''
        },
        saveStatus: {
            message: '',
            type: '', // 'success' or 'error'
            show: false
        }
    }),
    actions: {
        async recordQuizAttempt(quizStarted) {
            const attempt = {
                quizStarted,
                userAnswers: this.userAnswers, // Include user answers
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
        async saveUserAnswers() {
            // Check if userAnswers is defined and not empty
            if (!this.userAnswers || this.userAnswers.length === 0) {
                console.error("No user answers to save.");
                return; // Exit if there are no answers to save
            }

            const attempt = {
                userAnswers: this.userAnswers,  // Changed from userAnswers to this.userAnswers
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
        updateDraftQuizEntry(entry) {
            this.draftQuizEntry = { ...this.draftQuizEntry, ...entry };
        },
        resetDraftQuizEntry() {
            this.draftQuizEntry = {
                // Reset to initial state
                title: '',
                subtitle: '',
                // ... (all other fields reset)
            };
        },
        async saveDraftQuizEntry() {
            try {
                const docRef = await addDoc(collection(db, 'quizEntries'), this.draftQuizEntry);
                console.log('Document written with ID: ', docRef.id);
                this.saveStatus = {
                    message: 'Quiz entry saved successfully!',
                    type: 'success',
                    show: true
                };
                this.resetDraftQuizEntry();
                return docRef.id;
            } catch (e) {
                console.error('Error adding document: ', e);
                this.saveStatus = {
                    message: 'Error saving quiz entry: ' + e.message,
                    type: 'error',
                    show: true
                };
                throw e;
            }
        },
        clearSaveStatus() {
            this.saveStatus = {
                message: '',
                type: '',
                show: false
            };
        }
    },
});
