<template>
  <img alt="studying icon" src="./assets/study.png" height="150">
  <h2>Science of Reading Quizzes</h2>
  <div class="w-7/12 quizzes-container">
    <QuizItem class="border-2 border-slate-200  w-full md:w-1/2 lg:w-2/3 px-4 place-content-center  mx-auto" />
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
  margin-left: 120px;
  margin-right: 120px;
  justify-content: space-evenly;
  flex-flow: column nowrap;
}
</style>
