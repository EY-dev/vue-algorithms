<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 :style="{'color': theme_style.navigation.panel.title.color}">Welcome {{getLogIn()}} to demo of algorithms</h1>
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
import {getCookie, setCookie} from "../Cookies";
export default {
  name: 'Home',
  components: {SchoolInfo},
  props :['theme_style'],
  data: () => ({
    info: {login : "", auth : 0},
  }),
  methods:{
    logOut(){
      const headers = { 'Content-Type': 'application/json' };
      fetch('http://cisweb.chemeketa.edu/student/eesaulov/api.php?method=logout', { headers })
              .then(response => response.json())
              .then(data => {
                this.error = (data.error !== "") ? data.error : "";
                if (this.error === ''){
                  setCookie('Authentication','Failed',1);
                  setCookie('login', 'web-user', 1);
                  setCookie('auth', 0, 1);
                  this.$router.push('/login');
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
    },
    getAuth(){
      return parseInt(getCookie('auth'));
    },
    getLogIn(){
      let user = getCookie('login');
      return (user ==='web-user') ? '' : user;
    },
  },

  created() {
    this.getAuth();
    this.getLogIn();
  }
}
</script>

<style>
  .tab4 {
    tab-size: 4;
  }
</style>
