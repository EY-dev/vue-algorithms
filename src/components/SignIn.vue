<template>
    <v-card class="elevation-12" :color="theme.content.background_color">
        <v-toolbar :color="theme.navigation.panel.color" flat>
            <v-toolbar-title :style="{'color':theme.navigation.link.text_color}">Login form</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                        name="login"
                        prepend-icon="person"
                        type="text"
                        v-model="form.login"
                >
                    <v-icon slot="prepend" :color="theme.navigation.panel.title.color">
                        person
                    </v-icon>
                </v-text-field>
                <v-text-field
                        id="password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="form.pwd"
                >
                    <v-icon slot="prepend" :color="theme.navigation.panel.title.color">
                        lock
                    </v-icon>
                </v-text-field>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-btn color="warning" block @click="signUp()">Join Us</v-btn>
                    </v-col>
                    <v-col md="4">
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-btn color="success" block @click="submit()">Login</v-btn>
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
            form: {login : "", pwd : ""},
        }),
        methods:{
            signUp(){
                this.$emit('sign-up');
            },
            submit(){
                this.$emit('submit', this.form);
            },
        },
    }
</script>

<style scoped>

</style>
