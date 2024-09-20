<template>
    <div class="explanation">
        <!-- Display explanation content here -->
        <div :class="{ [`hidden`]: !reviewMode }"
            class="border-yellow-500 rounded-md explanation p-4 lg:mt-4 sm:mt-2 place-self-center lg:ml-20 lg:w-5/6">
            <div class="content-wrapper">
                <div class="text-content">
                    <!-- Move all the text content here -->
                    <p class="text-amber-700 mb-4">{{ quizItem.explanation }}</p>
                    <p class="text-amber-700">{{ quizItem.explanation2 }}</p>
                    <p class="text-amber-700">{{ quizItem.explanation3 }}</p>
                    <p v-if="quizItem.ref1 != ''" class="text-amber-700 mt-2 text-sm">{{ quizItem.ref1 }}</p>
                    <p v-if="quizItem.ref2 != ''" class="text-amber-700 text-sm">{{ quizItem.ref2 }}</p>
                    <p v-if="quizItem.ref3 != ''" class="text-amber-700 mb- text-sm">{{ quizItem.ref3 }}</p>
                </div>
                <ResponsiveVideo v-if="quizItem.videoId" :videoId="quizItem.videoId" />
            </div>
            <div v-if="quizItem.citations && quizItem.citations.length > 0" class="citations-wrapper">
                <Citation v-for="(citation, index) in quizItem.citations" :key="index" :citation="citation" />
            </div>
            <Caution :message="quizItem.caution" />
        </div>
    </div>
</template>

<script>
import ResponsiveVideo from './ResponsiveVideo.vue'
import Citation from './Citation.vue'
import Caution from './Caution.vue'

export default {
    name: 'Explanation',
    components: {
        ResponsiveVideo,
        Citation,
        Caution
    },
    props: {
        quizItem: {
            type: Object,
            required: true
        },
        reviewMode: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
.explanation {
    /* Add your styles here */
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.text-content {
    flex: 1;
}

.video-wrapper {
    flex: 0 0 33.333%;
    /* Takes up 1/3 of the container width */
    max-width: 33.333%;
}

.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    /* 16:9 Aspect Ratio */
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
    }

    .video-container {
        max-width: 100%;
    }
}

.citations-wrapper {
    margin-top: 1rem;
}
</style>