<template>
  <div class="w-full place-content-center">

    <span class="app-title">Science of Reading Quizzes</span>
  </div>

  <div class="w-full md:w-9/12 lg:w-5/6 px-4 quizzes-container text-center border-solid bodrder-stone-400">
    <QuizItem :quizItem="quizItems[currentItem]" />
  </div>
  <div>

    <button class="bg-stone-400 w-32 h-10 text-amber-400" @click="nextItem">Next</button>
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
    const currentItem = 0;
    return {
      quizItems: quizItems,
      currentItem: currentItem
    }
  },
  methods: {
    nextItem() {
      this.currentItem = this.currentItem + 1;
      console.log("Next. CurrentItem is now: ", this.currentItem);
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
  margin-right: 120px;
  justify-content: space-evenly;
  flex-flow: column nowrap;
}

.app-title {
  font-size: 2rem;
}
</style>
