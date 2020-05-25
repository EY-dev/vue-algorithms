<template>
  <v-app>
    <navigation-panel :theme_style="curStyle" :auth="auth" @new-auth="newAuth"></navigation-panel>
    <!-- Sizes your content based upon application components -->
    <v-content :style="{'background-color': curStyle.content.background_color}">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view :theme_style="curStyle" @new-auth="newAuth"></router-view>
      </v-container>
    </v-content>
    <my-footer @update-style="newStyle" :theme_style="curStyle"></my-footer>
  </v-app>
</template>

<script>

import NavigationPanel from "./components/NavigationPanel";
import MyFooter from "./components/MyFooter";
import {getTheme, setTheme} from "./themes";
import {setCookie} from "./Cookies";
export default {
  name: 'App',
  components: { MyFooter, NavigationPanel },

  data: () => ({
    curStyle : {},
    auth:0,
  }),

  methods:{
    async accept() {
      this.showUpgradeUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
    newAuth(value){
      this.auth = value;
    },
    newStyle(style){
      this.curStyle = setTheme(style);
    },
    getUser(){
      const headers = { 'Content-Type': 'application/json' };
      fetch('http://cisweb.chemeketa.edu/student/eesaulov/api.php?method=get-user', { headers })
              .then(response => response.json())
              .then(data => {
                if (data.error === ""){
                  setCookie('Authentication','Success',1);
                  setCookie('login', data.result.username, 1);
                  setCookie('auth', data.result.auth, 1);
                  this.auth = parseInt(data.result.auth)
                }
                else{
                  setCookie('Authentication','Failed',1);
                  setCookie('login', 'web-user', 1);
                  setCookie('auth', 0, 1);
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
    },
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
    this.curStyle = getTheme();
    this.getUser();
  }
};
</script>
