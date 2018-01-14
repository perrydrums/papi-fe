<template>
  <v-app>
    <v-toolbar class="amber" flat extended height="100">
      <div class="big-title">pAPI</div>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app {
    background-color: #424242;
  }

  .big-title {
    font-size: 12em;
    color: #424242;
    transform: translate(20px, 75px);
  }
</style>
