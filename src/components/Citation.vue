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
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.citation-content {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.citation-icon {
  flex-shrink: 0;
  margin-right: 0.75rem;
  font-size: 1.5rem;
}

.citation-title {
  font-weight: normal;
  color: #555;
  font-size: .8rem;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.citation-link {
  color: #3c3e52;
  text-decoration: none;
  font-size: .8rem;
  word-break: break-all;
}

.citation-link:hover {
  text-decoration: underline;
}

.citation-image-wrapper {
  flex: 0 0 auto;
  max-width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.citation-image {
  max-width: 100%;
  max-height: 150px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .citation {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
  }

  .citation-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .citation-icon {
    margin-bottom: 0.75rem;
    font-size: 2rem;
  }

  .citation-title {
    font-size: 1rem;
    line-height: 1.5;
  }

  .citation-link {
    font-size: 0.9rem;
    display: inline-block;
    margin-top: 0.5rem;
  }

  .citation-image-wrapper {
    max-width: 20%;
    margin-top: 1.5rem;
  }

  .citation-image {
    max-height: 250px;
    /*width: 100%;*/
    object-fit: cover;
  }
}
</style>
