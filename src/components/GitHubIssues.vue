<template>
    <div class="github-issues">
        <div class="header-section">
            <h2 class="text-2xl mb-6">Quiz Issues</h2>
            <div class="issue-filters">
                <button v-for="filter in filters" :key="filter.state" @click="changeFilter(filter.state)"
                    :class="['filter-btn', { active: currentFilter === filter.state }]">
                    <font-awesome-icon :icon="filter.icon" class="mr-2" />
                    {{ filter.label }}
                    <span class="count" v-if="filter.count !== undefined">({{ filter.count }})</span>
                </button>
            </div>
        </div>

        <div v-if="store.githubIssuesLoading" class="loading">
            Loading issues...
        </div>

        <div v-else-if="store.githubIssuesError" class="error">
            {{ store.githubIssuesError }}
        </div>

        <div v-else class="issues-list">
            <div v-for="issue in filteredIssues" :key="issue.number" class="issue-item">
                <div class="issue-content">
                    <div class="issue-header">
                        <h3 class="issue-title">
                            <font-awesome-icon
                                :icon="issue.state === 'open' ? ['fas', 'exclamation-circle'] : ['fas', 'check-circle']"
                                :class="issue.state === 'open' ? 'text-green-600' : 'text-purple-600'" class="mr-2" />
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
                        #{{ issue.number }} {{ issue.state === 'open' ? 'opened' : 'closed' }} {{
                            formatDate(issue.created_at) }} by {{ issue.user.login }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { quizStore } from '../stores/quizStore';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faExclamationCircle,
    faCheckCircle,
    faList
} from '@fortawesome/free-solid-svg-icons';

// Add icons to library
library.add(faExclamationCircle, faCheckCircle, faList);

export default {
    name: 'GitHubIssues',
    setup() {
        const store = quizStore();
        const currentFilter = ref('open');

        const filters = computed(() => [
            {
                state: 'open',
                label: 'Open',
                icon: ['fas', 'exclamation-circle'],
                count: store.githubIssues.filter(i => i.state === 'open').length
            },
            {
                state: 'closed',
                label: 'Closed',
                icon: ['fas', 'check-circle'],
                count: store.githubIssues.filter(i => i.state === 'closed').length
            },
            {
                state: 'all',
                label: 'All',
                icon: ['fas', 'list'],
                count: store.githubIssues.length
            }
        ]);

        const filteredIssues = computed(() => {
            if (currentFilter.value === 'all') return store.githubIssues;
            return store.githubIssues.filter(issue => issue.state === currentFilter.value);
        });

        const changeFilter = async (filter) => {
            currentFilter.value = filter;
            await store.fetchGitHubIssues(filter);
        };

        onMounted(async () => {
            await store.fetchGitHubIssues('open');
        });

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString();
        };

        return {
            store,
            formatDate,
            filters,
            currentFilter,
            changeFilter,
            filteredIssues
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

.header-section {
    margin-bottom: 2rem;
}

.issue-filters {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.filter-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.2s;
}

.filter-btn:hover {
    background: rgba(255, 255, 255, 0.15);
}

.filter-btn.active {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.count {
    margin-left: 0.5rem;
    opacity: 0.7;
}
</style>