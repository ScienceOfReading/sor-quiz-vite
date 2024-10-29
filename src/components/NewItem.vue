<template>
  <div class="new-item-form">
    <h1>Suggest a New Quiz Entry</h1>
    <form @submit.prevent="submitForm">
      <!-- Basic Information -->
      <div class="form-section">
        <h2>Basic Information</h2>
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

      <!-- Multiple Choice Options -->
      <div class="form-section">
        <h2>Answer Options</h2>
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

      <!-- Explanations -->
      <div class="form-section">
        <h2>Explanations</h2>
        <div class="form-group">
          <label for="explanation">Primary Explanation:</label>
          <textarea id="explanation" v-model="newEntry.explanation"></textarea>
        </div>
        <div class="form-group">
          <label for="explanation2">Secondary Explanation:</label>
          <textarea id="explanation2" v-model="newEntry.explanation2"></textarea>
        </div>
      </div>

      <!-- Media -->
      <div class="form-section">
        <h2>Media</h2>
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

      <!-- Podcast Episodes -->
      <div class="form-section">
        <h2>Podcast Episodes</h2>
        <div v-for="(episode, index) in ['podcastEpisode', 'podcastEpisode2']" :key="index">
          <h3>Episode {{ index + 1 }}</h3>
          <div class="form-group">
            <label :for="`${episode}-title`">Title:</label>
            <input type="text" :id="`${episode}-title`" v-model="newEntry[episode].title" />
          </div>
          <div class="form-group">
            <label :for="`${episode}-url`">Episode URL:</label>
            <input type="text" :id="`${episode}-url`" v-model="newEntry[episode].EpisodeUrl" />
          </div>
          <div class="form-group">
            <label :for="`${episode}-audio`">Audio URL:</label>
            <input type="text" :id="`${episode}-audio`" v-model="newEntry[episode].audioUrl" />
          </div>
          <div class="form-group">
            <label :for="`${episode}-desc`">Description:</label>
            <textarea :id="`${episode}-desc`" v-model="newEntry[episode].description"></textarea>
          </div>
          <div class="form-group">
            <label :for="`${episode}-time`">Start Time (seconds):</label>
            <input type="number" :id="`${episode}-time`" v-model="newEntry[episode].podcastStartTime" min="0" />
          </div>
        </div>
      </div>

      <!-- Cautions -->
      <div class="form-section">
        <h2>Cautions</h2>
        <div class="form-group">
          <label for="cautionLevel">Caution Level:</label>
          <input type="text" id="cautionLevel" v-model="newEntry.cautionLevel" />
        </div>
        <div class="form-group">
          <label for="caution">Caution Text:</label>
          <textarea id="caution" v-model="newEntry.caution"></textarea>
        </div>
      </div>

      <!-- Citations -->
      <div class="form-section">
        <h2>Citations</h2>
        <button type="button" @click="addCitation">Add Citation</button>
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
          <button type="button" @click="removeCitation(index)">Remove Citation</button>
        </div>
      </div>

      <!-- Resources -->
      <div class="form-section">
        <h2>Resources</h2>
        <button type="button" @click="addResource">Add Resource</button>
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
          <button type="button" @click="removeResource(index)">Remove Resource</button>
        </div>
      </div>

      <!-- Closing -->
      <div class="form-section">
        <h2>Closing</h2>
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

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase';
import { quizStore } from '../stores/quizStore';

export default {
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
  data() {
    return {
      store: quizStore()
    };
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

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
  border: 1px solid #eee;
  border-radius: 4px;
}

h2 {
  margin-bottom: 15px;
  color: #333;
}

h3 {
  margin-bottom: 10px;
  color: #666;
}
</style>
