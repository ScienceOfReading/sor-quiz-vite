<template>
  <img alt="studying icon" src="./assets/study.png" height="150">
  <h2>Science of Reading Quizzes</h2>
  <div class="w-full lg:w-6/12 px-4 quizzes-container">
    <QuizItem :quizItems="quizItems" />
  </div>
</template>

<script>
import QuizItem from './components/QuizItem.vue';
import { quizItems } from '../data/quiz-items.js'

export default {
  name: 'App',
  components: {
    QuizItem
  },
  data() {
    console.log("Data item:");
    console.log(quizItems[0]);

    return {
      quizItems: quizItems
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50; */
  margin-top: 60px;
}

.lead-image {
  width: 50;
  height: 50;
}

.quizzes-container {
  display: flex;
  margin-left: 120px;
  margin-right: 120px;
  justify-content: space-evenly;
  flex-flow: column nowrap;
}
</style>
