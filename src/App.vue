<template>
  <div class="app-container">
    <header class="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold">SOR Quizzes</h1>
        <button @click="showHelp = !showHelp"
          class="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100" title="Help & About">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <UserStatus />
    </header>

    <!-- Help Modal -->
    <div v-if="showHelp" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showHelp = false">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-xl">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-bold">About SOR Quizzes</h2>
          <button @click="showHelp = false" class="text-gray-500 hover:text-gray-700 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            SOR Quizzes is a community-driven effort to create and share quiz content
            related to Science of Reading concepts.
          </p>
          <p>
            You can:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Take quizzes to test your knowledge</li>
            <li>Create and submit new quiz questions</li>
            <li>Sign in with Google or GitHub to track your progress</li>
            <li>Contribute to the <a href="https://github.com/EdJones/sor-quizzes" class="text-blue-500 hover:underline"
                target="_blank">open source project</a></li>
          </ul>
          <p>
            Created by <a href="https://skunkworks-edu.com" class="text-blue-500 hover:underline"
              target="_blank">Skunkworks\edu</a>
          </p>
        </div>
      </div>
    </div>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserStatus from './components/UserStatus.vue';

const showHelp = ref(false);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
