<template>
    <div class="sm:w-full md:w-9/12 lg:w-5/6 lg:px-4 quizzes-container text-center">
        <div class="grid quiz-item w-full border-4 place-self-center place-content-center text-center relative">
            <div class="absolute top-4 right-4">
                <router-link to="/" class="return-button">
                    Return to Quizzes
                </router-link>
            </div>

            <div class="p-8 sm:p-4">
                <div class="md:text-center sm:text-left sm:pl-2 sm:pr-24">
                    <h2 class="text-2xl mb-4 mr-2">Coming Soon!</h2>
                    <h2 class="text-2xl mb-4">{{ quizTitle }}</h2>
                    <p class="text-lg mb-6">Want to see a "{{ quizTitle }}" quiz? </p>
                    <p class="text-lg mb-6">Add/improve a question. Together we can raise up teachers everywhere.</p>
                </div>

                <div class="construction-animation mb-6">
                    <font-awesome-icon :icon="['fas', 'tools']" class="text-4xl text-amber-500 animate-pulse" />
                </div>

                <div class="router-link-container">
                    <router-link to="/new-item" class="button-77">Add/Edit a New Quiz Entry</router-link>
                </div>
                <div class="feedback-section">
                    <p class="mt-4 mb-4">OR </p>
                    <p class="mb-4">Tell us what would you like to see in this quiz</p>
                    <textarea v-model="feedback" class="w-full p-4 mb-4 min-h-[120px] rounded-lg"
                        placeholder="Share your thoughts..."></textarea>
                    <button @click="submitFeedback"
                        class="bg-stone-400 px-6 h-10 text-amber-400 rounded hover:bg-stone-500 transition-colors">
                        Submit Suggestion
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { quizSets } from '../data/quizSets';
import { saveUserProgress } from '../firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTools } from '@fortawesome/free-solid-svg-icons';

// Add the tools icon to the library
library.add(faTools);

export default {
    name: 'InProgress',
    props: {
        selectedQuiz: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            feedback: '',
            quizTitle: ''
        }
    },
    created() {
        this.quizTitle = quizSets[this.selectedQuiz]?.setName || 'New';
    },
    methods: {
        async submitFeedback() {
            if (this.feedback.trim()) {
                try {
                    await saveUserProgress(this.selectedQuiz, {
                        inProgressFeedback: this.feedback,
                        timestamp: new Date()
                    });
                    this.feedback = '';
                    alert('Thank you for your feedback!');
                } catch (error) {
                    console.error('Error saving feedback:', error);
                }
            }
        }
    }
}
</script>

<style scoped>
.button-77 {
    align-items: center;
    background-image: linear-gradient(90deg, #4a7ff3 40%, #702afa);
    border: 0;
    border-radius: 10px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    font-family: "Codec cold", sans-serif;
    font-size: 16px;
    font-weight: 100;
    height: 30px;
    justify-content: center;
    letter-spacing: .4px;
    line-height: 1;
    max-width: fit-content;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
    margin-top: 10px;
    text-decoration: none;
    text-transform: uppercase;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

textarea {
    background: rgba(63, 63, 136, 0.15);
    border: 1px solid rgba(74, 144, 226, 0.3);
    color: #333;
    font-size: 1rem;
    line-height: 1.5;
    resize: vertical;
    transition: all 0.3s ease;
}

textarea:focus {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(74, 144, 226, 0.5);
    box-shadow: 0 0 20px rgba(74, 144, 226, 0.2);
    outline: none;
}

:root[class~="dark"] textarea {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
}

.construction-animation {
    animation: bounce 2s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.return-button {
    @apply bg-stone-400 px-1 py-1 text-amber-400 rounded hover:bg-stone-500 transition-all text-sm sm:text-base inline-block max-w-[100px] sm:max-w-none text-center leading-tight sm:mr-0.5 sm:ml-1;
}
</style>
