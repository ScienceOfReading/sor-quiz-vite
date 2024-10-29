<template>
  <div class="new-item-form">
    <div v-if="store.saveStatus.show" :class="['save-status', store.saveStatus.type]" @click="store.clearSaveStatus()">
      {{ store.saveStatus.message }}
    </div>

    <h1>Suggest a New Quiz Entry</h1>
    <form @submit.prevent="submitForm">
      <!-- Basic Information -->
      <details open>
        <summary class="section-summary">Basic Information ▼</summary>
        <div class="form-section">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" id="title" v-model="newEntry.title" required />
          </div>
          <div class="form-group">
            <label for="subtitle">Subtitle:</label>
            <input type="text" id="subtitle" v-model="newEntry.subtitle" />
          </div>
          <div class="form-group">
            <label for="question">Question:</label>
            <textarea id="question" v-model="newEntry.Question" required></textarea>
          </div>
          <div class="form-group">
            <label for="questionP2">Follow-up Question (optional):</label>
            <textarea id="questionP2" v-model="newEntry.questionP2"></textarea>
          </div>
        </div>
      </details>

      <!-- Multiple Choice Options -->
      <details>
        <summary class="section-summary">Answer Options ▼</summary>
        <div class="form-section">
          <div class="form-group">
            <label for="option1">Option 1:</label>
            <input type="text" id="option1" v-model="newEntry.option1" required />
          </div>
          <div class="form-group">
            <label for="option2">Option 2:</label>
            <input type="text" id="option2" v-model="newEntry.option2" required />
          </div>
          <div class="form-group">
            <label for="option3">Option 3:</label>
            <input type="text" id="option3" v-model="newEntry.option3" />
          </div>
          <div class="form-group">
            <label for="option4">Option 4:</label>
            <input type="text" id="option4" v-model="newEntry.option4" />
          </div>
          <div class="form-group">
            <label for="option5">Option 5:</label>
            <input type="text" id="option5" v-model="newEntry.option5" />
          </div>
          <div class="form-group">
            <label for="correctAnswer">Correct Answer (1-5):</label>
            <input type="number" id="correctAnswer" v-model="newEntry.correctAnswer" min="1" max="5" required />
          </div>
        </div>
      </details>

      <!-- Explanations -->
      <details>
        <summary class="section-summary">Explanations ▼</summary>
        <div class="form-section">
          <div class="form-group">
            <label for="explanation">Primary Explanation:</label>
            <textarea id="explanation" v-model="newEntry.explanation"></textarea>
          </div>
          <div class="form-group">
            <label for="explanation2">Secondary Explanation:</label>
            <textarea id="explanation2" v-model="newEntry.explanation2"></textarea>
          </div>
        </div>
      </details>

      <!-- Media -->
      <details>
        <summary class="section-summary">Media ▼</summary>
        <div class="form-section">
          <div class="form-group">
            <label for="videoId">YouTube Video ID:</label>
            <input type="text" id="videoId" v-model="newEntry.videoId" />
          </div>
          <div class="form-group">
            <label for="imageUrl">Image URL:</label>
            <input type="text" id="imageUrl" v-model="newEntry.imageUrl" />
          </div>
          <div class="form-group">
            <label for="imageAltText">Image Alt Text:</label>
            <input type="text" id="imageAltText" v-model="newEntry.imageAltText" />
          </div>
        </div>
      </details>

      <!-- Podcast Episodes -->
      <details>
        <summary class="section-summary">Podcast Episodes ▼</summary>
        <div class="form-section">
          <div class="form-group">
            <label for="podcastEpisode1-title">Episode 1 Title:</label>
            <input type="text" id="podcastEpisode1-title" v-model="newEntry.podcastEpisode.title" />
          </div>
          <div class="form-group">
            <label for="podcastEpisode1-url">Episode 1 URL:</label>
            <input type="text" id="podcastEpisode1-url" v-model="newEntry.podcastEpisode.EpisodeUrl" />
          </div>
          <div class="form-group">
            <label for="podcastEpisode1-audio">Episode 1 Audio URL:</label>
            <input type="text" id="podcastEpisode1-audio" v-model="newEntry.podcastEpisode.audioUrl" />
          </div>
          <div class="form-group">
            <label for="podcastEpisode1-desc">Episode 1 Description:</label>
            <textarea id="podcastEpisode1-desc" v-model="newEntry.podcastEpisode.description"></textarea>
          </div>
          <div class="form-group">
            <label for="podcastEpisode1-time">Episode 1 Start Time (seconds):</label>
            <input type="number" id="podcastEpisode1-time" v-model="newEntry.podcastEpisode.podcastStartTime" min="0" />
          </div>

          <hr class="section-divider">

          <div class="form-group">
            <label for="podcastEpisode2-title">Episode 2 Title:</label>
            <input type="text" id="podcastEpisode2-title" v-model="newEntry.podcastEpisode2.title" />
          </div>
          <div class="form-group">
            <label for="podcastEpisode2-url">Episode 2 URL:</label>
            <input type="text" id="podcastEpisode2-url" v-model="newEntry.podcastEpisode2.EpisodeUrl" />
          </div>
          <div class="form-group">
            <label for="podcastEpisode2-audio">Episode 2 Audio URL:</label>
            <input type="text" id="podcastEpisode2-audio" v-model="newEntry.podcastEpisode2.audioUrl" />
          </div>
          <div class="form-group">
            <label for="podcastEpisode2-desc">Episode 2 Description:</label>
            <textarea id="podcastEpisode2-desc" v-model="newEntry.podcastEpisode2.description"></textarea>
          </div>
          <div class="form-group">
            <label for="podcastEpisode2-time">Episode 2 Start Time (seconds):</label>
            <input type="number" id="podcastEpisode2-time" v-model="newEntry.podcastEpisode2.podcastStartTime"
              min="0" />
          </div>
        </div>
      </details>

      <!-- Cautions -->
      <details>
        <summary class="section-summary">Cautions ▼</summary>
        <div class="form-section">
          <div class="form-group">
            <label for="cautionLevel">Caution Level:</label>
            <input type="text" id="cautionLevel" v-model="newEntry.cautionLevel" />
          </div>
          <div class="form-group">
            <label for="caution">Caution Text:</label>
            <textarea id="caution" v-model="newEntry.caution"></textarea>
          </div>
        </div>
      </details>

      <!-- Citations -->
      <details>
        <summary class="section-summary">Citations ▼</summary>
        <div class="form-section">
          <button type="button" @click="addCitation" class="add-button">Add Citation</button>
          <div v-for="(citation, index) in newEntry.citations" :key="index" class="citation-group">
            <h3>Citation {{ index + 1 }}</h3>
            <div class="form-group">
              <label :for="`citation-${index}-title`">Title:</label>
              <input type="text" :id="`citation-${index}-title`" v-model="citation.title" />
            </div>
            <div class="form-group">
              <label :for="`citation-${index}-author`">Author:</label>
              <input type="text" :id="`citation-${index}-author`" v-model="citation.author" />
            </div>
            <div class="form-group">
              <label :for="`citation-${index}-url`">URL:</label>
              <input type="text" :id="`citation-${index}-url`" v-model="citation.url" />
            </div>
            <div class="form-group">
              <label :for="`citation-${index}-year`">Year:</label>
              <input type="text" :id="`citation-${index}-year`" v-model="citation.year" />
            </div>
            <div class="form-group">
              <label :for="`citation-${index}-image`">Image URL:</label>
              <input type="text" :id="`citation-${index}-image`" v-model="citation.imageUrl" />
            </div>
            <button type="button" @click="removeCitation(index)" class="remove-button">Remove Citation</button>
          </div>
        </div>
      </details>

      <!-- Resources -->
      <details>
        <summary class="section-summary">Resources ▼</summary>
        <div class="form-section">
          <button type="button" @click="addResource" class="add-button">Add Resource</button>
          <div v-for="(resource, index) in newEntry.resources" :key="index" class="resource-group">
            <h3>Resource {{ index + 1 }}</h3>
            <div class="form-group">
              <label :for="`resource-${index}-title`">Title:</label>
              <input type="text" :id="`resource-${index}-title`" v-model="resource.title" />
            </div>
            <div class="form-group">
              <label :for="`resource-${index}-author`">Author:</label>
              <input type="text" :id="`resource-${index}-author`" v-model="resource.author" />
            </div>
            <div class="form-group">
              <label :for="`resource-${index}-url`">URL:</label>
              <input type="text" :id="`resource-${index}-url`" v-model="resource.url" />
            </div>
            <div class="form-group">
              <label :for="`resource-${index}-description`">Description:</label>
              <textarea :id="`resource-${index}-description`" v-model="resource.description"></textarea>
            </div>
            <button type="button" @click="removeResource(index)" class="remove-button">Remove Resource</button>
          </div>
        </div>
      </details>

      <!-- Closing -->
      <details>
        <summary class="section-summary">Closing ▼</summary>
        <div class="form-section">
          <div class="form-group">
            <label for="closingText">Closing Text:</label>
            <textarea id="closingText" v-model="newEntry.closingText"></textarea>
          </div>
          <div class="form-group">
            <label for="closingText2">Additional Closing Text:</label>
            <textarea id="closingText2" v-model="newEntry.closingText2"></textarea>
          </div>
          <div class="form-group">
            <label for="modal">Modal Content:</label>
            <textarea id="modal" v-model="newEntry.modal"></textarea>
          </div>
        </div>
      </details>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';
