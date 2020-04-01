<template>
        <v-card :style="{'background-color': theme_style.footer.panel.color}" style="padding: 12px">
            <v-row>
                <v-col cols="3" sm="2"  md="2" lg="1" style="min-width: 145px">
                    <h4 :style="{'color' : theme_style.footer.icon.color}">
                        Length of array:
                    </h4>
                </v-col>
                <v-col cols="5" sm="8" md="9" lg="9" style="margin-left: -20px; margin-top: -5px;">
                    <v-slider min="0"
                            v-model="arr_length"
                            :max="max"
                            :vertical="false"
                            :color="theme_style.footer.icon.color"
                    ></v-slider>
                </v-col>
                <v-col cols="2"  sm="1" md="1" lg="1" style="min-width: 25px; margin-left: -20px;">
                    <code style="font-size: 16px;" :style="{'background-color': theme_style.navigation.panel.color, 'color':theme_style.navigation.link.selected_color}">{{arr_length}}</code>
                </v-col>
            </v-row>
            <v-row justify="end" style="padding-right: 12px;">
                <v-col class="text-right" cols="12" sm="4" style="padding-top: 0;">
                    <div class="my-2">
                        <v-btn class="ma-2" block tile color="indigo" @click="stopDoing()" :style="{'color':theme_style.navigation.link.text_color}">Stop</v-btn>
                    </div>
                </v-col>
                <v-col class="text-right" cols="12" sm="4" style="padding-top: 0;">
                    <div class="my-2">
                        <v-btn class="ma-2" block tile color="indigo" @click="createArray()" :style="{'color':theme_style.navigation.link.text_color}">Create array</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
    export default {
        name: "ArraySettings",
        props: ['theme_style'],
        data: () => ({
            max:100,
            arr_length : 0,//color_lens
        }),
        methods:{
            createArray(){
                this.$emit('stop-doing');
                let arr = [];
                for (let i = 0; i < this.arr_length; i++){
                    arr[i] = Math.round(Math.random() * 350);
                }
                this.$emit('get-array', arr, this.max)
            },
            stopDoing(){
                this.$emit('stop-doing')
            },
            getMaxWidth(){
                let max = window.innerWidth;
                let constant = 56;
                if (this.$vuetify.breakpoint.sm) {
                    constant += 56;
                }
                else if (this.$vuetify.breakpoint.xs) {
                    constant += 0;
                }
                else {
                    constant += 256;
                }
                return max - constant;
            },
            onResize() {
                this.max = this.getMaxWidth()
            }
        },
        mounted () {
            this.max = this.getMaxWidth();
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        },
    }
</script>

<style scoped>

</style>
