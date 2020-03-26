<template>
    <v-navigation-drawer app
            v-resize="onResize"
            :color="theme_style.navigation.panel.color"
            :expand-on-hover="expandOnHover"
            :mini-variant="miniVariant"
            :right="right"
            mobile-break-point="600"
            absolute
            dark>
        <v-img :aspect-ratio="16/9" :src="theme_style.navigation.panel.bg_img" style="margin-bottom: 5px">
            <v-list dense nav class="py-0">
                <v-list-item>
                    <v-list-item-avatar class="avatar-style">
                        <img :src="theme_style.app.logo">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title    :style="{
                            'color': theme_style.navigation.panel.title.color,
                            'font-size' : theme_style.navigation.panel.title.font_size}"><b>Application</b></v-list-item-title>
                        <v-list-item-subtitle :style="{
                            'color': theme_style.navigation.panel.subtitle.color,
                            'font-size' : theme_style.navigation.panel.subtitle.font_size
                        }">Subtext</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-img>
        <v-list dense nav class="py-0">
            <v-list-item v-for="item in items" :key="item.title" link>
                <v-row @click="open(item.title)">
                    <v-list-item-icon >
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-row>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "NavigationPanel",
        props: ['theme_style'],
        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Home', icon: 'mdi-home' },
                    { title: 'Photos', icon: 'mdi-image' },
                    { title: 'About', icon: 'mdi-help-box' },
                ],
                right: false,
                miniVariant: false,
                expandOnHover: false,
                background: false,
            }
        },
        mounted () {
            this.onResize();
        },
        methods: {
            onResize () {
                if (this.$vuetify.breakpoint.sm) {
                    this.miniVariant = true;
                    this.expandOnHover = true;
                }
                else{
                    this.miniVariant = false;
                    this.expandOnHover = false;
                }
            },
            open(title){
                // eslint-disable-next-line no-unused-vars
                this.$router.push('/' + title.toLowerCase()).catch(err => {});
            },
        },
        computed: {
        },
    }
</script>

<style scoped>
    .avatar-style{
        margin-left: -10px !important;
        background-color: #eeeeee;
        box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
    }
</style>
