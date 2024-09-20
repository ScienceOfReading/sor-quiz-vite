<template>
    <div class="explanation">
        <!-- Display explanation content here -->
        <div :class="{ [`hidden`]: !reviewMode }"
            class="border-yellow-500 rounded-md explanation p-4 lg:mt-4 sm:mt-2 place-self-center lg:ml-20 lg:w-5/6">
            <p class="text-amber-700 mb-4">{{ quizItem.explanation }}
                <!--a href="https://youtu.be/Nh3r2WZs2P8?si=9wZ9XWrCTioUaVkG">Phoneme Addition</a-->
            </p>
            <p class="text-amber-700">{{ quizItem.explanation2 }}
            </p>
            <p class="text-amber-700">{{ quizItem.explanation3 }}
            </p>
            <p v-if="quizItem.ref1 != ''" class="text-amber-700 mt-2 text-sm">{{ quizItem.ref1 }}
            </p>
            <p v-if="quizItem.ref2 != ''" class="text-amber-700 text-sm">{{ quizItem.ref2 }}
            </p>
            <p v-if="quizItem.ref3 != ''" class="text-amber-700 mb- text-sm">{{ quizItem.ref3 }}
            </p>
            <iframe v-if="quizItem.videoUrl" width="560" height="315" :src="quizItem.videoUrl"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <!----
      <p><a
          href="https://www.researchgate.net/profile/Matthew-Burns-10/publication/321116132_Meta-analysis_of_targeted_small-group_reading_interventions/links/5ab162340f7e9b4897c39acd/Meta-analysis-of-targeted-small-group-reading-interventions.pdf">{{
            quizItem.citation.title }}</a></p>
      -->
            <div v-if="quizItem.caution != ''" class="flex flex-row mt-8">
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
export default {
    name: 'Explanation',
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
</style>