<template>
    <div class="p-4">
        <h1 class="text-2xl mb-6">Quiz Set View</h1>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex">
                <button @click="currentTab = 'current'" :class="[
                    currentTab === 'current'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-24 py-2 px-1 text-center border-b-2 font-medium text-sm'
                ]">
                    Current
                </button>
                <button @click="currentTab = 'proposed'" :class="[
                    currentTab === 'proposed'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-24 py-2 px-1 text-center border-b-2 font-medium text-sm'
                ]">
                    Proposed
                </button>
            </nav>
        </div>

        <!-- Tab Content -->
        <div class="mt-4">
            <div v-if="currentTab === 'current'">
                Current Quiz Sets Content
            </div>
            <div v-else>
                Proposed Quiz Sets Content
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const currentTab = ref('current');
</script>