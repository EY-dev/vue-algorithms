<template>
    <div class="faq">
        <v-container>
            <v-row class="text-center">
                <v-col cols="12">
                    <h1 :style="{'color': theme_style.navigation.panel.title.color}">My Account</h1>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="12">
                    <v-btn color="warning" block @click="logOut()">Log Out</v-btn>
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
    import {setCookie} from "../Cookies";

    export default {
        name: "AccountPage",
        props: ['theme_style'],
        methods:{
            logOut(){
                const headers = { 'Content-Type': 'application/json' };
                fetch('http://cisweb.chemeketa.edu/student/eesaulov/api.php?method=logout', { headers })
                    .then(response => response.json())
                    .then(data => {
                        this.error = (data.error !== "") ? data.error : "";
                        if (this.error === ''){
                            setCookie('Authentication','Failed',1);
                            this.$router.push('/login');
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        },
    }

</script>

<style scoped>

</style>
