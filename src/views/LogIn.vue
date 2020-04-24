<template>
    <div class="login">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <sign-in v-if="login_mode" :theme="theme_style" @sign-up="signUp" @submit="send"></sign-in>
                    <sign-up v-else :theme="theme_style" @sign-in="signIn" @submit="send"></sign-up>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import SignIn from "../components/SignIn";
    import SignUp from "../components/SignUp";
    export default {
        name: "LogIn",
        props:['theme_style'],
        components: {SignUp, SignIn},
        data: () => ({
            login_mode: true,
            form: {},
        }),
        methods:{
            signUp(){
                this.login_mode = false;
            },
            signIn(){
                this.login_mode = true;
            },
            send(form){
                console.log(form);
            },
        },
    }
</script>

<style scoped>

</style>
