<template>
    <div class="administration">
        <v-container>
            <v-row class="text-center">
                <v-col cols="12">
                    <h1 :style="{'color': theme_style.navigation.panel.title.color}">Page Not Found</h1>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="12">
                    <h2 :style="{'color': theme_style.navigation.panel.subtitle.color}" class="font-italic">This page is not exist</h2>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "404",
        props: ['theme_style']
    }
</script>

<style scoped>

</style>
