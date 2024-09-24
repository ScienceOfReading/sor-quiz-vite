<template>
    <div v-if="podcastEpisode" class="podcast-reference">
        <font-awesome-icon icon="podcast" class="podcast-icon" />
        <div class="podcast-info">
            <h4>{{ podcastEpisode.title }}</h4>
            <audio ref="audio" :src="podcastEpisode.audioUrl" controls></audio>
            <p v-if="podcastEpisode.description" class="podcast-description">{{ podcastEpisode.description }}</p>
            <a :href="podcastEpisode.EpisodeUrl" target="_blank" rel="noopener noreferrer">Full Episode</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PodcastReference',
    props: {
        podcastEpisode: {
            type: Object,
            default: null
        }
    },
    mounted() {
        if (this.podcastEpisode && this.podcastEpisode.podcastStartTime > 0) {
            this.$nextTick(() => {
                this.$refs.audio.currentTime = this.podcastEpisode.podcastStartTime;
            });
        }
    }
}
</script>

<style scoped>
.podcast-reference {
    margin-top: 1rem;
    display: flex;
    align-items: flex-start;
}

.podcast-icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    color: #4a5568;
}

.podcast-info {
    flex: 1;
}

h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
}

.podcast-description {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #4a5568;
}

a {
    display: inline-block;
    margin-top: 0.5rem;
    color: #3182ce;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>