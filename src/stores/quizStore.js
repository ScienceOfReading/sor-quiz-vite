// src/stores/quizStore.js
import { defineStore } from 'pinia';
import { auth, db } from '../firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  setDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { useAuthStore } from './authStore';

export const quizStore = defineStore('quiz', {
    state: () => ({
        quizAttempts: [],
        quizEdits: [],
        userAnswers: [], 
        currentQuizId: null,
        draftQuizItems: [],
        draftQuizItemsLoading: false,
        draftQuizItemsError: null,
        draftQuizEntry: {
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
            status: 'draft',
            id: null
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

        async setUserAnswer(index, selectedAnswer, correctAnswer, questionId, questionTitle, quizEntry) {
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

        async fetchDraftQuizItems() {
            this.draftQuizItemsLoading = true;
            this.draftQuizItemsError = null;
            try {
                const q = query(collection(db, 'quizEntries'), where('status', '==', 'draft'));
                const querySnapshot = await getDocs(q);
                this.draftQuizItems = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
            } catch (error) {
                console.error('Error fetching draft quiz items:', error);
                this.draftQuizItemsError = error.message;
            } finally {
                this.draftQuizItemsLoading = false;
            }
        },

        async saveDraftQuizEntry() {
            try {
                const user = auth.currentUser;
                if (!user) throw new Error('No user found');

                // If the draft has an ID, check ownership before updating
                if (this.draftQuizEntry.id) {
                    const existingDraft = this.draftQuizItems.find(item => item.id === this.draftQuizEntry.id);
                    if (existingDraft) {
                        // If trying to update someone else's draft, create a new one instead
                        if (existingDraft.userId !== user.uid) {
                            console.log('Creating new draft from existing one');
                            // Clear the ID to force creating a new draft
                            this.draftQuizEntry.id = null;
                        } else {
                            return await this.updateExistingDraftEntry(this.draftQuizEntry.id);
                        }
                    }
                }

                const entryToSave = {
                    ...this.draftQuizEntry,
                    userId: user.uid,
                    userEmail: user.email,
                    isAnonymous: user.isAnonymous,
                    status: 'draft', // Always save as draft initially
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

                console.log('Saving new draft entry:', entryToSave);
                const docRef = await addDoc(collection(db, 'quizEntries'), entryToSave);
                console.log('Document written with ID:', docRef.id);
                
                // Update the local draft with the new ID
                this.draftQuizEntry.id = docRef.id;
                
                this.saveStatus = {
                    message: 'Draft saved successfully!',
                    type: 'success',
                    show: true
                };
                return docRef.id;
            } catch (e) {
                console.error('Error saving draft:', e);
                this.saveStatus = {
                    message: 'Error saving draft: ' + e.message,
                    type: 'error',
                    show: true
                };
                throw e;
            }
        },

        async updateExistingDraftEntry(draftId) {
            try {
                const user = auth.currentUser;
                if (!user) throw new Error('No user found');

                // Verify ownership before updating
                const existingDraft = this.draftQuizItems.find(item => item.id === draftId);
                if (!existingDraft) {
                    throw new Error('Draft not found');
                }
                if (existingDraft.userId !== user.uid) {
                    throw new Error('You can only edit your own drafts');
                }

                const entryToUpdate = {
                    ...this.draftQuizEntry,
                    userId: user.uid,
                    userEmail: user.email,
                    isAnonymous: user.isAnonymous,
                    status: 'draft',
                    timestamp: serverTimestamp(),
                };

                console.log('Updating draft entry:', entryToUpdate);
                const docRef = doc(db, 'quizEntries', draftId);
                await setDoc(docRef, entryToUpdate, { merge: true });
                console.log('Document updated:', draftId);

                this.saveStatus = {
                    message: 'Draft updated successfully!',
                    type: 'success',
                    show: true
                };
                return draftId;
            } catch (e) {
                console.error('Error updating draft:', e);
                this.saveStatus = {
                    message: 'Error updating draft: ' + e.message,
                    type: 'error',
                    show: true
                };
                throw e;
            }
        },

        async submitForReview(draftId) {
            try {
                const user = auth.currentUser;
                if (!user) throw new Error('No user found');
                if (user.isAnonymous) throw new Error('Must be signed in to submit for review');

                const docRef = doc(db, 'quizEntries', draftId);
                await setDoc(docRef, {
                    status: 'pending',
                    timestamp: serverTimestamp(),
                }, { merge: true });

                this.saveStatus = {
                    message: 'Quiz entry submitted for review!',
                    type: 'success',
                    show: true
                };
                return draftId;
            } catch (e) {
                console.error('Error submitting for review:', e);
                this.saveStatus = {
                    message: 'Error submitting: ' + e.message,
                    type: 'error',
                    show: true
                };
                throw e;
            }
        },

        updateDraftQuizEntry(entry) {
            const currentId = this.draftQuizEntry.id;
            this.draftQuizEntry = { 
                ...this.draftQuizEntry, 
                ...entry,
                id: entry.id || currentId // Keep existing ID if new entry doesn't have one
            };
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
