<template>
    <v-card class="elevation-12" :color="theme.content.background_color">
        <v-toolbar :color="theme.navigation.panel.color" flat>
            <v-toolbar-title :style="{'color':theme.navigation.link.text_color}">Sign Up form</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        name="login"
                        label="UserName"
                        prepend-icon="person"
                        type="text"
                        v-model="form.login"
                        @keyup="error=''"
                >
                    <v-icon slot="prepend" :color="theme.navigation.panel.title.color">
                        person
                    </v-icon>
                </v-text-field>
                <v-text-field
                        id="password"
                        name="password"
                        label="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="form.pwd"
                        @keyup="error=''"
                >
                    <v-icon slot="prepend" :color="theme.navigation.panel.title.color">
                        lock
                    </v-icon>
                </v-text-field>
                <v-text-field
                        id="second-password"
                        label="confirm password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="form.secPwd"
                        @keyup="error=''"
                >
                    <v-icon slot="prepend" :color="theme.navigation.panel.title.color">
                        vpn_key
                    </v-icon>
                </v-text-field>
                <v-text-field
                        name="email"
                        label="email"
                        prepend-icon="person"
                        type="text"
                        v-model="form.email"
                        @keyup="error=''"
                >
                    <v-icon slot="prepend" :color="theme.navigation.panel.title.color">
                        email
                    </v-icon>
                </v-text-field>
                <v-row>
                    <v-col cols="12">
                        <p style = "text-align: center; color: indianred" >{{error}}</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-btn color="warning" block @click="signIn()">SignIn</v-btn>
                    </v-col>
                    <v-col md="4">
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-btn color="success" block @click="submit()">Register</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "SignIn",
        props: ['theme'],
        data: () => ({
            form: {email: "", login : "", pwd : "", secPwd: ""},
            error: "",
            // eslint-disable-next-line no-useless-escape
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        }),
        methods:{
            signIn(){
                this.$emit('sign-in');
            },
            submit(){

                if (this.validateForm()){
                    this.$emit('submit', this.form);
                }else{
                    console.log(this.error);
                }

            },
            isEmpty(field, fieldName){
                if (field === ""){
                    this.error = "You must enter an " + fieldName + ".";
                    return true;
                }
                return false;
            },
            isLessFive(field, fieldName){
                if (field.length < 5){
                    this.error = 'Please enter at least 5 characters in the "' + fieldName + '" field.';
                    return true;
                }
                return false;
            },
            isPwdMatch(){
                if (this.form.pwd !== this.form.secPwd){
                    this.error = 'The two passwords do not match.';
                    return false;
                }
                return true;
            },
            isEmailValid() {
                if (this.reg.test(this.form.email)){
                    return true;
                }
                this.error = "Please enter a valid Email address";
                return false;
            },
            validateForm(){
                this.error = "";
                return (
                    !this.isEmpty(this.form.login, "Username") &&
                    !this.isLessFive(this.form.login, "Username") &&
                    !this.isEmpty(this.form.pwd, "Password") &&
                    !this.isLessFive(this.form.pwd, "Password") &&
                    this.isPwdMatch() &&
                    (!this.isEmpty(this.form.email, "Email")) &&
                    this.isEmailValid()
                )
            }
        },
    }
</script>

<style scoped>

</style>
