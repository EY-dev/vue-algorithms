<template>
    <div class="login">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <sign-in v-if="login_mode" :theme="theme_style" :error="error" @clear-error="error=''" @sign-up="signUp" @submit="send"></sign-in>
                    <sign-up v-else :theme="theme_style" @sign-in="signIn" :error="error" @submit="addUser"></sign-up>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import SignIn from "../components/SignIn";
    import SignUp from "../components/SignUp";
    import {setCookie} from "../Cookies/index";
    export default {
        name: "LogIn",
        props:['theme_style'],
        components: {SignUp, SignIn},
        data: () => ({
            login_mode: true,
            form: {},
            error: '',
        }),
        methods:{
            signUp(){
                this.login_mode = false;
            },
            signIn(){
                this.login_mode = true;
            },
            send(form){
                fetch('http://cisweb.chemeketa.edu/student/eesaulov/api.php?method=authorize', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({data : form})
                })
                    .then(response => response.json())
                    .then(data => {
                        this.error = (data.error !== "") ? data.error : "";
                        if (this.error === ''){
                            setCookie('Authentication','Success',1);
                            setCookie('login', data.result.username, 1);
                            setCookie('news', data.result.news, 1);
                            setCookie('email', data.result.email, 1);
                            setCookie('auth', data.result.auth, 1);
                            this.auth = parseInt(data.result.auth);
                            this.$emit('new-auth', this.auth);
                            this.$router.push('/');
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            },
            addUser(form){
                fetch('http://cisweb.chemeketa.edu/student/eesaulov/api.php?method=sign-up', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({data : form})
                })
                    .then(response => response.json())
                    .then(data => {
                        this.error = (data.error !== "") ? data.error : "";
                        if (this.error === ''){
                            setCookie('Authentication','Success',1);
                            setCookie('login', data.result.username, 1);
                            setCookie('news', data.result.news, 1);
                            setCookie('email', data.result.email, 1);
                            setCookie('auth', data.result.auth, 1);
                            this.auth = parseInt(data.result.auth);
                            this.$emit('new-auth', this.auth);
                            this.$router.push('/');
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            },
        },
    }
</script>

<style scoped>

</style>
