<template>
  <div>
      {{message}}
  </div>
</template>

<script>
export default {
    name: 'AppErrorMessage',
    props: {
        message: {
            type: String,
            required: false,
            //Для дефолтного знасения
            default: 'Something gona wrong',
        },
    },
}
</script>

<style>

</style>