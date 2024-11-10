<template>
  <div class="w-full place-content-center">
    <span class="lg:text-3xl sm:text-2xl">Science of Reading Quizzes</span>
    <p v-if="!showResults">{{ numCompleted + 1 }} / {{ this.quizItems.length }}</p>
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
    <QuizItem :currentQuizItem="currentQuizItem" :itemNum="itemNum" :reviewMode="reviewMode" :basicMode="basicMode"
      v-model:userAnswer="userAnswers[itemNum]" @selected="chosen = true" />
  </div>


  <div v-if="reviewMode && complete" class="mt-6">
    We're done!! Thank you!
    <button class="bg-stone-400 h-10 mt-6 text-amber-400" @click="showOriginalView">Return to Quizzes</button>
  </div>
  <div v-else-if="showResults">

    <button class="bg-stone-400 h-10 mt-6 text-amber-400" @click="startReview">Let's see what's happening.</button>
  </div>
  <div v-else-if="!basicMode && chosen && complete && !reviewMode">
    <p v-if="!basicMode && chosen && complete && !reviewMode">No more questions...</p>
    <button class="bg-stone-400 w-32 h-10 mt-6 text-amber-400" @click="submit">Submit</button>
  </div>
  <div v-else-if="basicMode && chosen">
    <button class="bg-stone-400 w-32 h-10 mt-6 text-amber-400" @click="checkIt">
      {{ reviewMode ? 'Next' : 'Check it' }}
    </button>
  </div>
  <div v-else-if="basicMode && !reviewMode && !chosen">
    <button class="bg-stone-400 w-32 h-10 mt-6 text-amber-400" @click="checkIt">&nbsp;</button>
  </div>
  <div v-else>
    <button class="bg-stone-400 w-32 h-10 mt-3 mb-3 text-amber-400" @click="nextItem">Next</button>

  </div>
</template>

<script>
import QuizItem from './QuizItem.vue';
import { quizEntries } from '../data/quiz-items.js'
import { quizSets } from '../data/quizSets.js'
import { quizStore } from '../stores/quizStore'; // Import the store
import { ref, onMounted } from 'vue'
import { saveUserProgress } from '../firebase';

export default {
  name: 'Quiz',
  emits: ['change-view'],
  components: {
    QuizItem
  },
  props: {
    selectedQuiz: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = quizStore();

    onMounted(() => {
      store.setCurrentQuiz(props.selectedQuiz);
    });

    return {
      store
    }
  },
  data() {
    console.log("Data item:");
    //console.log(quizItems[0]);
    const quizChoice = 1;

    return {
      quizItems: [],
      numCompleted: 0,
      userAnswers: [],
      complete: false,
      chosen: false,
      showResults: false,
      reviewMode: false,
      itemNum: 0,
      basicMode: false
    }
  },
  computed: {
    currentQuizItem() {
      console.log("In currentQuizItem, itemNum is: ", this.itemNum);
      console.log("In currentQuizItem, quizItems is: ", this.quizItems);
      console.log("In currentQuizItem, quizItems[itemNum] is: ", this.quizItems[this.itemNum]);
      return this.quizItems[this.itemNum];
    }
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

    async nextItem() {
      try {
        const currentQuestion = this.quizItems[this.itemNum];
        const selectedAnswer = this.userAnswers[this.itemNum];
        const correctAnswer = currentQuestion.correctAnswer;
        const questionId = currentQuestion.id;
        const questionTitle = currentQuestion.title;

        console.log('Next Item Answer Check:', {
          questionNumber: this.itemNum,
          questionId: questionId,
          questionTitle: questionTitle,
          selectedAnswer: selectedAnswer,
          correctAnswer: correctAnswer
        });

        // Save to store with correctness, ID, and title
        await this.store.setUserAnswer(
          this.itemNum,
          selectedAnswer,
          correctAnswer,
          questionId,
          questionTitle,
          currentQuestion
        );

        // Save progress
        await saveUserProgress(this.selectedQuiz, {
          lastQuestionAnswered: this.itemNum,
          userAnswers: this.store.userAnswers,
          incorrectQuestions: this.store.incorrectQuestions,
          totalCorrect: this.store.userAnswers.filter(a => a.correct).length,
          totalAnswered: this.store.userAnswers.length,
          timestamp: new Date()
        });

        // Advance to next question
        if (this.itemNum < this.quizItems.length - 1) {
          this.itemNum++;
          this.chosen = false;
          this.reviewMode = false;
        } else {
          this.complete = true;
          this.showResults = true;
        }
      } catch (error) {
        console.error("Error in nextItem method:", error);
      }
    },
    async checkIt() {
      try {
        const currentQuestion = this.quizItems[this.itemNum];
        if (!currentQuestion) {
          console.error('No question found for index:', this.itemNum);
          return;
        }

        // Debug logging
        console.log('Current question:', {
          type: currentQuestion.answer_type,
          itemNum: this.itemNum,
          question: currentQuestion
        });

        let selectedAnswer;
        if (currentQuestion.answer_type === 'sortableList') {
          // Debug what's available
          console.log('Sortable list state:', {
            items: this.items,
            userAnswers: this.userAnswers,
            currentOrder: this.currentOrder, // if you're using this
            sortableItems: this.sortableItems // or this
          });

          // Try different possible properties where the order might be stored
          selectedAnswer = this.items ||
            this.currentOrder ||
            this.sortableItems ||
            this.userAnswers[this.itemNum];

          console.log('Selected sortable answer:', selectedAnswer);
        } else {
          selectedAnswer = this.userAnswers[this.itemNum];
        }

        // More detailed validation
        if (!selectedAnswer) {
          console.error('No valid answer for question:', {
            itemNum: this.itemNum,
            questionType: currentQuestion.answer_type,
            availableData: {
              items: this.items,
              userAnswers: this.userAnswers,
              currentOrder: this.currentOrder,
              sortableItems: this.sortableItems
            }
          });
          return;
        }

        const questionData = {
          selectedAnswer,
          correctAnswer: currentQuestion.correctAnswer || '',
          questionId: currentQuestion.id || '',
          questionTitle: currentQuestion.title || '',
          quizEntry: currentQuestion
        };

        console.log('About to save answer:', questionData);

        await this.store.setUserAnswer(
          this.itemNum,
          questionData.selectedAnswer,
          questionData.correctAnswer,
          questionData.questionId,
          questionData.questionTitle,
          questionData.quizEntry
        );

        if (this.basicMode) {
          this.reviewMode = !this.reviewMode;
          if (!this.reviewMode) {
            this.itemNum++;
            this.chosen = false;
          }
        }

      } catch (error) {
        console.error("Error in checkIt method:", error, {
          currentQuestion: this.quizItems[this.itemNum],
          itemNum: this.itemNum,
          userAnswers: this.userAnswers
        });
      }
    },
    answerSelected() {
      console.log("In answerSelected");
      // No need to set chosen here, it's handled in the event listener
    },
    submit() {
      console.log("Complete. Let's see your score. ");
      this.showResults = true;
      this.complete = false

    },
    startReview() {
      console.log("----Start Review----")
      this.showResults = false;
      this.itemNum = 0;
      this.numCompleted = 1;
      this.reviewMode = true;
      console.log("Review started. itemNum:", this.itemNum,
        "reviewMode:", this.reviewMode);
    },
    showOriginalView() {
      this.$emit('change-view', { showQuizzes: true }); // Emit an event with the new state
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
</style>
