<template>
    <div v-if="showExplanation" class="explanation">
        <div class="content-wrapper">
            <div class="text-content justified">
                <p v-if="quizItem.explanation">{{ quizItem.explanation }}</p>
                <p v-if="quizItem.explanation2">{{ quizItem.explanation2 }}</p>
                <p v-if="quizItem.explanation3">{{ quizItem.explanation3 }}</p>
                <p v-if="quizItem.closingText">{{ quizItem.closingText }}</p>
                <p v-if="quizItem.closingText2">{{ quizItem.closingText2 }}</p>
            </div>
            <ExplainerVideo v-if="quizItem.videoId" :videoId="quizItem.videoId" :caption="quizItem.videoCaption"
                :startTime="quizItem.videoStartTime" />
            <ExplainerImage v-else-if="quizItem.imageUrl" :imageUrl="quizItem.imageUrl"
                :altText="quizItem.imageAltText" />
        </div>
        <div v-if="quizItem.citations && quizItem.citations.length" class="citations-wrapper">
            <Citation v-for="(citation, index) in quizItem.citations" :key="index" :citation="citation" />
        </div>
    </div>
</template>

<script>
import ExplainerVideo from './ExplainerVideo.vue'
import ExplainerImage from './ExplainerImage.vue'
import Citation from './Citation.vue'

export default {
    name: 'Explanation',
    components: {
        ExplainerVideo,
        ExplainerImage,
        Citation
    },
    props: {
        quizItem: {
            type: Object,
            required: true
        },
        userAnswer: {
            type: [String, Number],
            required: true
        },
        showExplanation: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
.explanation {
    margin-bottom: 2rem;
}

.content-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

.text-content {
    flex: 1 1 100%;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
}

.justified {
    text-align: justify;
}

.citations-wrapper {
    flex: 0 0 66.666%;
    max-width: 66.666%;
    margin-left: auto;
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
    }

    .text-content,
    .citations-wrapper {
        flex: 0 0 100%;
        max-width: 100%;
        margin-left: 0;
    }

    .text-content {
        font-size: 0.9rem;
        line-height: 1.5;
    }
}
</style>