<template>
    <svg class="sort-canvas" v-if="ready" xmlns="http://www.w3.org/2000/svg">
        <g v-for="(item, index) in arr" :key="'item_' + index">
            <rect style="cursor: pointer;" y="5"
                  :id="'item_' + index"
                  :x="getX(index)"
                  :width="line_width - getGap(line_width) + getAdditional(index)"
                  :height="item"
                  :style="{'fill':getColor(index)}"
                  :class="{'colorChangeRed':(index === elements.j), 'colorChangePink':(index === elements.i)}"
                  @click="light($event.target)">
                <animate v-if="elements.swap && index === elements.i" attributeName="x" :from="getX(elements.i)" :to="getX(elements.j)" :dur="speed + 's'" repeatCount="infinite" fill="freeze"/>
                <animate v-if="elements.swap && index === elements.j" attributeName="x" :from="getX(elements.j)" :to="getX(elements.i)" :dur="speed + 's'" repeatCount="infinite" fill="freeze"/>
            </rect>
        </g>
    </svg>
    <svg class="sort-canvas" v-else></svg>
</template>

<script>
    export default {
        name: "ArrayPainter",
        props: ['theme_style', 'arr', 'max', "elements", "speed"],
        data: () => ({
            ready: false,
            line_width : 0,
            padding_right : 5,
            gap : 0,
            error : 0,
        }),
        methods:{
            light(element){
                const index = parseInt(element.id.split('_')[1]);
                this.arr.forEach((element, i) => {
                    if (index === i){
                        if (document.getElementById('item_' + i).style.fill !== "rgb(255, 214, 0)"){
                            document.getElementById('item_' + i).classList.add("colorChangeYellow");
                            document.getElementById('item_' + i).style.fill = "rgb(255, 214, 0)";
                            this.$emit('selected-item-value', element);
                        }
                        else{
                            document.getElementById('item_' + i).classList.add("colorChangeBrown");
                            document.getElementById('item_' + i).style.fill = this.getColor(i);
                            this.$emit('selected-item-value', '');
                        }
                    }
                    else{
                        document.getElementById('item_' + i).style.fill = this.getColor(i);
                    }
                });
            },
            getGap(line_width){
                let gap = 0;
                if (line_width >= 6){
                    gap = 3
                }
                else if (line_width < 6 && line_width > 1){
                    gap = 1
                }
                return gap;
            },
            getAdditional(index){
                return ((index >= 0) && (this.error * this.arr.length) > index) ? 1 : 0;
            },
            getX(index){
                const multiplier = this.getAdditional(index - 1);
                let pixels = index * (this.line_width + multiplier) + this.padding_right;
                if (multiplier === 0 && index !== 0){
                    pixels += Math.floor(this.error * this.arr.length);
                }
                return pixels
            },
            // eslint-disable-next-line no-unused-vars
            getColor(index){
                let color = 'rgb(121, 82, 72)';
                if (index === this.elements.j){
                    color = 'rgb(151,5,12)';
                }
                if (index === this.elements.i){
                    color = 'rgb(197,83,252)';
                }
                return color;
            },
        },
        mounted() {
            this.gap = this.getGap(this.line_width);
            const max_local = this.max - 10;
            this.line_width = Math.floor(this.max/this.arr.length);
            this.error = Math.abs((max_local - this.arr.length  * this.line_width) / this.arr.length);
            this.ready = true;
        },
        updated() {
            document.querySelectorAll("animate").forEach(element => {
                element.beginElement();
            });
        }
    }
</script>

<style scoped>
    .sort-canvas{
        height : 400px;
        width : 100%;
        margin-bottom: -7px;
    }
    .colorChangePink{
        animation-iteration-count: 1;
        animation : changePink 1s;
    }
    .colorChangeRed{
        animation-iteration-count: 1;
        animation : changeRed 1s;
    }
    .colorChangeYellow{
        animation-iteration-count: 1;
        animation : changeYellow 1s;
    }
    .colorChangeBrown{
        animation-iteration-count: 1;
        animation : changeBrown 1s;
    }

    @keyframes changeRed {
         0%{fill:#795248}
         100%{fill: #97050C}
     }
    @keyframes changePink {
        0%{fill:#795248}
        100%{fill: #C553FC}
    }
    @keyframes changeYellow {
        0%{fill:#795248}
        100%{fill: #FFD600}
    }
    @keyframes changeBrown {
        0%{fill:#FFD600}
        100%{fill: #795248}
    }
</style>