import { quizStore } from '../stores/quizStore';

export default {
  setup() {
    const store = quizStore();
    return { store };
  },
  computed: {
    newEntry: {
      get() {
        return this.store.draftQuizEntry;
      },
      set(value) {
        this.store.updateDraftQuizEntry(value);
      }
    }
  },
  watch: {
    'store.saveStatus': {
      handler(newStatus) {
        console.log('Save status changed:', newStatus);
      },
      deep: true
    }
  },
  methods: {
    addCitation() {
      this.store.draftQuizEntry.citations.push({
        title: '',
        author: '',
        url: '',
        year: '',
        imageUrl: '',
      });
    },
    removeCitation(index) {
      this.store.draftQuizEntry.citations.splice(index, 1);
    },
    addResource() {
      this.store.draftQuizEntry.resources.push({
        title: '',
        author: '',
        url: '',
        description: '',
      });
    },
    removeResource(index) {
      this.store.draftQuizEntry.resources.splice(index, 1);
    },
    async submitForm() {
      try {
        await this.store.saveDraftQuizEntry();
        // Handle success (maybe redirect or show success message)
      } catch (e) {
        // Handle error
        console.error('Error submitting form:', e);
      }
    }
  }
};
</script>

<style scoped>
.new-item-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section-summary {
  padding: 1rem;
  background-color: #2a2a2a;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
}

.section-summary:hover {
  background-color: #3a3a3a;
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #2a2a2a;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.citation-group,
.resource-group {
  margin-top: 15px;
  padding: 15px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #222;
}

h2 {
  margin-bottom: 15px;
  color: #333;
}

h3 {
  margin-bottom: 15px;
  color: #fff;
}

.save-status {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 4px;
  cursor: pointer;
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

.success {
  background-color: #4CAF50;
  color: white;
}

.error {
  background-color: #f44336;
  color: white;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

details {
  margin-bottom: 1rem;
}

details[open] .section-summary {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: none;
}

details[open] .form-section {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.section-divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #444;
}

.add-button {
  margin-bottom: 20px;
  background-color: #4CAF50;
}

.remove-button {
  margin-top: 10px;
  background-color: #f44336;
}
</style>
