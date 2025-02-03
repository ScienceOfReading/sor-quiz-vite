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
            <div v-for="issue in store.githubIssues" :key="issue.number" class="issue-item">
                <div class="issue-status">
                    <font-awesome-icon :icon="['fas', 'exclamation-circle']" class="issue-icon" />
                </div>
                <div class="issue-content">
                    <div class="issue-header">
                        <h3 class="issue-title">
                            <a :href="issue.html_url" target="_blank">
                                {{ issue.title }}
                            </a>
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
    padding: 1rem;
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
    border: 1px solid #d0d7de;
    border-radius: 6px;
}

.issue-item {
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #d0d7de;
    gap: 1rem;
}

.issue-item:last-child {
    border-bottom: none;
}

.issue-status {
    color: #1a7f37;
    padding-top: 3px;
}

.issue-icon {
    font-size: 1rem;
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
    font-weight: 600;
    font-size: 1rem;
    color: #24292f;
}

.issue-title a {
    color: inherit;
    text-decoration: none;
}

.issue-title a:hover {
    color: #0969da;
}

.issue-meta {
    font-size: 0.75rem;
    color: #57606a;
}

.issue-labels {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
}

.issue-label {
    padding: 0.125rem 0.625rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
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

:root[class~="dark"] .issue-title a:hover {
    color: #58a6ff;
}

:root[class~="dark"] .issue-meta {
    color: #8b949e;
}

:root[class~="dark"] .issue-status {
    color: #3fb950;
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