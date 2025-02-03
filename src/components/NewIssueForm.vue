<template>
    <form @submit.prevent="submitIssue" class="mb-8 bg-gray-800 p-4 rounded-md">
        <div class="mb-4">
            <label for="template" class="block text-sm font-medium mb-2">Issue Type</label>
            <select id="template" v-model="selectedTemplate" @change="applyTemplate"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500">
                <option value="">Choose a type...</option>
                <optgroup label="Add/Edit Content">
                    <option value="new-quiz">NEW QUIZ ITEM</option>
                    <option value="improve">Improve existing quiz item</option>
                </optgroup>
                <optgroup label="User Feedback">
                    <option value="feedback">In-app feedback</option>
                </optgroup>
                <optgroup label="Application Software Issues">
                    <option value="bug">Bug report</option>
                    <option value="feature">Feature request</option>
                    <option value="blank">Blank issue</option>
                </optgroup>
            </select>
            <p class="mt-1 text-sm text-gray-400">{{ templateDescriptions[selectedTemplate] || 'Select an issue type' }}
            </p>
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

const templateDescriptions = {
    'new-quiz': 'Start a new quiz item from scratch.',
    'improve': 'How can we make a quiz item better?',
    'feedback': 'Brought over from the app user records',
    'bug': 'Something broken? Create a report to help us improve',
    'feature': 'Suggest an idea for this project',
    'blank': 'Create a new issue from scratch'
}

const templates = {
    'new-quiz': `### Quiz Item Details
* Topic/Subject:
* Difficulty Level:
* Target Age Group:

### Question
[Enter the quiz question here]

### Answer Options
1. 
2. 
3. 
4. 

### Correct Answer
[Specify the correct answer and explain why]

### Additional Notes
[Any additional context or educational value]`,

    'improve': `### Current Quiz Item
[Link or reference to the existing quiz item]

### Suggested Improvements
[Describe what could be improved]

### Why This Improvement?
[Explain the educational or engagement benefit]

### Additional Context
[Any other relevant information]`,

    'feedback': `### User Feedback
[Enter the feedback received from the app]

### Context
* App Version:
* User Type:
* Feature/Section:

### Action Items
[Any specific actions needed based on this feedback]`,

    'bug': `### Description
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

    'feature': `### Problem
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

### Proposed Solution
A clear and concise description of what you want to happen.

### Alternative Solutions
A clear and concise description of any alternative solutions or features you've considered.

### Additional Context
Add any other context about the feature request here.`,

    'blank': ''
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
            templateDescriptions,
            applyTemplate,
            submitIssue
        }
    }
}
</script>

<style scoped>
/* Add styling for the option groups */
optgroup {
    color: #9CA3AF;
    /* text-gray-400 */
    font-weight: 600;
}

option {
    color: white;
    font-weight: normal;
    padding: 8px;
}
</style>