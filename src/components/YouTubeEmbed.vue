<template>
  <div class="youtube-embed">
    <iframe
      :src="embedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'YouTubeEmbed',
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  computed: {
    embedUrl() {
      return `https://www.youtube.com/embed/${this.videoId}?rel=0&showinfo=0&autoplay=0`;
    }
  }
}
</script>

<style scoped>
.youtube-embed {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
}

.youtube-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>