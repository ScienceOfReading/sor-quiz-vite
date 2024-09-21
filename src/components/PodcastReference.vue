<template>
    <div v-if="episode" class="podcast-reference mt-4 p-4 bg-gray-100 rounded-md">
        <h3 class="text-lg font-semibold mb-2">Related Podcast Episode</h3>
        <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z" />
            </svg>
            <a :href="episode.url" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
                {{ episode.title }}
            </a>
        </div>
        <p v-if="episode.description" class="mt-2 text-sm text-gray-600">{{ episode.description }}</p>
    </div>
</template>

<script>
    export default {
        name: 'PodcastReference',
        props: {
            episode: {
                type: Object,
                default: null,
                validator: (value) => {
                    return value === null || (typeof value === 'object' && 'title' in value && 'url' in value);
                }
            }
        }
    }
</script>