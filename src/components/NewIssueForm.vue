<template>
    <form @submit.prevent="submitIssue" class="mb-8 bg-gray-800 p-4 rounded-md">
        <div class="mb-4">
            <label for="template" class="block text-sm font-medium mb-2">Issue Type</label>
            <select id="template" v-model="selectedTemplate" @change="applyTemplate"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500">
                <option value="">Choose a type...</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="question">Question</option>
            </select>
        </div>
        <div class="mb-4">
            <label for="title" class="block text-sm font-medium mb-2">Title</label>
            <input type="text" id="title" v-model="issueData.title" required
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
                placeholder="Issue title">
        </div>
        <div class="mb-4">
            <label for="body" class="block text-sm font-medium mb-2">Description</label>
            <textarea id="body" v-model="issueData.body" rows="8"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
                placeholder="Describe the issue"></textarea>
        </div>
        <div class="flex justify-end gap-3">
            <button type="button" @click="$emit('cancel')" class="px-4 py-2 text-gray-400 hover:text-white">
                Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                Create Issue
            </button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'

const templates = {
    bug: `### Description
A clear and concise description of the bug.

### Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

### Expected Behavior
A clear description of what you expected to happen.

### Actual Behavior
A clear description of what actually happened.

### Additional Context
Add any other context about the problem here.`,

    feature: `### Problem
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

### Proposed Solution
A clear and concise description of what you want to happen.

### Alternative Solutions
A clear and concise description of any alternative solutions or features you've considered.

### Additional Context
Add any other context or screenshots about the feature request here.`,

    question: `### Question
What would you like to know?

### Context
Add any context that might help us answer your question.

### What I've Tried
Describe what you've already tried or researched.`
}

export default {
    name: 'NewIssueForm',
    emits: ['submit', 'cancel'],
    setup(props, { emit }) {
        const issueData = ref({
            title: '',
            body: ''
        })
        const selectedTemplate = ref('')

        const applyTemplate = () => {
            if (selectedTemplate.value) {
                issueData.value.body = templates[selectedTemplate.value]
            } else {
                issueData.value.body = ''
            }
        }

        const submitIssue = () => {
            emit('submit', {
                ...issueData.value,
                labels: selectedTemplate.value ? [`type:${selectedTemplate.value}`] : []
            })
            issueData.value = { title: '', body: '' }
            selectedTemplate.value = ''
        }

        return {
            issueData,
            selectedTemplate,
            applyTemplate,
            submitIssue
        }
    }
}
</script>