// src/stores/quizStore.js
import { defineStore } from 'pinia';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useAuthStore } from './authStore';

export const quizStore = defineStore('quiz', {
    state: () => ({
        quizAttempts: [],
        quizEdits: [],
        userAnswers: [], 
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
            modal: '',
            status: 'draft' 
        },
        saveStatus: {
            message: '',
            type: '', 
            show: false
        },
        incorrectQuestions: []  
    }),
    actions: {
        // =============================================
        // Quiz Taking Actions
        // Actions related to taking quizzes, recording answers,
        // and tracking quiz attempts
        // =============================================
        
        setCurrentQuiz(quizId) {
            console.log('Setting current quiz:', quizId);
            this.currentQuizId = quizId;
            this.userAnswers = []; 
            this.incorrectQuestions = [];  
        },

        setUserAnswer(index, selectedAnswer, correctAnswer, questionId, questionTitle, quizEntry) {
            if (selectedAnswer === undefined) {
                console.error('Invalid selectedAnswer:', selectedAnswer);
                return;
            }

            if (Array.isArray(selectedAnswer)) {
                console.log('Sortable list answer - skipping correctness check');

                this.userAnswers[index] = {
                    selected: selectedAnswer,
                    questionId: questionId || '',
                    questionTitle: questionTitle || '',
                    timestamp: new Date().toISOString()
                };

                return;
            }

            const isCorrect = selectedAnswer === correctAnswer;

            this.userAnswers[index] = {
                selected: selectedAnswer,
                correct: isCorrect,
                questionId: questionId || '',
                questionTitle: questionTitle || '',
                timestamp: new Date().toISOString()
            };

            if (!isCorrect && !this.incorrectQuestions.some(q => q.id === questionId)) {
                const chosenOptionText = quizEntry?.[`option${selectedAnswer}`] || '';
                this.incorrectQuestions.push({
                    id: questionId || '',
                    title: questionTitle || '',
                    chosenAnswer: chosenOptionText?.substring(0, 100) || ''
                });
            }

            try {
                const userId = auth.currentUser?.uid;
                if (!userId) {
                    console.error('No user ID available');
                    return;
                }

                const cleanUserAnswers = this.userAnswers.filter(answer =>
                    answer !== null && answer !== undefined
                );

                const cleanIncorrectQuestions = this.incorrectQuestions.filter(q =>
                    q !== null && q !== undefined
                );

                const attemptRef = doc(db, 'quizAttempts', `${userId}_${this.currentQuizId}`);
                await setDoc(attemptRef, {
                    userId,
                    quizId: this.currentQuizId,
                    userAnswers: cleanUserAnswers,
                    incorrectQuestions: cleanIncorrectQuestions,
                    lastUpdated: serverTimestamp()
                }, { merge: true });

            } catch (error) {
                console.error('Firebase save error:', error);
                throw error;
            }
        },

        async recordQuizAttempt(quizStarted) {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const attemptData = {
                    userId: user.uid,
                    isAnonymous: user.isAnonymous,
                    quizId: this.currentQuizId,
                    timestamp: serverTimestamp(),
                    quizStarted
                };

                await addDoc(collection(db, 'quizAttempts'), attemptData);
            } catch (error) {
                console.error('Error recording quiz attempt:', error);
            }
        },

        setUserAnswers(answers) {
            this.userAnswers = answers; 
        },

        async saveUserAnswers() {
            if (!this.userAnswers || this.userAnswers.length === 0) {
                console.error("No user answers to save.");
                return;
            }

            const attempt = {
                userAnswers: this.userAnswers,  
                timestamp: new Date(),
            };

            try {
                const docRef = await addDoc(collection(db, 'userAnswers'), attempt);
                console.log("User answers saved with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },

        // =============================================
        // Quiz Editing Actions
        // Actions related to creating, editing, and managing
        // quiz entries and drafts
        // =============================================

        async saveDraftQuizEntry() {
            try {
                const user = auth.currentUser;
                if (!user) throw new Error('No user found');

                const authStore = useAuthStore();
                const canPublish = !user.isAnonymous;

                const entryToSave = {
                    ...this.draftQuizEntry,
                    userId: user.uid,
                    userEmail: user.email,
                    isAnonymous: user.isAnonymous,
                    status: canPublish ? 'pending' : 'draft',
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
                    timestamp: serverTimestamp(),
                };

                console.log('Saving entry:', entryToSave);
                const docRef = await addDoc(collection(db, 'quizEntries'), entryToSave);
                console.log('Document written with ID:', docRef.id);
                
                this.saveStatus = {
                    message: canPublish 
                        ? 'Quiz entry submitted for review!' 
                        : 'Quiz entry saved as draft. Sign in to submit for review.',
                    type: 'success',
                    show: true
                };
                return docRef.id;
            } catch (e) {
                console.error('Error adding document:', e);
                this.saveStatus = {
                    message: 'Error saving quiz entry: ' + e.message,
                    type: 'error',
                    show: true
                };
                throw e;
            }
        },

        updateDraftQuizEntry(entry) {
            this.draftQuizEntry = { ...this.draftQuizEntry, ...entry };
        },

        resetDraftQuizEntry() {
            this.draftQuizEntry = {
                title: '',
                subtitle: '',
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
                modal: '',
                status: 'draft'
            };
        },

        async recordQuizEdit(quizStarted) {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const editData = {
                    userId: user.uid,
                    isAnonymous: user.isAnonymous,
                    timestamp: serverTimestamp(),
                    quizStarted
                };

                await addDoc(collection(db, 'quizEdits'), editData);
            } catch (error) {
                console.error('Error recording quiz edit:', error);
            }
        },

        clearSaveStatus() {
            this.saveStatus = {
                message: '',
                type: '',
                show: false
            };
        },
    },
});
