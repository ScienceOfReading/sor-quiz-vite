<template>
  <div class="explainer-image-wrapper">
    <figure @click="showModal = true" class="cursor-pointer hover:opacity-90 transition-opacity">
      <img :src="imageUrl" :alt="altText" class="explainer-image">
      <figcaption class="text-center text-muted text-xs">{{ altText }}</figcaption>
    </figure>

    <!-- Image Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      @click="showModal = false">
      <div class="relative max-h-[90vh] max-w-[90vw]">
        <img :src="imageUrl" :alt="altText" class="max-h-[90vh] max-w-[90vw] object-contain">
        <button @click="showModal = false" class="absolute top-4 right-4 text-white hover:text-gray-300 text-xl"
          aria-label="Close">
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExplainerImage',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      default: 'Explanation image'
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  mounted() {
    // Add event listener for escape key
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    // Remove event listener
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(e) {
      if (e.key === 'Escape' && this.showModal) {
        this.showModal = false;
      }
    }
  }
}
</script>

<style scoped>
.explainer-image-wrapper {
  flex: 0 0 33.333%;
  max-width: 33.333%;
}

.explainer-image {
  width: 90%;
  height: auto;
  object-fit: cover;
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 768px) {
  .explainer-image-wrapper {
    flex: 0 0 100%;
    max-width: 100%;
    max-height: 100%;
    margin-top: 1rem;
  }
}

/* Animation for modal */
.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>