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
                   <v-col cols="12" sm="4" lg="3" v-for="(item, index) in sortingAlgorithms" :key="'btn_' + index">
                       <v-btn  tile block large color="warning" @click="runSort(item)">{{item.name}}</v-btn>
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
            sortingAlgorithms : [],
            elements: {i : -1, j : -1, k: -1, swap : false},
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

            runSort(algorithm){
                this.stopAlgorithm = false;
                this.currentAlgorithm.name = algorithm.name;
                this.currentAlgorithm.complexity = algorithm.complexity;
                this.renderArray(this.arr, -1, -1);
                algorithm.runAlgorithm();
            },

            async bubbleSort(inputArr){
                let len = inputArr.length;
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len - i; j++) {
                        if (this.stopAlgorithm){break;}
                        if (!this.skip){
                            this.renderArray(inputArr, j, j + 1, false, len - i);
                            await delay(this.speed/6);
                        }
                        if (inputArr[j] > inputArr[j + 1]) {
                            await this.swap(inputArr, j + 1, j, len - i)
                        }
                    }
                    if (this.stopAlgorithm){break;}
                }
                inputArr = inputArr.concat();
                this.renderArray(inputArr, -1, -1);
                return inputArr;
            },
            async cocktailSort(inputArr){
                let i = 0;
                let j = inputArr.length-1;
                let s = true;
                while (i < j && s){
                    if (this.stopAlgorithm){break;}
                    s = false;
                    for (let k = i; k < j; k++){
                        if (this.stopAlgorithm){break;}
                        if (!this.skip){
                            this.renderArray(inputArr, k, k + 1, false, j + 1);
                            await delay(this.speed/6);
                        }
                        if (inputArr[k] > inputArr[k+1]){
                            await this.swap(inputArr,k ,k + 1, j + 1);
                            s = true;
                        }
                    }
                    j--;
                    if (s) {
                        s = false;
                        for (let k = j; k > i; k--){
                            if (this.stopAlgorithm){break;}
                            if (!this.skip){
                                this.renderArray(inputArr, k, k - 1, false, j + 1);
                                await delay(this.speed/6);
                            }
                            if (inputArr[k] < inputArr[k-1]){
                                await this.swap(inputArr, k,k - 1, j + 1);
                                s = true;
                            }
                        }
                    }
                    i++;
                }
                inputArr = inputArr.concat();
                this.renderArray(inputArr, -1, -1);
                return inputArr;
            },
            async combSort(inputArr) {
                const getGap = (gap) =>{
                    gap /= 1.3;
                    if (gap === 9 || gap === 10) gap = 11;
                    if (gap < 1) return 1;
                    return gap;
                };
                let len = inputArr.length, gap = len, swapped;
                do {
                    if (this.stopAlgorithm){break;}
                    swapped = false;
                    gap = Math.floor(getGap(gap));
                    for (let i = 0; i < len - gap; i++) {
                        if (this.stopAlgorithm){break;}
                        if (!this.skip){
                            this.renderArray(inputArr, i + gap, i, false,);
                            await delay(this.speed/6);
                        }
                        if (inputArr[i] > inputArr[i + gap]) {
                            swapped = true;
                            await this.swap(inputArr,i, i + gap, );
                        }
                    }
                } while (gap > 1 || swapped);
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
                            this.renderArray(inputArr, min, j, false, i - 1);
                            await delay(this.speed/6);
                        }
                        if (inputArr[j] < inputArr[min]) {
                            min = j;
                        }
                    }
                    if (!this.skip){
                        this.renderArray(inputArr, min, i, true, i - 1);
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
            async gnomeSort(inputArr) {
                this.renderArray(inputArr, 0, 0);
                const len = inputArr.length;
                let i = 1, j = 2;
                while (i < len) {
                    if (this.stopAlgorithm){break;}
                    if (inputArr[i-1] < inputArr[i]){
                        i = j;
                        j++;
                    }
                    else {
                        await this.swap(inputArr,i ,i - 1, );
                        i--;
                        if (i === 0){
                            i = j;
                            j++;
                        }
                    }
                }
                inputArr = inputArr.concat();
                this.renderArray(inputArr, -1, -1);
                return inputArr;
            },

            async quickSort(inputArr){
                const quickSort = async (arr, start, end) => {
                    const partition = async (arr, start, end) => {
                        if (this.stopAlgorithm){return;}
                        let pivot = end;
                        let i = start - 1;
                        let j = start;
                        while (j < pivot) {
                            if (!this.skip){
                                this.renderArray(arr, i + 1, j, false, pivot);
                                await delay(this.speed/6);
                            }
                            if (arr[j] < arr[pivot]) {
                                i++;
                                await this.swap(arr, j, i, pivot);
                            }
                            j++;
                        }
                        await this.swap(arr, i + 1, pivot);
                        return i + 1
                    };
                    if (this.stopAlgorithm) {return;}
                    if (start < end) {
                        let pivot = await partition(arr, start, end);
                        await quickSort(arr, start, pivot - 1);
                        await quickSort(arr, pivot + 1, end);
                    }
                    this.renderArray(arr, -1, -1);
                };
                await quickSort(inputArr, 0, inputArr.length - 1);
                inputArr = inputArr.concat();
                this.renderArray(inputArr, -1, -1);
            },

            async swap(arr, firstIndex, secondIndex, pivot = -1) {
                if (this.stopAlgorithm){return;}
                if (!this.skip && firstIndex !== secondIndex){
                    this.renderArray(arr, secondIndex, firstIndex, true, pivot);
                    await delay(this.speed);
                }
                let temp = arr[firstIndex];
                arr[firstIndex] = arr[secondIndex];
                arr[secondIndex] = temp;
            }
        },
        mounted() {
            this.sortingAlgorithms = [
                {name: "Bubble Sort",    complexity: "O(n^2)",     runAlgorithm: async () => {await this.bubbleSort(this.arr)}},
                {name: "Selection Sort", complexity: "O(n^2)",     runAlgorithm: async () => {await this.selectionSort(this.arr)}},
                {name: "Insertion Sort", complexity: "O(n^2)",     runAlgorithm: async () => {await this.insertionSort(this.arr)}},
                {name: "Quick Sort",     complexity: "n * log(n)", runAlgorithm: async () => {await this.quickSort(this.arr)}},
                {name: "Cocktail Sort",  complexity: "O(n^2)",     runAlgorithm: async () => {await this.cocktailSort(this.arr)}},
                {name: "Gnome Sort",     complexity: "O(n^2)",     runAlgorithm: async () => {await this.gnomeSort(this.arr)}},
                {name: "Comb Sort",      complexity: "O(n^2)",     runAlgorithm: async () => {await this.combSort(this.arr)}},
            ];
        }
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
