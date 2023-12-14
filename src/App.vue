<template>
  <div class="container  text-center">
    <div class="w-1/12 text-center">
      <img alt="studying icon" src="./assets/study.png">
      <h2>Science of Reading Quizzes</h2>
    </div>
  </div>

  <div class="w-full md:w-9/12 lg:w-5/6 px-4 quizzes-container text-center border-2 border-solid">
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
