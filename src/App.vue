<template>
  <div class="w-full place-content-center">

    <span class="lg:text-3xl sm:text-2xl">Science of Reading Quizzes</span>
    <p v-if="!showResults">{{ numCompleted }} / {{ quizItems.length }}</p>
  </div>

  <div v-if="showResults"
    class="sm:w-full md:w-9/12 lg:w-5/6 px-2 quizzes-container text-center border-solid bodrder-stone-400">
    <h5 class="text-stone-400 pt-2"></h5>
    <p class="question-text mb-2">Results</p>

    <div class="grid quiz-item w-full border-4 place-self-center place-content-center text-center">
      <p class="mt-20">You got </p>
      <p class="text-3xl"> {{ numCorrect() }} of {{ quizItems.length }}</p>
      <p class="mb-20">correct.</p>
    </div>
  </div>
  <div v-else class="sm:w-full md:w-9/12 lg:w-5/6 lg:px-4 quizzes-container text-center">
    <QuizItem :quizItem="quizItems[currentItem]" :itemNum="currentItem" :reviewMode="reviewMode"
      @selected="answerSelected" />
  </div>


  <div v-if="reviewMode && complete" class="mt-6">We're done!! Thank you!</div>
  <div v-else-if="showResults">

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
import { quizEntries } from '../data/quiz-items.js'
import { quizSets } from '../data/quizSets.js'

export default {
  name: 'App',
  components: {
    QuizItem
  },
  data() {
    console.log("Data item:");
    //console.log(quizItems[0]);
    const quizChoice = 1;
    const currentItem = 0;
    const numCompleted = 0;
    const complete = false;
    const userAnswers = [];
    const chosen = false;
    const showResults = false;
    const reviewMode = false;
    const quizItems = [];

    return {
      quizItems: quizItems,
      currentItem: currentItem,
      numCompleted: numCompleted,
      userAnswers: userAnswers,
      complete: complete,
      chosen: chosen,
      showResults: showResults,
      reviewMode: reviewMode
    }
  },
  computed: {
    /* numCorrect() {
       let correct = 0;
       console.log("Length ", quizItems.length);
       for (let i = 0; i < 4; i++) {
         console.log(quizItems[i].correctAnswer)
         if (this.userAnswers[i] == quizItems[i].correctAnswer) { correct++ }
         console.log("got one right")
         return correct
       }
     } */
  },
  methods: {
    buildQuizSet() {
      // Set of 10-ish items
      console.log("Building quiz set");
      console.log("quizSets: ", quizSets[1])
      let quizSetItems = [];
      for (let i = 0; i < quizSets[1].items.length; i++) {
        console.log("In for loop")
        console.log("In for loop", quizSets[1].items[i])
        quizSetItems[i] = quizEntries[quizSets[1].items[i]];
      }
      this.quizItems = quizSetItems;
      console.log("Returning quizItems: ", this.quizItems)
      // return quizItems;
    },
    numCorrect() {
      let correct = 0;
      console.log("Length ", quizItems.length);
      for (let i = 0; i < quizItems.length; i++) {
        console.log(quizItems[i].correctAnswer)
        console.log("this.$userAnswers[i]this.$userAnswers[i]", this.$userAnswers[i]);
        console.log("quizItems[i].correctAnswer: ", quizItems[i].correctAnswer);
        if (this.$userAnswers[i] == quizItems[i].correctAnswer) { correct++ }
        console.log("got one right")
      }
      return correct
    },

    nextItem() {
      //this.buildQuizSet();
      this.currentItem = this.currentItem + 1;
      console.log("Next. CurrentItem is now: ", this.currentItem);
      console.log("length: ", quizItems.length);
      this.numCompleted = this.numCompleted + 1;
      console.log("numCompleted: ", this.numCompleted);
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
      this.complete = false

    },
    startReview() {
      this.showResults = false;
      this.reviewMode = true;
      this.currentItem = 0;
    }
  },
  created() {
    this.buildQuizSet();
    // console.log("In created, ", this.quizItems)
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
