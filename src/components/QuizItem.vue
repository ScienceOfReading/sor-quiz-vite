<template>
  <div class="w-full place-content-center mx-auto">

    <div v-if="quizItem.answer_type == 'tf'">
      Handle a true/false question here.</div>
    <div v-else-if="quizItem.answer_type == 'sortable'">
      <SortableList :title="quizItem.title" :instructions="quizItem.instructions" :items="quizItem.items"
        :correctOrder="quizItem.correctOrder" :disabled="reviewMode" :topLabel="quizItem.topLabel"
        :bottomLabel="quizItem.bottomLabel" @order-changed="handleOrderChanged" />
    </div>
    <div v-else class="grid quiz-item w-full border-4 place-self-center place-content-center text-center">
      <h5 class="text-stone-400 lg:pt-2">{{ quizItem.title }}</h5>
      <p class="question-text mb-2">Q: {{ quizItem.Question }}</p>
      <p class="question-text mb-2"> {{ quizItem.questionP2 }}</p>

      <ul class="lg:w-2/3 place-self-center mb-8">
        <li :class="{ [`bg-stone-400 border-amber-500`]: highlighted[1], ['border-green-400']: greenOutline[0] }"
          class="flex flex-row min-h-14 answer" @click="select(1)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[0]"></OptionIcon>
          </div>
          <div class="list-item-right">{{ quizItem.option1 }}
          </div>
          <div v-if="greenOutline[0]" class="p-0 m-0">
            <Vue3Lottie autoplay loop mode="normal" :animationData="fireworksJSON" style="width: 70px" class="m-0 p-0">
            </Vue3Lottie>
          </div>
        </li>

        <li :class="{ [`bg-stone-400 border-amber-500`]: highlighted[2], ['border-green-400']: greenOutline[1] }"
          @click="select(2)" class="flex flex-row border-solid rounded-lg min-h-14 answer ">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[1]"></OptionIcon>
          </div>
          <div class="list-item-right"> {{ quizItem.option2 }}</div>
          <div v-if="greenOutline[1] && highlighted[2]" class="p-0">
            <Vue3Lottie autoplay loop mode="normal" :animationData="fireworksJSON" style="width: 70px" class="m-0 p-0">
            </Vue3Lottie>
          </div>
        </li>

        <li v-if="quizItem.option3"
          :class="{ [`bg-stone-400 border-amber-500`]: highlighted[3], ['border-green-400']: greenOutline[2] }"
          class="flex flex-row min-h-14 answer" @click="select(3)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[2]"></OptionIcon>
          </div>
          <div class="list-item-right">{{ quizItem.option3 }}</div>
          <div v-if="greenOutline[2] && highlighted[3]" class="">
            <div class="bg-stone-400/25 ">
              <Vue3Lottie autoplay loop mode="normal" :animationData="fireworksJSON" style="width: 70px"
                class="m-0 p-0 bg-white">
              </Vue3Lottie>
            </div>
          </div>
        </li>

        <li v-if="quizItem.option4"
          :class="{ [`bg-stone-400 border-amber-500`]: highlighted[4], ['border-green-400']: greenOutline[3] }"
          class="flex flex-row min-h-14 answer" @click="select(4)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[3]"></OptionIcon>
          </div>
          <div class=" list-item-right">{{ quizItem.option4 }}
          </div>
          <div v-if="greenOutline[3] && highlighted[4]" class="p-0">
            <Vue3Lottie autoplay loop mode="normal" :animationData="fireworksJSON" style="width: 70px" class="m-0 p-0">
            </Vue3Lottie>
          </div>
        </li>
        <li v-if="quizItem.option5"
          :class="{ [`bg-stone-400 border-amber-500`]: highlighted[5], ['border-green-400']: greenOutline[4] }"
          class="flex flex-row min-h-14 answer" @click="select(5)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[4]"></OptionIcon>
          </div>
          <div class="list-item-right">{{ quizItem.option5 }}</div>
          <div v-if="greenOutline[4] && highlighted[5]" class="p-0">
            <Vue3Lottie autoplay loop mode="normal" :animationData="fireworksJSON" style="width: 70px" class="m-0 p-0">
            </Vue3Lottie>
          </div>
        </li>
        <li v-if="quizItem.option6"
          :class="{ [`bg-stone-400 border-amber-500`]: highlighted[6], ['border-green-400']: greenOutline[5] }"
          class="flex flex-row min-h-14 answer" @click="select(6)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[5]"></OptionIcon>
          </div>
          <div class="list-item-right">{{ quizItem.option6 }}</div>
          <div v-if="greenOutline[5] && highlighted[6]" class="p-0">
            <Vue3Lottie autoplay loop mode="normal" :animationData="fireworksJSON" style="width: 70px" class="m-0 p-0">
            </Vue3Lottie>
          </div>
        </li>
      </ul>
    </div>
    <Explanation :quizItem="quizItem" :reviewMode="reviewMode" :userAnswer="userAnswer" ref="explanationComponent" />

  </div>
</template>

<script>
import OptionIcon from "./OptionIcon.vue";
import fireworksJSON from '../lottie/fireworks.json'
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
    OptionIcon,
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
      optionsStatus: Array(6).fill(1),
      fireworksJSON
    }
  },
  mounted() {
    if (this.reviewMode) {
      this.highlighted[this.$userAnswers[this.itemNum]] = true;
      this.optionsStatus = [2, 2, 2, 2, 2, 2];
      console.log("in QuizItem mounted(), this.$userAnswers", this.$userAnswers, "this.itemNum", this.itemNum, "this.$userAnswers[this.itemNum]", this.$userAnswers[this.itemNum]);
      this.optionsStatus[this.$userAnswers[this.itemNum] - 1] = 5;
      this.optionsStatus[this.quizItem.correctAnswer - 1] = 4;
      this.greenOutline[this.quizItem.correctAnswer - 1] = true;
      console.log("in QuizItem mounted(), highlighted: ", this.highlighted);
      console.log("in QuizItem mounted(), optionsStatus: ", this.optionsStatus);
      console.log("in QuizItem mounted(),this.greenOutline: ", this.greenOutline);
    }
  },

  methods: {
    select(option) {
      console.log("Selected: ", option);
      this.highlighted = [false, false, false, false, false, false];
      this.highlighted[option] = true
      this.$userAnswers[this.itemNum] = option;
      this.optionsStatus[option - 1] = 3;
      console.log("In QuizItem, this.$userAnswers is now ", this.$userAnswers)
      this.$emit('selected')
    },
    onHover() {
      console.log("Hovered");
    },
    handleOrderChanged(newOrder) {
      this.userAnswer = newOrder;
      this.$emit('selected');
      this.explanationComponent.checkAnswer();
    },
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
      explanationComponent
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