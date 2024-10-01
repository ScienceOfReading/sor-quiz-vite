<template>
    <div class="sortable-list">
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="mb-4">{{ instructions }}</p>
        <p>Debug: Items count: {{ localItems.length }}</p>

        <!-- Add this section to display items without draggable -->
        <div v-if="!useDraggable">
            <div v-for="item in localItems" :key="item.id" class="list-group-item">
                {{ item.text }}
            </div>
        </div>

        <draggable v-else v-model="localItems" item-key="id" :disabled="disabled" class="list-group" ghost-class="ghost"
            @end="onDragEnd">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.text }}
                </div>
            </template>
        </draggable>

        <div v-if="showFeedback" class="mt-4">
            <p v-if="isCorrect" class="text-green-600">Correct! Well done!</p>
            <p v-else class="text-red-600">Not quite right. Try again!</p>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default {
    name: 'SortableList',
    components: {
        draggable: VueDraggableNext,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        correctOrder: {
            type: Array,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const localItems = ref([...props.items]);
        const showFeedback = ref(false);
        const useDraggable = ref(false); // Add this line

        console.log('SortableList setup - items:', props.items);
        console.log('SortableList setup - localItems:', localItems.value);

        const isCorrect = computed(() => {
            return localItems.value.every((item, index) => item.id === props.correctOrder[index]);
        });

        const onDragEnd = () => {
            showFeedback.value = true;
            emit('order-changed', localItems.value.map(item => item.id));
        };

        return {
            localItems,
            showFeedback,
            isCorrect,
            onDragEnd,
            useDraggable, // Add this line
        };
    },
}
</script>

<style scoped>
.sortable-list {
    @apply max-w-md mx-auto;
}

.list-group {
    @apply border border-gray-300 rounded-md overflow-hidden;
}

.list-group-item {
    @apply p-3 bg-white border-b border-gray-300 cursor-move;
}

.list-group-item:last-child {
    @apply border-b-0;
}

.ghost {
    @apply opacity-50 bg-gray-100;
}
</style>
