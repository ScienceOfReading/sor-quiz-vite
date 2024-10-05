<template>
  <div class="w-full place-content-center mx-auto">
    <!-- Display the question for all question types -->
    <h2 class="text-xl font-bold mb-4">{{ quizItem.Question }}</h2>

    <!-- Existing question types -->
    <div v-if="quizItem.answer_type == 'mc'">
      <MultipleChoice :quizItem="quizItem" :reviewMode="reviewMode" :itemNum="itemNum" :basicMode="basicMode"
        :optionsStatus="optionsStatus" :highlighted="highlighted" @answer-selected="handleAnswerSelected" />
    </div>

    <div v-else-if="quizItem.answer_type == 'true_false'">
      <!-- ... true/false content ... -->
    </div>

    <div v-else-if="quizItem.answer_type == 'short_answer'">
      <!-- ... short answer content ... -->
    </div>

    <!-- Sortable list -->
    <div v-else-if="quizItem.answer_type == 'sortable'">
      <SortableList :title="quizItem.title" :instructions="quizItem.instructions" :items="quizItem.items"
        :correctOrder="quizItem.correctOrder" :disabled="reviewMode" :topLabel="quizItem.topLabel"
        :bottomLabel="quizItem.bottomLabel" @order-changed="handleOrderChanged" />
    </div>

    <Explanation :quizItem="quizItem" :reviewMode="reviewMode" :userAnswer="userAnswer" ref="explanationComponent" />

  </div>
</template>

<script>
import MultipleChoice from './MultipleChoice.vue';
import LiteYouTubeEmbed from 'vue-lite-youtube-embed';
import Explanation from './Explanation.vue'; // Add this import
import SortableList from './SortableList.vue';
import { ref } from 'vue';

export default {
  name: 'QuizItem',
  props: {
    quizItem: {
      type: Object,
      required: true
    },
    itemNum: {
      type: Number,
      required: true
    },
    reviewMode: {
      type: Boolean,
      required: true
    },
    basicMode: {
      type: Boolean,
      required: true
    }
  },
  components: {
    MultipleChoice,
    Explanation, // Add this component
    LiteYouTubeEmbed, // Add this component if you're using it
    SortableList,
  },
  computed: {

  },
  watch: {

    itemNum(newItemNum, oldItemNum) {
      console.log("In watcher itemNum, item changed from", oldItemNum, " to ", newItemNum);
      console.log("In watcher itemNum, reviewmode is: ", this.reviewMode)
      this.highlighted = [false, false, false, false, false, false];
      this.greenOutline = [false, false, false, false, false, false];
      console.log("In Watcher, basicMode is: ", this.basicMode, "and reviewMode is: ", this.reviewMode)
      if (this.basicMode == false)
        if (this.reviewMode == false) {
          console.log("In itemNum watcher,selection mode");
          console.log("newItemNum, this.$userAnswers[newItemNum]]: ", this.itemNum, this.$userAnswers[this.itemNum])
          this.optionsStatus = [1, 1, 1, 1, 1, 1];
          console.log("in watcher itemNum, highlighted: ", this.highlighted);
        }
        else {
          console.log("In itemNum watcher,review mode for item: ", this.itemNum);
          this.highlighted[this.$userAnswers[this.itemNum]] = true;
          this.optionsStatus = [2, 2, 2, 2, 2, 2];
          console.log("In itemNum watcher, this.optionsStatus[this.$userAnswers[this.itemNum]]: ", this.optionsStatus[this.$userAnswers[this.itemNum]]);
          this.optionsStatus[this.$userAnswers[this.itemNum] - 1] = 5;
          this.optionsStatus[this.quizItem.correctAnswer - 1] = 4;
          this.highlighted[this.$userAnswers[this.itemNum]] = true;
          this.greenOutline[this.quizItem.correctAnswer - 1] = true;
          console.log("in itemNum watcher, highlighted: ", this.highlighted);
          console.log("in itemNum watcher, optionsStatus: ", this.optionsStatus);
          console.log("in itemNum watcher,this.greenOutline: ", this.greenOutline);
        }
      console.log("Exit itemNum watcher");
    },

    reviewMode(oldStatus, newStatus) {
      console.log("reviewMode changed from ", oldStatus, " to ", newStatus);
      this.highlighted = [false, false, false, false, false, false];
      if (this.reviewMode) {
        this.highlighted[this.$userAnswers[this.itemNum]] = true;
        this.optionsStatus = [2, 2, 2, 2, 2, 2];
        console.log("in reviewMode watcher, this.$userAnswers", this.$userAnswers);
        console.log("in reviewMode watcher, this.itemNum", this.itemNum);
        console.log("in reviewMode watcher, this.$userAnswers[this.itemNum]", this.$userAnswers[this.itemNum]);
        this.optionsStatus[this.$userAnswers[this.itemNum] - 1] = 5;
        this.optionsStatus[this.quizItem.correctAnswer - 1] = 4;
        this.greenOutline[this.quizItem.correctAnswer - 1] = true;
        console.log("in reviewMode watcher, highlighted: ", this.highlighted);
        console.log("in reviewMode watcher, optionsStatus: ", this.optionsStatus);
        console.log("in itemNum watcher,this.greenOutline: ", this.greenOutline);
      }

      else { this.optionsStatus = [1, 1, 1, 1, 1, 1]; }
    }

  },
  data() {
    return {
      highlighted: Array(6).fill(false),
      greenOutline: Array(6).fill(false),
      optionsStatus: Array(6).fill(1)
    }
  },
  mounted() {
    console.log("----QuizItem mounted------")
  },

  methods: {

    onHover() {
      console.log("Hovered");
    },
    handleOrderChanged(newOrder) {
      this.userAnswer = newOrder;
      this.$emit('selected');
      this.explanationComponent.checkAnswer();
    },
    handleAnswerSelected(answerData) {
      // Handle the selected answer and update state accordingly
      console.log('Selected answer:', answerData);
      // Update highlighted, greenOutline, and optionsStatus as needed
    }
  },
  setup(props, { emit }) {
    const userAnswer = ref(null);
    const explanationComponent = ref(null);

    const handleOrderChanged = (newOrder) => {
      userAnswer.value = newOrder;
      emit('selected');
      explanationComponent.value.checkAnswer();
    };

    return {
      userAnswer,
      handleOrderChanged,
      explanationComponent,
      quizItem: props.quizItem,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
}


a {
  color: #42b983;
}

.quiz-item {
  border-style: solid;
  border-top-right-radius: 2dvw;
  border-radius: 2dvw;

}

.question-text {
  margin: 2;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
}

.answer {
  margin: 5px;
  border-radius: 5pt;
  border-style: solid;
  border-width: 2pt;
  text-align: left;
}


.list-asking {

  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  margin-left: 10px;

  color: red;
}

.answer-icon {
  color: aqua;
  height: 25px;
  width: 25px;
  ;
}

.list-item-right {
  /*padding: 5px;
  margin-left: 20px;
  padding-top: 5px;*/
  margin-top: auto;
  margin-bottom: auto;
}

.explanation {
  border-radius: 3pt;
  border-style: solid;
  border-width: 2pt;
}

.p-explanation {
  margin-left: 200px;
  margin-right: 200px;
}

.hidden {
  visibility: hidden;
}

.test-border {
  border: #42b983;
  border-style: solid;
}

.correct-choice {
  color: green;
}

.caution-icon {
  height: 20;
  width: 20;
  color: #FFBF00;
}

.caution-message {
  padding-left: 4;
}

.correct-choice {
  color: green;
}

.incorrect-choice {
  color: red;
}
</style>