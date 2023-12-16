<template>
    <span v-if="status == 1">
        <font-awesome-icon icon="fa-regular fa-circle-question" size="xl" class="text-stone-400" />
    </span>
    <span v-else-if="status == 2">
        <font-awesome-icon icon="fa-solid fa-circle-minus" size="xl" style="color: #444444;" />
    </span>
    <span v-else-if="status == 3">
        <font-awesome-icon icon="fa-solid fa-check" size="xl" style="color: #444444;" />
    </span>
    <span v-else-if="status == 4">
        <font-awesome-icon icon="fa-regular fa-circle-check" size="xl" style="color: #00ff00" />
    </span>
    <span v-else-if="status == 5">
        <font-awesome-icon icon="fa-regular fa-circle-xmark" size="xl" style="color: #e32400;" />
    </span>
</template>
<script>
export default {
    name: "OptionIcon",
    mounted() {
    },
    props: {
        status: {
            type: String,
            required: true
        },
    },
    data() {
        console.log("OptionIcon data");
        console.log("status: ", this.status);
        return {
            status2: this.status
        }
    }
}

</script>