<template>
  <img alt="studying icon" src="./assets/study.png" height="150">
  <h2>Science of Reading Quizzes</h2>
  <div class="w-7/12 quizzes-container">
    <QuizItem class="w-7/12" />
  </div>
</template>

<script>
import QuizItem from './components/QuizItem.vue'

export default {
  name: 'App',
  components: {
    QuizItem
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
  margin-top: 60px;
}

.lead-image {
  width: 50;
  height: 50;
}

.quizzes-container {
  display: flex;
  justify-content: space-evenly;
  flex-flow: column nowrap;
}
</style>
