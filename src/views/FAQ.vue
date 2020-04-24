<template>
    <div class="faq">
        <v-container>
            <v-row class="text-center">
                <v-col cols="12">
                    <h1 :style="{'color': theme_style.navigation.panel.title.color}">FAQ</h1>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="12">
                    <h2 :style="{'color': theme_style.navigation.panel.subtitle.color}" class="font-italic">Coming Soon!</h2>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "FAQ",
        props: ['theme_style']
    }
</script>

<style scoped>

</style>
