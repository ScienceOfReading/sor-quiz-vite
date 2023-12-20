<template>
  <div class="w-full place-content-center">

    <span class="lg:text-3xl sm:text-2xl">Science of Reading Quizzes</span>
  </div>

  <div v-if="showResults"
    class="sm:w-full md:w-9/12 lg:w-5/6 px-2 quizzes-container text-center border-solid bodrder-stone-400">
    <h5 class="text-stone-400 pt-2"></h5>
    <p class="question-text mb-2">Results</p>

    <div class="grid quiz-item w-full border-4 place-self-center place-content-center text-center">
      <p class="mt-20">You got </p>
      <p class="text-3xl">3 of 10</p>
      <p class="mb-20">correct.</p>
    </div>
  </div>
  <div v-else class="sm:w-full md:w-9/12 lg:w-5/6 lg:px-4 quizzes-container text-center">
    <QuizItem :quizItem="quizItems[currentItem]" :itemNum="currentItem" :reviewMode="reviewMode"
      @selected="answerSelected" />
  </div>


  <div v-if="showResults">

    <button class="bg-stone-400 h-10 mt-6 text-amber-400" @click="startReview">Let's see what's happening.</button>
  </div>
  <div v-else>
    <p v-if="chosen && complete && !reviewMode">No more questions...</p>
    <button v-if="chosen && complete && !reviewMode" class="bg-stone-400 w-32 h-10 mt-6 text-amber-400"
      @click="submit">Submit</button>
    <button v-else class="bg-stone-400 w-32 h-10 mt-6 text-amber-400" @click="nextItem">Next</button>

  </div>
</template>

<script>
import QuizItem from './components/QuizItem.vue';
import Score from './components/Score.vue';
import { quizItems } from '../data/quiz-items.js'

export default {
  name: 'App',
  components: {
    QuizItem
  },
  data() {
    console.log("Data item:");
    console.log(quizItems[0]);
    const currentItem = 0;
    const complete = false;
    const userAnswers = [];
    const chosen = false;
    const showResults = false;
    const reviewMode = false;

    return {
      quizItems: quizItems,
      currentItem: currentItem,
      userAnswers: userAnswers,
      complete: complete,
      chosen: chosen,
      showResults: showResults,
      reviewMode: reviewMode
    }
  },
  methods: {
    nextItem() {
      this.currentItem = this.currentItem + 1;
      console.log("Next. CurrentItem is now: ", this.currentItem);
      console.log("length: ", quizItems.length)
      if (this.currentItem == quizItems.length - 1) { this.complete = true }
      else { this.complete = false }
      console.log(this.complete)
      this.chosen = false;
    },
    answerSelected() {
      this.chosen = true;
    },
    submit() {
      console.log("Complete. Let's see your score. ");
      this.showResults = true;

    },
    startReview() {
      this.showResults = false;
      this.reviewMode = true;
      this.currentItem = 0;
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
