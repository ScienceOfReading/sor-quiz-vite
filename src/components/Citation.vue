<template>
  <div class="citation">
    <div class="citation-content">
      <font-awesome-icon :icon="['fas', 'flask-vial']" class="citation-icon" />
      <p class="citation-text">
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
      required: true
    }
  }
}
</script>

<style scoped>
.citation {
  display: flex;
  align-items: flex-start;
  /* Align items to the top */
  gap: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8fafc;
}

.citation-content {
  flex: 1;
  min-width: 0;
  /* Allows content to shrink below its minimum content size */
  display: flex;
  align-items: flex-start;
}

.citation-icon {
  flex-shrink: 0;
  margin-right: 0.75rem;
  font-size: 1.25rem;
  color: #4a5568;
}

.citation-text {
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: #4a5568;
}

.citation-link {
  color: #3182ce;
  text-decoration: none;
  word-break: break-all;
}

.citation-link:hover {
  text-decoration: underline;
}

.citation-image-wrapper {
  flex-shrink: 0;
  width: 100px;
  /* Fixed width for consistency */
}

.citation-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .citation {
    flex-direction: row;
    /* Ensure horizontal layout on small screens */
    padding: 0.75rem;
  }

  .citation-icon {
    font-size: 1rem;
  }

  .citation-text {
    font-size: 0.75rem;
  }

  .citation-image-wrapper {
    width: 80px;
    /* Slightly smaller on very small screens */
  }
}
</style>
