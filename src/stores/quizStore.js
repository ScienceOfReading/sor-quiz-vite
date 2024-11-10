// src/stores/quizStore.js
import { defineStore } from 'pinia';
import { auth, db } from '../firebase'; // Adjust the path as necessary
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const quizStore = defineStore('quiz', {
    state: () => ({
        quizAttempts: [],
        quizEdits: [],
        userAnswers: [], // Store user answers here
        currentQuizId: null,
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
                title: 'Episode Title',
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
            const userId = auth.currentUser?.uid;

            const attempt = {
                userId,  // Add user ID
                quizId: this.currentQuizId,
                quizStarted,
                userAnswers: this.userAnswers,
                timestamp: serverTimestamp()
            };

            try {
                const docRef = await addDoc(collection(db, 'quizAttempts'), attempt);
                console.log("Quiz attempt saved with ID: ", docRef.id);
                this.quizAttempts.push(attempt);
            } catch (e) {
                console.error("Error saving quiz attempt: ", e);
                throw e;
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
                // Add validation/initialization
                const entryToSave = {
                    ...this.draftQuizEntry,
                    podcastEpisode: this.draftQuizEntry.podcastEpisode || {
                        title: '',
                        EpisodeUrl: '',
                        audioUrl: '',
                        description: '',
                        podcastStartTime: 0
                    },
                    podcastEpisode2: this.draftQuizEntry.podcastEpisode2 || {
                        title: '',
                        EpisodeUrl: '',
                        audioUrl: '',
                        description: '',
                        podcastStartTime: 0
                    },
                    timestamp: new Date(),
                };

                console.log('Saving entry with podcast data:', entryToSave, 'at timestamp:', entryToSave.timestamp);
                const docRef = await addDoc(collection(db, 'quizEntries'), entryToSave);
                console.log('Document written with ID: ', docRef.id);
                this.saveStatus = {
                    message: 'Quiz entry saved successfully!',
                    type: 'success',
                    show: true
                };
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
        },
        setCurrentQuiz(quizId) {
            this.currentQuizId = quizId;
            this.userAnswers = []; // Reset answers when starting new quiz
        },
        setUserAnswer(questionIndex, answer) {
            this.userAnswers[questionIndex] = answer;
        },
        async recordQuizEdit(quizStarted) {
            const quizEdit = {
                timestamp: new Date(),
            };

            try {
                const docRef = await addDoc(collection(db, 'quizEdit'), quizEdit);
                console.log("Quiz attempt saved with ID: ", docRef.id);
                this.quizEdits.push(quizEdit);
            } catch (e) {
                console.error("Error saving quiz attempt: ", e);
                throw e;
            }
        },
    },
});
