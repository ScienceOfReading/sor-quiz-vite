<template>
  <div class="explainer-video-wrapper">
    <div class="video-container">
      <iframe :src="`https://www.youtube.com/embed/${videoId}`" frameborder="0" allowfullscreen></iframe>
    </div>
    <p v-if="caption" class="video-caption">{{ caption }}</p>
  </div>
</template>

<script>
export default {
  name: 'ExplainerVideo',
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

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9 Aspect Ratio */
  height: 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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