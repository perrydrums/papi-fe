<template>

</template>

<script>
    import router from '../../router'
    export default {
      data() {
        return {
        }
      },
      created() {
        this.getFrom();
      },
      methods: {

        getFrom(uri = null) {
          console.log(fetch('http://188.226.146.18/api/websites'));
        }
      }
    }
</script>

<style>

</style>
