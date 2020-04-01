<template>
    <div style="margin-left: -12px; margin-right: -12px; margin-top: -12px">
        <array-settings :theme_style="theme_style" @get-array="getRandomArray" @stop-doing="stopWorking"></array-settings>
        <v-row class="custom-row">
            <v-col cols="12">
                <v-card id="canvas" :style="{'background-color' : theme_style.footer.panel.color}">
                    <array-painter v-if="render" :theme_style="theme_style" :arr="arr" :max="max" :elements="elements" @selected-item-value="newSelectedValue"></array-painter>
                    <canvas v-else class="sort-canvas"></canvas>
                    <v-card-title style="margin-top: -64px; padding-bottom: 0; z-index: 150" :style="{'color': theme_style.navigation.panel.title.color,}">
                        <b>Current Algorithm:</b> {{currentAlgorithm.name}}
                    </v-card-title>
                    <v-card-text class="text--primary" style="padding-top: 10px;" :style="{'background-color' : theme_style.navigation.panel.color}">
                        <div :style="{'color':theme_style.navigation.link.text_color}">
                            <div>Complexity of the algorithm:
                                <code style="font-size: 16px;"
                                      :style="{
                                'background-color': theme_style.navigation.panel.color,
                                'color':theme_style.navigation.link.selected_color}">
                                    {{currentAlgorithm.complexity}}
                                </code>
                            </div>
                            <div>
                                Last selected value:
                                <code style="font-size: 16px;"
                                      :style="{
                                'background-color': theme_style.navigation.panel.color,
                                'color':theme_style.navigation.link.selected_color}">
                                    {{selectedValue}}
                                </code>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="custom-row">
            <v-col cols="12" md="4" lg="3">
                <v-btn class="ma-2" tile large color="teal" @click="bubbleSort(arr)" >Bubble Sort</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ArraySettings from "../components/ArraySettings";
    import ArrayPainter from "../components/ArrayPainter";
    import { delay } from "../Async/index"
    export default {
        name: "SortingAlgorithms",
        components: {ArrayPainter, ArraySettings},
        props: ['theme_style'],
        data: () => ({
            arr : [],
            max: 0,
            render: false,
            stopAlgorithm: true,
            selectedValue : '',
            currentAlgorithm: {
                name : '',
                complexity : '',
            },
            elements: {i : -1, j : -1, swap : false,},
        }),
        methods:{
            getRandomArray(arr, max){
                this.render = false;
                const self = this;
                setTimeout(function () {
                    self.arr = arr;
                    self.max = max;
                    self.render = (arr.length > 0);
                }, 1);
            },
            newSelectedValue(value){
                this.selectedValue = value;
            },
            stopWorking(){
                this.stopAlgorithm = true;
            },
            renderArray(arr, i, j, swap){
                //this.render = false;
                const self = this;
                setTimeout(function () {
                    self.arr = arr;
                    self.render = (arr.length > 0);
                    self.elements.i = i;
                    self.elements.j = j;
                    self.elements.swap = swap;
                }, 1);
            },

            async bubbleSort(inputArr){
                this.stopAlgorithm = false;
                this.currentAlgorithm.name = 'Bubble Sort';
                this.currentAlgorithm.complexity = 'O(n^2)';
                this.renderArray(inputArr, 0, 0);
                let len = inputArr.length;
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len; j++) {
                        if (this.stopAlgorithm){break;}
                        this.renderArray(inputArr, j, j + 1, false);
                        await delay(500);
                        if (inputArr[j] > inputArr[j + 1]) {
                            this.renderArray(inputArr, j, j + 1, true)
                            await delay(3100);
                            let tmp = inputArr[j];
                            inputArr[j] = inputArr[j + 1];
                            inputArr[j + 1] = tmp;
                        }
                    }
                    if (this.stopAlgorithm){break;}
                }
                return inputArr;
            },
        },
    }
</script>

<style scoped>
    .sort-canvas{
        height : 400px;
        width : 100%;
        margin-bottom: -7px;
    }
    .custom-row{
        margin-left: 6px;
        margin-right: 6px;
    }
</style>
