<template>
    <span v-if="true">
        <font-awesome-icon icon="fa-regular fa-circle-question" size="xl" />
    </span>
    <span v-else>
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
            type: Number,
            required: true
        },
    },
    data() {
        console.log("OptionIcon data");
    }
}

</script>