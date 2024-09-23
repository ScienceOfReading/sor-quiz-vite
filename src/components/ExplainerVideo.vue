<template>
  <div class="explainer-video-wrapper">
    <ResponsiveVideo :videoId="videoId" />
    <p v-if="caption" class="video-caption">{{ caption }}</p>
  </div>
</template>

<script>
import ResponsiveVideo from './ResponsiveVideo.vue'

export default {
  name: 'ExplainerVideo',
  components: {
    ResponsiveVideo
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.explainer-video-wrapper {
  flex: 0 0 33.333%;
  max-width: 33.333%;
}

.video-caption {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4a5568;
}

@media (max-width: 768px) {
  .explainer-video-wrapper {
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 1rem;
  }
}
</style>