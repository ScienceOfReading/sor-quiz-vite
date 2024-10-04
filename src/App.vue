<template>
  <div v-if="showQuizzes">

    <div class="w-full place-content-center">

      <span class="lg:text-3xl sm:text-2xl">Science of Reading Quizzes</span>
    </div>
    <div class="sm:w-full md:w-9/12 lg:w-5/6 lg:px-4 quizzes-container text-center">
      <div class="mt-24 grid quiz-item w-full border-4 place-self-center place-content-center text-center">
        <p class="h2 mt-8">We're just getting started, but for now...</p>
        <p class="h2">Choose a difficulty:</p>
        <div class="mt-8 mb-2 gap-16 columns-2">
          <div><button @click="showQuiz(0)" class="lg:text-3xl sm:text-2xl">Expert</button></div>
          <div><button @click="showQuiz(1)" class="lg:text-3xl sm:text-2xl">Basic</button></div>
        </div>
        <div class="mt-2 mb-8 gap-16 columns-2">
          <div><button @click="showQuiz(2)"
              class="place-self-center place-content-centerlg:text-3xl sm:text-2xl">Kinder-First</button></div>
          <div><button @click="showQuiz(3)" class="place-self-center place-content-centerlg:text-3xl sm:text-2xl">Admin,
              Board Members</button></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Quiz :selectedQuiz="selectedQuiz"></Quiz>
  </div>
</template>

<script>
import Quiz from './components/Quiz.vue';

import { quizSets } from '../data/quizSets.js'

export default {
  name: 'App',
  components: {
    Quiz
  },
  data() {
    console.log("Data item:");
    const showQuizzes = true;
    const selectedQuiz = 100000;

    return {
      quizSets: quizSets,
      showQuizzes: showQuizzes,
      selectedQuiz: selectedQuiz
    }
  },
  computed: {

  },
  methods: {
    showQuiz(quizNum) {
      console.info("Quiz selected: ", quizNum)
      this.showQuizzes = false;
      this.selectedQuiz = quizNum;
    }
  },
  created() {

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
  margin-top: 20px;
}

.lead-image {
  width: 50;
  height: 50;
}

.quizzes-container {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-evenly;
  flex-flow: column nowrap;
}

.quiz-item {
  border-style: solid;
  border-top-right-radius: 2dvw;
  border-radius: 2dvw;

}

.app-title {}
</style>
