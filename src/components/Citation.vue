<template>
  <div class="citation">
    <div class="citation-content">
      <font-awesome-icon :icon="['fas', 'flask-vial']" class="citation-icon" />
      <p class="citation-title">
        {{ citation.title }}, {{ citation.author }}, {{ citation.year }},
        <a :href="citation.url" target="_blank" class="citation-link">{{ citation.url }}</a>
      </p>
    </div>
    <div v-if="citation.imageUrl" class="citation-image-wrapper">
      <img :src="citation.imageUrl" :alt="citation.imageAltText" class="citation-image" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Citation',
  props: {
    citation: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        author: '',
        year: '',
        url: '',
        imageUrl: '',
        imageAltText: ''
      })
    }
  }
}
</script>

<style scoped>
.citation {
  border: 1px solid #ccc;
  padding: .75rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  overflow: hidden;
  /* Prevent content from overflowing */
}

.citation-content {
  flex: 1;
  min-width: 0;
  /* Allow content to shrink below its minimum content size */
  display: flex;
  align-items: flex-start;
}

.citation-icon {
  flex-shrink: 0;
  /* Prevent icon from shrinking */
  margin-right: 0.75rem;
  font-size: 1.5rem;
}

.citation-title {
  font-weight: normal;
  color: #555;
  font-size: .8rem;
  margin: 0;
  word-wrap: break-word;
  /* Allow long words to break and wrap */
  overflow-wrap: break-word;
}

.citation-link {
  color: #3c3e52;
  text-decoration: none;
  font-size: .8rem;
  word-break: break-all;
  /* Allow URLs to break at any character */
}

.citation-link:hover {
  text-decoration: underline;
}

.citation-image-wrapper {
  flex: 0 0 auto;
  /* Don't grow or shrink, size based on content */
  max-width: 33.333%;
  max-height: 100px;
  /* Limit image height */
  display: flex;
  align-items: center;
}

.citation-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* Maintain aspect ratio while fitting in the container */
  border-radius: 4px;
}

@media (max-width: 768px) {
  .citation {
    flex-direction: column;
  }

  .citation-image-wrapper {
    max-width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
