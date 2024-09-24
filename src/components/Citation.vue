<template>
  <div class="citation">
    <font-awesome-icon :icon="['fas', 'flask-vial']" class="citation-icon" />
    <p class="citation-title">
      {{ citation.title }}, {{ citation.author }}, {{ citation.year }},
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
  padding: .75rem;
  border-radius: 8px;
  margin: 1rem 0;
  justify-content: center;
  overflow: hidden;
  /* Ensure the container clears the floated element */
}

.citation-icon {
  float: left;
  margin-right: 0.75rem;
  /* Adjust the margin as needed */
  font-size: 1.5rem;
  color: #3c3e52;
  /* Adjust the icon size as needed */
}

.citation-title {
  font-weight: normal;
  color: #555;
  font-size: .8rem;
}

.citation-link {
  color: #555;
  color-dark: #848394;
  text-decoration: none;
  font-size: .8rem;
}

.citation-link:hover {
  text-decoration: underline;
}
</style>
