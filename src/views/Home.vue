<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 :style="{'color': theme_style.navigation.panel.title.color}">Welcome to demo of algorithms</h1>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col cols="12">
          <h2 :style="{'color': theme_style.navigation.panel.subtitle.color}" class="font-italic">"This single page application was developed as <span style="color: #ffd600">a home project</span> for <span style="color: indianred">SP20 CIS295-OL 79347</span> - Web Application Development"</h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <school-info :theme="theme_style"></school-info>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

import SchoolInfo from "../components/SchoolInfo";
export default {
  name: 'Home',
  components: {SchoolInfo},
  props :['theme_style'],
}
</script>

<style>
  .tab4 {
    tab-size: 4;
  }
</style>
