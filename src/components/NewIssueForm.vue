<template>
    <form @submit.prevent="submitIssue" class="mb-8 bg-gray-800 p-4 rounded-md">
        <div class="mb-4">
            <label for="title" class="block text-sm font-medium mb-2">Title</label>
            <input type="text" id="title" v-model="issueData.title" required
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
                placeholder="Issue title">
        </div>
        <div class="mb-4">
            <label for="body" class="block text-sm font-medium mb-2">Description</label>
            <textarea id="body" v-model="issueData.body" rows="4"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
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

export default {
    name: 'NewIssueForm',
    emits: ['submit', 'cancel'],
    setup(props, { emit }) {
        const issueData = ref({
            title: '',
            body: ''
        })

        const submitIssue = () => {
            emit('submit', { ...issueData.value })
            issueData.value = { title: '', body: '' }
        }

        return {
            issueData,
            submitIssue
        }
    }
}
</script>