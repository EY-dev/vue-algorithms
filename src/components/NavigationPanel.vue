<template>
    <v-navigation-drawer app
            v-resize="onResize"
            :color="theme_style.navigation.panel.color"
            :expand-on-hover="expandOnHover"
            :mini-variant="miniVariant"
            :right="right"
            mobile-break-point="600"

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
                            'font-size' : theme_style.navigation.panel.title.font_size}"><b>Demo of algorithms</b></v-list-item-title>
                        <v-list-item-subtitle :style="{
                            'color': theme_style.navigation.panel.subtitle.color,
                            'font-size' : theme_style.navigation.panel.subtitle.font_size
                        }">Single page application</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-img>
        <v-list dense nav class="py-0">
            <v-list-item v-for="(item, index) in items" :key="item.title" link>
                <v-row @click="open(index)" v-if="auth === 0 || item.title!=='LogIn'">
                    <v-list-item-icon >
                        <v-icon :color="item.color">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title><label :style="{'color':item.color}">{{ item.title }}</label></v-list-item-title>
                    </v-list-item-content>
                </v-row>
                <v-row v-else @click="logOut()">
                    <v-list-item-icon >
                        <v-icon :color="theme_style.navigation.link.text_color">face</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title><label :style="{'color':theme_style.navigation.link.text_color}">LogOut</label></v-list-item-title>
                    </v-list-item-content>
                </v-row>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {setCookie} from "../Cookies";

    export default {
        name: "NavigationPanel",
        props: ['theme_style','auth'],
        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Home', icon: 'mdi-home', color: this.theme_style.navigation.link.text_color },
                    { title: 'Sorting Algorithms', icon: 'mdi-sort', color: this.theme_style.navigation.link.text_color },
                    { title: 'FAQ', icon: 'live_help', color: this.theme_style.navigation.link.text_color },
                    { title: 'About', icon: 'info', color: this.theme_style.navigation.link.text_color },
                    //{ title: 'News', icon: 'info', color: this.theme_style.navigation.link.text_color },
                    //{ title: 'Administration Page', icon: 'info', color: this.theme_style.navigation.link.text_color },
                    { title: 'LogIn', icon: 'face', color: this.theme_style.navigation.link.text_color },
                ],
                right: false,
                miniVariant: false,
                expandOnHover: false,
                background: false,
                currentPage : '',
            }
        },
        mounted () {
            this.onResize();
            if (this.auth > 0 ) {this.addElements();}
        },
        created() {
            const pages = window.location.pathname;
            this.getIndexCurrentPage(pages);
        },
        methods: {
            logOut(){
                const headers = { 'Content-Type': 'application/json' };
                fetch('http://cisweb.chemeketa.edu/student/eesaulov/api.php?method=logout', { headers })
                    .then(response => response.json())
                    .then(data => {
                        this.error = (data.error !== "") ? data.error : "";
                        if (this.error === ''){
                            setCookie('Authentication','Failed',1);
                            setCookie('login', 'web-user', 1);
                            setCookie('auth', 0, 1);
                            this.$emit('new-auth', 0);
                            this.open(4);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            },
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
            open(selIndex){
                for(let index in this.items){
                    this.items[index].color = (selIndex === parseInt(index)) ? this.theme_style.navigation.link.selected_color : this.theme_style.navigation.link.text_color;
                }
                // eslint-disable-next-line no-unused-vars
                this.$router.push('/' + this.items[selIndex].title.split(' ').join('-').toLowerCase()).catch(err => {});
            },
            getIndexCurrentPage(url){
                const pages = url.split('/');
                pages.forEach(element => {
                    if (element !== ''){
                        const currentElement = (link) => link.title.split(' ').join('-').toLowerCase() === element;
                        let index = this.items.findIndex(currentElement);
                        if (index > -1){
                            this.open(index);
                        }
                    }
                    else{
                        this.open(0);
                    }
                });
            },
            addElements(){
                console.log('some')
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
        box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
    }
</style>
