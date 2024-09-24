<template>
    <div class="explanation">
        <div class="content-wrapper">
            <div class="text-content justified">
                <!-- Your existing text content here -->
                <p class=" mb-4">{{ quizItem.explanation }}</p>
                <p class="">{{ quizItem.explanation2 }}</p>
                <p class="0">{{ quizItem.explanation3 }}</p>
                <p v-if="quizItem.ref1 != ''" class="mt-2 text-sm">{{ quizItem.ref1 }}</p>
                <p v-if="quizItem.ref2 != ''" class="text-sm">{{ quizItem.ref2 }}</p>
                <p v-if="quizItem.ref3 != ''" class="mb- text-sm">{{ quizItem.ref3 }}</p>
            </div>
            <ExplainerVideo v-if="quizItem.videoId" :videoId="quizItem.videoId" :caption="quizItem.videoCaption"
                :startTime="quizItem.videoStartTime" />
            <ExplainerImage v-else-if="quizItem.imageUrl" :imageUrl="quizItem.imageUrl"
                :altText="quizItem.imageAltText" />
        </div>
        <div class="citations-wrapper">
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
        }
    }
}
</script>

<style scoped>
.explanation {
    /* Add any necessary styles */
}

.content-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.text-content {
    flex: 1 1 100%;
}

.citations-wrapper {
    flex: 0 0 66.666%;
    max-width: 66.666%;
    margin-left: auto;
    /* Align to the right */
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
}
</style>