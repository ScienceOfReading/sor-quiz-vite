<template>
    <div class="github-issues">
        <h2 class="text-2xl font-bold mb-6">Quiz Issues</h2>

        <div v-if="store.githubIssuesLoading" class="loading">
            Loading issues...
        </div>

        <div v-else-if="store.githubIssuesError" class="error">
            {{ store.githubIssuesError }}
        </div>

        <div v-else class="issues-list">
            <div v-for="issue in store.githubIssues" :key="issue.number" class="issue-card">
                <h3 class="issue-title">
                    <a :href="issue.html_url" target="_blank">
                        {{ issue.title }}
                    </a>
                </h3>
                <div class="issue-meta">
                    #{{ issue.number }} opened {{ formatDate(issue.created_at) }}
                </div>
                <div class="issue-labels" v-if="issue.labels.length">
                    <span v-for="label in issue.labels" :key="label.id" class="issue-label"
                        :style="{ backgroundColor: `#${label.color}` }">
                        {{ label.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useQuizStore } from '@/stores/quizStore';

export default {
    name: 'GitHubIssues',
    setup() {
        const store = useQuizStore();

        onMounted(async () => {
            await store.fetchGitHubIssues();
        });

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString();
        };

        return {
            store,
            formatDate
        };
    }
}
</script>

<style scoped>
.github-issues {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.loading,
.error {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.error {
    color: #dc2626;
}

.issues-list {
    display: grid;
    gap: 1.5rem;
}

.issue-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    background: white;
    transition: all 0.2s;
}

.issue-card:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.issue-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.issue-title a {
    color: #2563eb;
    text-decoration: none;
}

.issue-title a:hover {
    text-decoration: underline;
}

.issue-meta {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
}

.issue-labels {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.issue-label {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    color: #1f2937;
}

:root[class~="dark"] .issue-card {
    background: #1f2937;
    border-color: #374151;
}

:root[class~="dark"] .issue-title a {
    color: #60a5fa;
}

:root[class~="dark"] .issue-meta {
    color: #9ca3af;
}
</style>