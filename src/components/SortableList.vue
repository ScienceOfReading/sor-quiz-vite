<template>
    <div class="sortable-list">
        <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
        <p class="mb-4">{{ instructions }}</p>

        <draggable v-model="localItems" item-key="id" :disabled="disabled" @end="onDragEnd" :animation="300"
            class="list-group">
            <template #item="{ element }">
                <div class="list-group-item">
                    {{ element.text }}
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>
import { ref } from 'vue';
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

        const onDragEnd = () => {
            emit('order-changed', localItems.value.map(item => item.id));
        };

        return {
            localItems,
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

.list-group {
    border: none;
    border-radius: 0.375rem;
    overflow: visible;
}

.list-group-item {
    padding: 0.75rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    cursor: move;
    transition: all 0.3s ease;
    color: #333;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    /* Add space between items */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    /* Optional: adds subtle shadow */
}

.list-group-item:last-child {
    margin-bottom: 0;
    /* Remove margin from last item */
}

.list-group-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e0;
}

.sortable-drag {
    opacity: 0.5;
    background-color: #e2e8f0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sortable-ghost {
    opacity: 0.5;
    background-color: #f7fafc;
}

.sortable-chosen {
    background-color: #edf2f7;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
