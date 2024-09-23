<template>
  <div class="citation">
    <p class="citation-title">{{ citation.title }}, {{ citation.author }}, {{ citation.year }},
      <a :href="citation.url" target="_blank" class="citation-link">{{ citation.url }}</a>
    </p>
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
  border-radius: 8px;
  margin: 1rem 0;
}

.citation-title {
  font-weight: normal;
  color: #555;
  font-size: 1 rem;
}

.citation-author,
.citation-year {
  font-size: 1rem;
  color: #555;
}

.citation-link {
  color: #3c3e52;
  text-decoration: none;
  font-size: .8rem;
}

.citation-link:hover {
  text-decoration: underline;
}
</style>
