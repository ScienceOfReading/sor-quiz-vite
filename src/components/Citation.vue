<template>
  <div class="citation">
    <p class="citation-title">{{ citation.title }}</p>
    <p class="citation-author">{{ citation.author }}</p>
    <p class="citation-year">{{ citation.year }}</p>
    <a :href="citation.url" target="_blank" class="citation-link">Read more</a>
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
        url: ''
      })
    }
  }
}
</script>

<style scoped>
.citation {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.citation-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.citation-author,
.citation-year {
  font-size: 1rem;
  color: #555;
}

.citation-link {
  color: #42b983;
  text-decoration: none;
}

.citation-link:hover {
  text-decoration: underline;
}
</style>
