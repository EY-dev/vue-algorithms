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
        <v-col cols="12" sm="6">
          <code :style="{'background-color': theme_style.navigation.panel.title.color, 'color': theme_style.navigation.link.selected_color, 'font-size': fontCodeSize}" style="padding: 10px">&#60;school&#62;<br>
            &#60;school-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme_style.footer.panel.color}">Chemeketa Community College</span>&#60;/school-name&#62;<br>
            &#60;class&#62;<br>
            &#60;class-code&#62;<span class="font-italic font-weight-light" :style="{'color': theme_style.footer.panel.color}">CIS295</span>&#60;/class-code&#62;<br>
            &#60;class-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme_style.footer.panel.color}">Web Application Development</span>&#60;/class-name&#62;<br>
            &#60;instructor-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme_style.footer.panel.color}">Don Kraus</span>&#60;/instructor-name&#62;<br>
            &#60;/class&#62;<br>
            &#60;student-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme_style.footer.panel.color}">Evgenii Eugene Esaulov</span>&#60;/student-name&#62;<br>
            &#60;/school&#62;
          </code>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  props :['theme_style'],
  data: () => ({
    fontCodeSize: '18px',
  }),
  methods:{
    onResize () {
      if (this.$vuetify.breakpoint.xs){
        this.fontCodeSize = "10px";
      }
    },
  },
  created() {
    if (this.$vuetify.breakpoint.xs){
      this.fontCodeSize = "10px";
    }
  },
}
</script>

<style>
  .tab4 {
    tab-size: 4;
  }
</style>
