<template>
  <div class="video-wrapper">
    <div class="video-container">
      <iframe :src="videoUrl"
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveVideo',
  props: {
    videoUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.video-wrapper {
  flex: 0 0 33.333%;
  max-width: 33.333%;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .video-wrapper {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>