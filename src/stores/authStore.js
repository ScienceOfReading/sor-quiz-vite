import { defineStore } from 'pinia';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAnonymous: (state) => state.user?.isAnonymous ?? true,
    canEdit: (state) => state.user && !state.user.isAnonymous,
  },

  actions: {
    async init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user;
          this.loading = false;
          resolve(user);
        });
      });
    },

    async signInAnonymously() {
      try {
        if (!auth.currentUser) {
          const credential = await signInAnonymously(auth);
          this.user = credential.user;
          return credential.user;
        }
        return auth.currentUser;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async registerWithEmail(email, password) {
      try {
        this.error = null;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        return userCredential.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async loginWithEmail(email, password) {
      try {
        this.error = null;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        return userCredential.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async loginWithGoogle() {
      try {
        this.error = null;
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        this.user = userCredential.user;
        return userCredential.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    },

    async logout() {
      try {
        await signOut(auth);
        // After logout, sign in anonymously
        await this.signInAnonymously();
      } catch (error) {
        this.error = error.message;
        throw error;
      }
    }
  }
});
