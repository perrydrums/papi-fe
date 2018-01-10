<template>
  <v-app>
    <!--<v-navigation-drawer app></v-navigation-drawer>-->
    <v-toolbar dark color="green">
      <v-toolbar-title class="white--text">pAPI</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!--<v-footer app></v-footer>-->
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>
