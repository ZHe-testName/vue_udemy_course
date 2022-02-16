<template>
    <ul class="error-messages">
        <li 
            v-for="errorMesage of errorMessages"
            :key="errorMesage"
        >{{errorMesage}}</li>
    </ul>
</template>

<script>
export default {
    name: 'AppValidationErrors',
    props: {
        validationErrors: {
            type: Object,
            required: true,
        },
    },
    computed: {
        errorMessages() {
            return Object
                        .keys(this.validationErrors)
                        .map(name => {
                            const message = this.validationErrors[name].join(', ');

                            return `${name}: ${message}`;
                        });
        },
    }
}
</script>

<style>

</style>