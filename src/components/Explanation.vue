<template>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    <div class="explanation-wrapper">
        <!-- Display explanation content here -->
        <div :class="{ [`hidden`]: !reviewMode }"
            class="rounded-md explanation p-4 lg:mt-4 sm:mt-2 place-self-center lg:ml-10 lg:w-5/6">
            <div class="content-wrapper">
                <div class="text-content justified">
                    <!-- Move all the text content here -->
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
                <ExplainerImage v-else-if="quizItem.image" :imageUrl="quizItem.image"
                    :altText="quizItem.imageAltText" />
            </div>
=======
    <div class="explanation-wrapper">
        <!-- Display explanation content here -->
        <div :class="{ [`hidden`]: !reviewMode }"
            class="rounded-md explanation p-4 lg:mt-4 sm:mt-2 place-self-center lg:ml-10 lg:w-5/6">
            <div class="content-wrapper">
                <div class="text-content justified">
                    <!-- Move all the text content here -->
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
                <ExplainerImage v-else-if="quizItem.image" :imageUrl="quizItem.image"
                    :altText="quizItem.imageAltText" />
            </div>
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
            <PodcastReference v-if="quizItem.podcastEpisode" :podcastEpisode="quizItem.podcastEpisode" />
            <div v-if="quizItem.citations && quizItem.citations.length > 0" class="citations-wrapper">
                <Citation v-for="(citation, index) in quizItem.citations" :key="index" :citation="citation" />
            </div>
            <Caution :message="quizItem.caution" />
<<<<<<< HEAD
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
=======
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
        </div>
    </div>
</template>

<script>
import ExplainerVideo from './ExplainerVideo.vue'
import ExplainerImage from './ExplainerImage.vue'
import Citation from './Citation.vue'
import Caution from './Caution.vue'
import PodcastReference from './PodcastReference.vue'

export default {
    name: 'Explanation',
    components: {
        ExplainerVideo,
        ExplainerImage,
        Citation,
        Caution,
        PodcastReference
    },
    props: {
        quizItem: {
            type: Object,
            required: true
        },
<<<<<<< HEAD
<<<<<<< HEAD
        userAnswer: {
            type: [String, Number],
            required: true
        },
        showExplanation: {
=======
        reviewMode: {
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
=======
        reviewMode: {
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
<<<<<<< HEAD
<<<<<<< HEAD
.explanation {
    margin-bottom: 2rem;
=======
=======
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
-wrapper {
    /* Add your styles here */
    margin-top: .3 rem;
    padding: 1rem;
    border: 1px none #ccc;
    border-radius: 4px;
<<<<<<< HEAD
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
=======
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
}

.content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
}

.text-content {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    flex: 0 0 66.666%;
    max-width: 66.666%;
=======
    flex: 0 0 66.666%;
    max-width: 66.666%;
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
    line-height: 1.4;
    /* Adjust this value to tighten the line height */
}

.justified {
    text-align: justify;
}

.explainer-video-wrapper,
.explainer-image-wrapper {
    flex: 0 0 33.333%;
    max-width: 33.333%;
    /* Ensure the video/image doesn't get too small */
<<<<<<< HEAD
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
=======
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
}

@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
    }

    .text-content,
    .explainer-video-wrapper,
    .explainer-image-wrapper,
    .citations-wrapper {
        flex: 0 0 100%;
        max-width: 100%;
        width: 100%;
        /* Add this line */
<<<<<<< HEAD
    }

    .text-content {
        font-size: 0.9rem;
        line-height: 1.5;
=======
>>>>>>> parent of 461e8fa (Make citation wider if an image is there on phone)
    }
}

.citations-wrapper {
    flex: 0 0 66.666%;
    max-width: 66.666%;
    margin-left: auto;
    /* Align to the right */
    margin-top: 1rem;
    margin-right: -1rem;
    padding-right: 0%;
}
</style>