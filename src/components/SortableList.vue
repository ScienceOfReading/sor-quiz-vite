<template>
    <div class="sortable-list">
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="mb-4">{{ instructions }}</p>

        <draggable v-model="localItems" item-key="id" :disabled="disabled" @end="onDragEnd" :animation="300">
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
import draggable from 'vuedraggable';

export default {
    name: 'SortableList',
    components: {
        draggable,
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
        };
    },
}
</script>

<style scoped>
.sortable-list {
    max-width: 28rem;
    margin: 0 auto;
}

.list-group-item {
    padding: 0.75rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-top: none;
    cursor: move;
    transition: all 0.3s ease;
}

.list-group-item:first-child {
    border-top: 1px solid #e2e8f0;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
}

.list-group-item:last-child {
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
}

.sortable-drag {
    opacity: 0.5;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-leave-active {
    position: absolute;
}
</style>
