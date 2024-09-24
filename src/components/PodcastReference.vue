<template>
    <div v-if="podcastEpisode" class="podcast-reference">
        <div class="podcast-header">
            <font-awesome-icon icon="podcast" class="podcast-icon" />
            <h4 class="podcast-title">{{ podcastEpisode.title }}</h4>
        </div>
        <div class="podcast-content">
            <audio ref="audio" :src="podcastEpisode.audioUrl" controls class="podcast-player"></audio>
            <p v-if="podcastEpisode.description" class="podcast-description">{{ podcastEpisode.description }}</p>
            <a :href="podcastEpisode.EpisodeUrl" target="_blank" rel="noopener noreferrer" class="podcast-link">
                <font-awesome-icon icon="external-link-alt" /> Listen to Full Episode
            </a>
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
    width: 100%;
    max-width: 66.666%;
    margin-left: auto;
    margin-top: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #f8fafc;
}

.podcast-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #4a5568;
    color: white;
}

.podcast-icon {
    font-size: 1.5rem;
    margin-right: 0.75rem;
}

.podcast-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.podcast-content {
    padding: 1rem;
}

.podcast-player {
    width: 100%;
    margin-bottom: 1rem;
}

.podcast-description {
    font-size: 0.9rem;
    color: #4a5568;
    margin-bottom: 1rem;
    line-height: 1.5;
}

.podcast-link {
    display: inline-flex;
    align-items: center;
    color: #3182ce;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s ease;
}

.podcast-link:hover {
    color: #2c5282;
    text-decoration: underline;
}

.podcast-link .fa-external-link-alt {
    margin-right: 0.5rem;
    font-size: 0.8rem;
}
</style>