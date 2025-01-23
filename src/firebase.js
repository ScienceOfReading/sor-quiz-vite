// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const saveUserProgress = async (quizId, progress) => {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.log('No user found, progress will not be saved');
            return;
        }

        const progressRef = doc(db, 'userProgress', `${userId}_${quizId}`);
        await setDoc(progressRef, {
            userId,
            quizId,
            isAnonymous: auth.currentUser.isAnonymous,
            ...progress,
            lastUpdated: serverTimestamp()
        }, { merge: true });
        console.log('Progress saved:', progressRef.id);
    } catch (error) {
        console.error('Error saving progress:', error);
        // Don't throw error for anonymous users to avoid disrupting the quiz experience
        if (!auth.currentUser?.isAnonymous) {
            throw error;
        }
    }
};

export { db, auth };
