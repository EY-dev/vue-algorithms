<template>
    <v-footer app
              absolute
              dark
              :color="theme_style.footer.panel.color">
        <v-card style="background-color: inherit;"
                flat
                tile
                width="100%"
                class=" text-right">
            <v-btn title="Next theme"
                   @click="switchTheme()"
                   class="mx-4"
                   dark
                   icon>
                <v-icon x-large :color="theme_style.footer.icon.color">color_lens</v-icon>
            </v-btn>
        </v-card>
    </v-footer>
</template>

<script>
    import {getCookie} from "../Cookies";
    export default {
        name: "MyFooter",
        props: ['theme_style'],
        data: () => ({
            iconTheme : 'mdi-view-dashboard',//color_lens
        }),
        methods:{
            setTheme(style){
                this.$emit('update-style', style)
            },
            switchTheme(){
                const currentTheme = getCookie('theme');
                switch (currentTheme) {
                    case 'black':{
                        this.setTheme('white');
                        break;
                    }
                    case 'white':{
                        this.setTheme('black');
                        break;
                    }
                    default:{
                        this.setTheme('black');
                    }
                }
            },
        },
        computed: {

        },
    }
</script>

<style scoped>

</style>
