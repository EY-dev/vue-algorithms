<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card id="canvas" class="mx-auto" :style="{'background-color' : theme_style.footer.panel.color}">
                    <canvas id="paint" class="sort-canvas"></canvas>
                    <v-card-title style="margin-top: -64px; z-index: 150" :style="{'color': theme_style.navigation.panel.title.color,}"><b>Current Algorithm:</b> </v-card-title>
                    <v-card-text class="text--primary" :style="{'background-color' : theme_style.navigation.panel.color}">
                        <div>Whitehaven Beach</div>
                        <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "SortingAlgorithms",
        props: ['theme_style'],
        data: () => ({
            canvas : {
                height : 0,
                width  : 0,
            },
            arr : [],
        }),
        methods:{
            getRandomArray(size){
                let arr = [];
                for (let i = 0; i < size; i++){
                    arr[i] = Math.round(Math.random() * 380);
                }
                return arr;
            },
        },
        mounted() {
            console.log(this.getRandomArray(100))
        }
    }
</script>

<style scoped>
    .sort-canvas{
        height : 400px;
        width : 100%;
        margin-bottom: -7px;
    }
</style>
