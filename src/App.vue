<template>
  <div class="w-full place-content-center">

    <span class="app-title">Science of Reading Quizzes</span>
  </div>

  <div class="sm:w-full md:w-9/12 lg:w-5/6 px-4 quizzes-container text-center border-solid bodrder-stone-400">
    <QuizItem :quizItem="quizItems[currentItem]" :itemNum="currentItem" @selected="answerSelected" />
  </div>
  <div>
    <p v-if="chosen && complete">No more questions...</p>
    <button v-if="chosen && complete" class="bg-stone-400 w-32 h-10 mt-6 text-amber-400" @click="submit">Submit</button>
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
    return {
      quizItems: quizItems,
      currentItem: currentItem,
      userAnswers: userAnswers,
      complete: complete,
      chosen: chosen
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
      this.$navigateTo(Score);
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

.app-title {
  font-size: 2rem;
}
</style>
