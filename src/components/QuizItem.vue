<template>
  <div class="w-full place-content-center mx-auto">
    <div class="grid quiz-item w-full border-4 place-self-center place-content-center text-center">
      <h5 class="text-stone-400">{{ quizItem.title }}</h5>
      <p class="question-text">Q: {{ quizItem.Question }}</p>
      <ul class="lg:w-96 place-self-center mb-8">
        <li class="flex flex-row p-4 bg-stone-400 answer" @click="optionSelected(1)">
          <div class="list-asking"><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25"
              viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
              <path opacity="1" fill="#1E3050"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg>
          </div>
          <div class="list-item-right">{{ quizItem.option1 }}
          </div>
        </li>
        <li @click="optionSelected(2)"
          class="flex flex-row p-4 bg-stone-400 border-solid border-amber-500 rounded-lg answer ">
          <div class="list-asking"><svg class="answer-icon" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
              <path opacity="1" fill="#1E3050"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg></div>
          <div class=""> {{ quizItem.option2 }}</div>
        </li>
        <li class="flex flex-row p-4 answer" @click="optionSelected(3)">
          <div class="list-asking"><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25"
              viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
              <path opacity="1" fill="#ff0000" stroke="#00ffff"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg></div>
          <div class="list-item-right">{{ quizItem.option3 }}</div>
        </li>
        <li class="flex flex-row p-4 answer" @click="optionSelected(4)">
          <div :class="feedBack" class="list-asking"><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25"
              viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
              <path opacity="1" fill="#1E3050"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
            </svg></div>
          <div class="list-item-right">{{ quizItem.option4 }}</div>
        </li>
      </ul>
      <div class="divide-solid explanation mx-20">
        <p mb-8>{{ quizItem.explanation }} <a href="https://youtu.be/Nh3r2WZs2P8?si=9wZ9XWrCTioUaVkG">Phoneme Addition</a>
        </p>
        <div class="flex flex-row mt-8"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
            viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
            <path opacity="1" fill="#FFBF00"
              d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg> <span class="caution-message">{{ quizItem.caution }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizItem',
  props: {
    quizItem: Object
  },
  computed: {
    optionStatus() {
      if (this.$store.state.completedXPs.includes(this.xpObj.xpId)) {
        return "correct-choice";
      } else {
        return "incorrect-choice";
      }
    },
    iconColor() {
      if (true) {
        return "#0000ff";
      } else {
        return "ff0000";
      }
    },
    feedBack() {
      if (true) {
        return "correct-choice";
      } else {
        return "incorrect-choice";
      }
    }
  },
  methods: {
    optionSelected(option) {
      console.log("Seclected: ", option);
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
  margin: 12px;
}

.question-text {
  margin: 3;
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
  margin-right: 20px;
  margin-left: 10px;
  width: 30;
}

.answer-icon {
  color: aqua;
  height: 25px;
  width: 25px;
  ;
}

.list-item-right {
  padding: 5px;
  margin-left: 20px;
  padding-top: 10px;
}

.explanation {}

.p-explanation {
  margin-left: 200px;
  margin-right: 200px;
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
  padding-left: 7px;
}

.correct-choice {
  color: green;
}

.incorrect-choice {
  color: red;
}
</style>
