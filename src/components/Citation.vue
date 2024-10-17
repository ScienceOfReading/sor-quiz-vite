<template>
  <div v-if="citation.title != ''" class="citation">
    <div class="citation-content">
      <font-awesome-icon :icon="['fas', 'flask-vial']" class="citation-icon" />
      <p class="citation-text">
        {{ citation.title }}, {{ citation.author }}, {{ citation.year }},
        <a :href="citation.url" target="_blank" class="citation-link" :title="citation.url">
          {{ truncatedUrl }}
        </a>
      </p>

      <p v-if="citation.fullText" class="citation-text">
        <a :href="citation.fullText" target="_blank" class="citation-text-link" :title="citation.fullText">Full
          Text</a>
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
  },
  computed: {
    truncatedUrl() {
      if (this.citation.url.length <= 55) {
        return this.citation.url;
      }
      return this.citation.url.substring(0, 52) + '...';
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
  display: flex;
  flex-direction: column;
  /* Stack children vertically */
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
  /* Reset margin if needed */
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: #4a5568;
  display: block;
  /* Ensure each paragraph is a block element */
}

.citation-link {
  color: #3182ce;
  text-decoration: none;
  word-break: break-all;
  display: inline;
  /* Keep links inline */
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
