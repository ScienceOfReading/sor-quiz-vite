<template>
  <div class="w-full place-content-center mx-auto">

    <div v-if="quizItem.answer_type == 'tf'">
      Handle a true/false question here.</div>
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
          <div v-if="greenOutline[0]" class="p-0"><lottie-player autoplay loop mode="normal"
              src="https://lottie.host/04d9a56b-e383-4605-9749-915cae256759/SRskGhnVY5.json" style="width: 70px"
              class="m-0 p-0"></lottie-player></div>
        </li>
        <li :class="{ [`bg-stone-400 border-amber-500`]: highlighted[2], ['border-green-400']: greenOutline[1] }"
          @click="select(2)" class="flex flex-row border-solid rounded-lg min-h-14 answer ">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[1]"></OptionIcon>
          </div>
          <div class="list-item-right"> {{ quizItem.option2 }}</div>
          <div v-if="greenOutline[1] && highlighted[2]" class="p-0"><lottie-player autoplay loop mode="normal"
              src="https://lottie.host/04d9a56b-e383-4605-9749-915cae256759/SRskGhnVY5.json" style="width: 70px"
              class="m-0 p-0"></lottie-player></div>
        </li>
        <li v-if="quizItem.option3"
          :class="{ [`bg-stone-400 border-amber-500`]: highlighted[3], ['border-green-400']: greenOutline[2] }"
          class="flex flex-row min-h-14 answer" @click="select(3)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[2]"></OptionIcon>
          </div>
          <div class="list-item-right">{{ quizItem.option3 }}</div>
          <div v-if="greenOutline[2] && highlighted[3]" class="p-0"><lottie-player autoplay loop mode="normal"
              src="https://lottie.host/04d9a56b-e383-4605-9749-915cae256759/SRskGhnVY5.json" style="width: 70px"
              class="m-0 p-0"></lottie-player></div>
        </li>
        <li v-if="quizItem.option4"
          :class="{ [`bg-stone-400 border-amber-500`]: highlighted[4], ['border-green-400']: greenOutline[3] }"
          class="flex flex-row min-h-14 answer" @click="select(4)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[3]"></OptionIcon>
          </div>
          <div class=" list-item-right">{{ quizItem.option4 }}
          </div>
          <div v-if="greenOutline[3] && highlighted[4]" class="p-0"><lottie-player autoplay loop mode="normal"
              src="https://lottie.host/04d9a56b-e383-4605-9749-915cae256759/SRskGhnVY5.json" style="width: 70px"
              class="m-0 p-0"></lottie-player></div>
        </li>
        <li v-if="quizItem.option5"
          :class="{ [`bg-stone-400 border-amber-500`]: highlighted[5], ['border-green-400']: greenOutline[4] }"
          class="flex flex-row min-h-14 answer" @click="select(5)">
          <div class="list-asking">
            <OptionIcon :status="optionsStatus[4]"></OptionIcon>
          </div>
          <div class="list-item-right">{{ quizItem.option5 }}</div>
          <div v-if="greenOutline[4] && highlighted[5]" class="p-0"><lottie-player autoplay loop mode="normal"
              src="https://lottie.host/04d9a56b-e383-4605-9749-915cae256759/SRskGhnVY5.json" style="width: 70px"
              class="m-0 p-0"></lottie-player></div>
        </li>
      </ul>
    </div>
    <div :class="{ [`hidden`]: !reviewMode }"
      class="border-yellow-500 rounded-md explanation p-4 lg:mt-4 sm:mt-2 place-self-center lg:ml-20 lg:w-5/6">
      <p class="text-amber-700 mb-4">{{ quizItem.explanation }}
        <!--a href="https://youtu.be/Nh3r2WZs2P8?si=9wZ9XWrCTioUaVkG">Phoneme Addition</a-->
      </p>
      <p class="text-amber-700">{{ quizItem.explanation2 }}
      </p>
      <p class="text-amber-700 mt-2 text-sm">{{ quizItem.ref1 }}
      </p>
      <p class="text-amber-700 text-sm">{{ quizItem.ref2 }}
      </p>
      <p class="text-amber-700 mb-8 text-sm">{{ quizItem.ref3 }}
      </p>
      <p><a
          href="https://www.researchgate.net/profile/Matthew-Burns-10/publication/321116132_Meta-analysis_of_targeted_small-group_reading_interventions/links/5ab162340f7e9b4897c39acd/Meta-analysis-of-targeted-small-group-reading-interventions.pdf">{{
            quizItem.citation.title }}</a></p>
      <div class="flex flex-row mt-8">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
          <path opacity="1" fill="#FFBF00"
            d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
        </svg> <span class="lg:pl-5 caution-message">{{ quizItem.caution }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import OptionIcon from "./OptionIcon.vue";
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
    OptionIcon
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
    console.log("QuizItem data");
    const highlighted = [false, false, false, false, false, false];
    const greenOutline = [false, false, false, false, false, false];
    const optionsStatus = [1, 1, 1, 1, 1, 1];
    /*
        if (this.reviewMode && this.itemNum == 0) {
          console.log("display for reviewMode")
          highlighted[this.$userAnswers[0]] = true;
          optionsStatus = [2, 2, 2, 2, 2, 2];
          console.log("In QuizItem data, this.$userAnswers", this.$userAnswers);
          optionsStatus[this.$userAnswers[0] - 1] = 5;
          optionsStatus[this.quizItem.correctAnswer - 1] = 4;
          console.log("highlighted: ", highlighted);
        }
        else { console.log("In selection mode"); }
    */
    return {
      highlighted: highlighted,
      greenOutline: greenOutline,
      optionsStatus: optionsStatus
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
    }
  }
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
