<template>
  <div class="about">
    <h1 :style="{'color': theme_style.navigation.panel.title.color}">About this Site</h1>
    <p>
      <a href="https://github.com/Euegene/vue-algorithms">GitHub Link of the project</a>
    </p>
    <p class="text-justify" :style="{'color': theme_style.navigation.panel.title.color}">
      The site was developed as an idea to show the differences between programming algorithms.
      On a SortingAlgorithms page you can see different sorting algorithms with simple animation
      which could represent the basic idea of each algorithm.<br>
      Bubble sort<br>
      Selection sort<br>
      Quick sort<br>
      Insertion sort<br>
      Gnome sort<br>
      Cocktail sort<br>
      Comb sort<br>
      I used next technology:<br>
      Vue js, CLI, Webpack, Router, Vuetify, Vuex, JavaScript, PHP, nodeJS, GenerateSW, MySQL...<br>
    </p>
  </div>
</template>

<script>

  export default {
    name: "About",
    props:['theme_style'],
    data: () => ({

    }),
    methods:{

    },
  }
</script>

<style scoped>

</style>
