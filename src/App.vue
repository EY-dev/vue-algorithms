<template>
  <v-app>
    <navigation-panel :theme_style="curStyle"></navigation-panel>
    <!-- Sizes your content based upon application components -->
    <v-content :style="{'background-color': curStyle.content.background_color}">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view :theme_style="curStyle"></router-view>
      </v-container>
    </v-content>
    <my-footer @update-style="newStyle" :theme_style="curStyle"></my-footer>
  </v-app>
</template>

<script>

import NavigationPanel from "./components/NavigationPanel";
import MyFooter from "./components/MyFooter";
import {getTheme} from "./themes";
import {setCookie} from "./Cookies";
export default {
  name: 'App',
  components: { MyFooter, NavigationPanel },

  data: () => ({
    curStyle : {},
  }),

  methods:{
    newStyle(style){
      setCookie('theme',style,365);
      this.curStyle = getTheme(style);
    },
  },
  created() {
    this.curStyle = getTheme();
  }
};
</script>
