<template>
    <div style="margin-left: -12px; margin-right: -12px; margin-top: -12px">
        <array-settings :theme_style="theme_style" @get-array="getRandomArray" @stop-doing="stopWorking" @new-speed="newSpeed"></array-settings>
        <v-row class="custom-row">
            <v-col cols="12">
                <v-card id="canvas" :style="{'background-color' : theme_style.footer.panel.color}">
                    <array-painter v-if="render" :theme_style="theme_style" :arr="arr" :max="max" :elements="elements" :speed="Math.floor(speed/1000)" @selected-item-value="newSelectedValue"></array-painter>
                    <canvas v-else class="sort-canvas"></canvas>
                    <v-card-title style="margin-top: -64px; padding-bottom: 0; z-index: 150" :style="{'color': theme_style.navigation.panel.title.color,}">
                        <b>Current Algorithm:</b> {{currentAlgorithm.name}}
                    </v-card-title>
                    <v-card-text class="text--primary" style="padding-top: 10px;" :style="{'background-color' : theme_style.navigation.panel.color}">
                        <v-row>
                            <v-col cols="12" sm="6">
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
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div :style="{'color':theme_style.navigation.link.text_color}">
                                    <div>Value in memory:
                                        <code style="font-size: 16px;"
                                              :style="{
                                'background-color': theme_style.navigation.panel.color,
                                'color':theme_style.navigation.link.selected_color}">
                                            {{currentAlgorithm.memory}}
                                        </code>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="custom-row">
            <v-col cols="12">
               <v-row>
                   <v-col cols="12" sm="4" lg="3">
                       <v-btn  tile block large color="warning" @click="bubbleSort(arr)" >Bubble Sort</v-btn>
                   </v-col>
                   <v-col cols="12" sm="4" lg="3">
                       <v-btn  tile block large color="warning" @click="selectionSort(arr)" >Selection Sort</v-btn>
                   </v-col>
                   <v-col cols="12" sm="4" lg="3">
                       <v-btn  tile block large color="warning" @click="insertionSort(arr)" >Insertion Sort</v-btn>
                   </v-col>
                   <v-col cols="12" sm="4" lg="3">
                       <v-btn  tile block large color="warning" @click="quickSortPrep(arr)" >Quick Sort</v-btn>
                   </v-col>
               </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import ArraySettings from "../components/ArraySettings";
    import ArrayPainter from "../components/ArrayPainter";
    import { delay } from "../Async/index"
    // eslint-disable-next-line no-unused-vars
    import {sleep} from "../Async";
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
            speed : 3100,
            skip : false,
            currentAlgorithm: {
                name : '',
                complexity : '',
                memory: '',
            },
            elements: {i : -1, j : -1, k: -1, swap : false,},
        }),
        methods:{
            getRandomArray(arr, max){
                this.render = false;
                this.stopAlgorithm = false;
                const self = this;
                setTimeout(function () {
                    self.arr = arr;
                    self.max = max;
                    self.render = (arr.length > 0);
                }, 1);
            },
            newSpeed(speed, skip){
                this.skip = skip;
                this.speed = speed;
            },
            newSelectedValue(value){
                this.selectedValue = value;
            },
            stopWorking(){
                this.stopAlgorithm = true;
            },
            renderArray(arr, i, j, swap, k = -1){
                const self = this;
                setTimeout(function () {
                    self.arr = arr;
                    self.render = (arr.length > 0);
                    self.elements.i = i;
                    self.elements.j = j;
                    self.elements.k = k;
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
                        if (!this.skip){
                            this.renderArray(inputArr, j, j + 1, false);
                            await delay(this.speed/6);
                        }
                        if (inputArr[j] > inputArr[j + 1]) {
                            if (!this.skip){
                                this.renderArray(inputArr, j, j + 1, true);
                                await delay(this.speed);
                            }
                            let tmp = inputArr[j];
                            inputArr[j] = inputArr[j + 1];
                            inputArr[j + 1] = tmp;
                        }
                    }
                    if (this.stopAlgorithm){break;}
                }
                inputArr = inputArr.concat();
                this.renderArray(inputArr, -1, -1);
                return inputArr;
            },
            async selectionSort(inputArr) {
                this.stopAlgorithm = false;
                this.currentAlgorithm.name = 'Selection Sort';
                this.currentAlgorithm.complexity = 'O(n^2)';
                this.renderArray(inputArr, 0, 0);
                const len = inputArr.length;
                for (let i = 0; i < len-1; i++) {
                    if (this.stopAlgorithm){break;}
                    let min = i;
                    for (let j = i+1; j < len; j++) {
                        if (this.stopAlgorithm){break;}
                        if (!this.skip){
                            this.renderArray(inputArr, min, j, false, i);
                            await delay(this.speed/6);
                        }
                        if (inputArr[j] < inputArr[min]) {
                            min = j;
                        }
                    }
                    if (!this.skip){
                        this.renderArray(inputArr, min, i, true, i);
                        await delay(this.speed);
                    }
                    let t = inputArr[min]; inputArr[min] = inputArr[i]; inputArr[i] = t;
                }
                inputArr = inputArr.concat();
                this.renderArray(inputArr, -1, -1);
                return inputArr;
            },
            async insertionSort(inputArr) {
                this.stopAlgorithm = false;
                this.currentAlgorithm.name = 'Insertion Sort';
                this.currentAlgorithm.complexity = 'O(n^2)';
                this.renderArray(inputArr, 0, 0);
                const len = inputArr.length;
                for (let i = 0; i < len; i++) {
                    if (this.stopAlgorithm){break;}
                    const v = inputArr[i];
                    this.currentAlgorithm.memory = v;
                    inputArr[i] = 0;
                    let j = i - 1;
                    if (!this.skip){
                        this.renderArray(inputArr, i, j, false, i + 1);
                        await delay(this.speed/6);
                    }
                    while (j >= 0 && inputArr[j] > v) {
                        if (this.stopAlgorithm){break;}
                        if (!this.skip){
                            this.renderArray(inputArr, j + 1, j , true, i + 1);
                            await delay(this.speed);
                        }
                        inputArr[j+1] = inputArr[j];
                        this.currentAlgorithm.memory = inputArr[j];
                        inputArr[j] = 0;
                        j--;
                    }
                    if (!this.skip){
                        this.renderArray(inputArr, j + 1, -1, false,i + 1);
                        await delay(this.speed/6);
                    }
                    inputArr[j+1] = v;
                }
                inputArr = inputArr.concat();
                this.renderArray(inputArr, -1, -1);
                return inputArr;
            },
            async quickSortPrep(inputArr){
                this.stopAlgorithm = false;
                this.currentAlgorithm.name = 'Quick Sort';
                this.currentAlgorithm.complexity = 'n * log(n)';
                this.renderArray(inputArr, 0, 0);
                this.quickSort(inputArr, 0, inputArr.length);
                inputArr = inputArr.concat();
                this.renderArray(inputArr.concat(), -1, -1);
            },
            async quickSort(arr, start, end){
                if(start < end) {
                    let pivot = await this.partition(arr, start, end);
                    this.quickSort(arr, start, pivot - 1).then(()=>{
                        this.quickSort(arr, pivot + 1, end)
                    });
                }
                this.renderArray(arr, -1, -1);
            },

            async partition (arr, start, end){
                let pivot = end;
                let i = start - 1;
                let j = start;
                while (j < pivot) {
                    if (arr[j] <= arr[pivot]) {
                        i++;
                        await this.swap(arr, j, i, pivot);
                    }
                    j++;
                }
                await this.swap(arr, i + 1, pivot);
                return i + 1
            },
            async swap(arr, firstIndex, secondIndex, pivot = -1) {
                if (!this.skip && firstIndex !== secondIndex){
                    this.renderArray(arr, firstIndex, secondIndex, true, pivot);
                    await delay(this.speed);
                }
                let temp = arr[firstIndex];
                arr[firstIndex] = arr[secondIndex];
                arr[secondIndex] = temp;
            }
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
