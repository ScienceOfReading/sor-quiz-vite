<template>
  <div class="w-full place-content-center">
    <span class="lg:text-3xl sm:text-2xl">Science of Reading Quizzes</span>
    <p v-if="!showResults">{{ itemNum + 1 }} / {{ this.quizItems.length }}</p>
  </div>

  <div v-if="showResults"
    class="sm:w-full md:w-9/12 lg:w-5/6 px-2 quizzes-container text-center border-solid bodrder-stone-400">
    <h5 class="text-stone-400 pt-2"></h5>
    <p class="question-text mb-2">Results</p>

    <div class="grid quiz-item w-full border-4 place-self-center place-content-center text-center">
      <p class="mt-20">You got </p>
      <p class="text-3xl"> {{ numCorrect() }} of {{ this.quizItems.length }}</p>
      <p class="mb-20">correct.</p>
    </div>
  </div>
  <div v-else class="sm:w-full md:w-9/12 lg:w-5/6 lg:px-4 quizzes-container text-center">
    <QuizItem :quizItem="this.quizItems[itemNum]" :itemNum="itemNum" :reviewMode="reviewMode" :basicMode="basicMode"
      @selected="answerSelected" />
  </div>


  <div v-if="reviewMode && complete" class="mt-6">We're done!! Thank you!</div>
  <div v-else-if="showResults">

    <button class="bg-stone-400 h-10 mt-6 text-amber-400" @click="startReview">Let's see what's happening.</button>
  </div>
  <div v-else-if="!basicMode && chosen && complete && !reviewMode">
    <p v-if="!basicMode && chosen && complete && !reviewMode">No more questions...</p>
    <button v-if="!basicMode && chosen && complete && !reviewMode" class="bg-stone-400 w-32 h-10 mt-6 text-amber-400"
      @click="submit">Submit</button>
  </div>
  <div v-else-if="basicMode && chosen">
    <button class="bg-stone-400 w-32 h-10 mt-6 text-amber-400" @click="checkIt">Check it</button>
  </div>
  <div v-else>
    <button class="bg-stone-400 w-32 h-10 mt-6 text-amber-400" @click="nextItem">Next</button>

  </div>
</template>

<script>
import QuizItem from './QuizItem.vue';
import Score from './Score.vue';
import { quizEntries } from '../data/quiz-items.js'
import { quizSets } from '../data/quizSets.js'

export default {
  name: 'Quiz',
  components: {
    QuizItem
  },
  props: {
    selectedQuiz: {
      type: Number,
      required: true
    }
  },
  data() {
    console.log("Data item:");
    //console.log(quizItems[0]);
    const quizChoice = 1;
    const numCompleted = 0;
    const complete = false;
    const userAnswers = [];
    const chosen = false;
    const showResults = false;
    const reviewMode = false;
    const basicMode = false;
    const quizItems = [];
    const reviewing = false;
    const itemNum = 0;

    return {
      quizItems: quizItems,
      numCompleted: numCompleted,
      userAnswers: userAnswers,
      complete: complete,
      chosen: chosen,
      showResults: showResults,
      reviewMode: reviewMode,
      reviewing: reviewing,
      itemNum: itemNum,
      basicMode: basicMode
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
      console.log("quizSets: ", quizSets[this.selectedQuiz])
      let quizSetItems = [];
      for (let i = 0; i < quizSets[this.selectedQuiz].items.length; i++) {
        console.log("In for loop", quizSets[this.selectedQuiz].items[i])
        quizSetItems[i] = quizEntries[quizSets[this.selectedQuiz].items[i]];
      }
      this.quizItems = quizSetItems;
      this.basicMode = quizSets[this.selectedQuiz].basicMode;

      console.log("in buildQuizSet, this.basicMode: ", this.basicMode)
      console.log("Returning quizItems: ", this.quizItems)
      // return quizItems;
    },
    numCorrect() {
      let correct = 0;
      console.log("Length ", this.quizItems.length);
      for (let i = 0; i < this.quizItems.length; i++) {
        console.log(this.quizItems[i].correctAnswer)
        console.log("this.$userAnswers[i]this.$userAnswers[i]", this.$userAnswers[i]);
        console.log("this.quizItems[i].correctAnswer: ", this.quizItems[i].correctAnswer);
        if (this.$userAnswers[i] == this.quizItems[i].correctAnswer) { correct++ }
        console.log("got one right")
      }
      console.log("--FInished numCorrect--");
      return correct
    },

    nextItem() {

      //this.reviewMode = false;
      this.itemNum = this.itemNum + 1;

      if (this.basicMode && this.reviewing) { this.reviewing = false; this.reviewMode = false }
      else if (this.basicMode == false && this.reviewing) { this.reviewing = true; this.reviewMode = true; }
      console.log("In nextItem, userAnswers: ", this.$userAnswers)
      console.log("Next. itemNum is now: ", this.itemNum);
      console.log("length: ", this.quizItems.length);
      this.numCompleted = this.numCompleted + 1;
      console.log("numCompleted: ", this.numCompleted);
      if (this.itemNum == this.quizItems.length - 1) { this.complete = true }
      else { this.complete = false }
      console.log("Complete? ", this.complete)
      this.chosen = false;
      console.log("Reviewing: ", this.reviewing, "; reviewMode: ", this.reviewMode);

    },
    checkIt() {
      if (this.basicMode) {
        if (this.reviewing == true) {
          this.itemNum = this.itemNum + 1;
          this.reviewing = false;
          this.chosen = false;
        }
        else {
          //don't change correntItem; just enter reviewMode
          this.reviewing = true
        }
        this.reviewMode = !this.reviewMode;
      }
      else {
        this.itemNum = this.itemNum + 1;
      }
      console.log("In checkIt, userAnswers: ", this.$userAnswers)
      console.log("In checkIt, itemNum is now: ", this.itemNum);
      console.log("length: ", this.quizItems.length);
      //this.numCompleted = this.numCompleted + 1;
      console.log("numCompleted: ", this.numCompleted);
      if (this.itemNum == this.quizItems.length - 1) { this.complete = true }
      else { this.complete = false }
      console.log("In checkIt, complete: ", this.complete)
      this.chosen = false;
      console.log("In checkIt, Reviewing: ", this.reviewing, "; reviewMode: ", this.reviewMode);
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
      console.log("----Start Review----")
      console.log("In StartReview,  this.itemNum: ", this.itemNum)
      console.log("In startReview, Reviewing: ", this.reviewing, "; reviewMode: ", this.reviewMode);
      this.showResults = false;

      this.itemNum = 0;
      this.numCompleted = 1;
      console.log("In StartReview, this.itemNum: ", this.itemNum)
      setTimeout(console.log("In startReview, Reviewing: ", this.reviewing, "; reviewMode: ", this.reviewMode), 3000);
      setTimeout(this.reviewMode = true, 3000);
      this.reviewMode = true;
      this.reviewing = true;
      console.log("In startReview, Reviewing: ", this.reviewing, "; reviewMode: ", this.reviewMode);
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
