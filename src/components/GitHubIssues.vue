<template>
    <div class="github-issues">
        <h2 class="text-2xl mb-6">Quiz Issues</h2>

        <div v-if="store.githubIssuesLoading" class="loading">
            Loading issues...
        </div>

        <div v-else-if="store.githubIssuesError" class="error">
            {{ store.githubIssuesError }}
        </div>

        <div v-else class="issues-list">
            <div v-for="issue in store.githubIssues" :key="issue.number" class="issue-item">
                <div class="issue-content">
                    <div class="issue-header">
                        <h3 class="issue-title">
                            {{ issue.title }}
                        </h3>
                        <div class="issue-labels" v-if="issue.labels.length">
                            <span v-for="label in issue.labels" :key="label.id" class="issue-label"
                                :style="{ backgroundColor: `#${label.color}` }">
                                {{ label.name }}
                            </span>
                        </div>
                    </div>
                    <div class="issue-meta">
                        #{{ issue.number }} opened {{ formatDate(issue.created_at) }} by {{ issue.user.login }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { quizStore } from '../stores/quizStore';

export default {
    name: 'GitHubIssues',
    setup() {
        const store = quizStore();

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
    padding: 0;
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
    border: none;
    border-radius: 0;
}

.issue-item {
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    gap: 1rem;
    transition: background-color 0.2s;
}

.issue-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
}

.issue-item:last-child {
    border-bottom: none;
}

.issue-content {
    flex: 1;
    min-width: 0;
}

.issue-header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.25rem;
}

.issue-title {
    font-weight: normal;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
}

.issue-meta {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
}

.issue-labels {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
}

.issue-label {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: normal;
}

/* Dark mode */
:root[class~="dark"] .issues-list {
    border-color: #30363d;
}

:root[class~="dark"] .issue-item {
    border-bottom-color: #30363d;
}

:root[class~="dark"] .issue-title {
    color: #c9d1d9;
}

:root[class~="dark"] .issue-meta {
    color: #8b949e;
}

@media (max-width: 640px) {
    .github-issues {
        padding: 0.5rem;
    }

    .issue-item {
        padding: 0.75rem;
    }

    .issue-header {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>