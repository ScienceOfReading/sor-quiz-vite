<template>
  <div>
    <h1>Suggest a New Quiz Entry</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="newEntry.title" required />
      </div>
      <div>
        <label for="question">Question:</label>
        <textarea v-model="newEntry.Question" required></textarea>
      </div>
      <div>
        <label for="correctAnswer">Correct Answer:</label>
        <input type="number" v-model="newEntry.correctAnswer" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase'; // Adjust the path as necessary
import { collection, addDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      newEntry: {
        title: '',
        Question: '',
        correctAnswer: null,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const docRef = await addDoc(collection(db, 'quizEntries'), this.newEntry);
        console.log('Document written with ID: ', docRef.id);
        // Optionally, redirect or show a success message
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
