<template>
    <code :style="{'background-color': theme.navigation.panel.title.color, 'color': theme.navigation.link.selected_color, 'font-size': fontCodeSize}" style="padding: 10px">&#60;school&#62;<br>
        &#60;school-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme.footer.panel.color}">Chemeketa Community College</span>&#60;/school-name&#62;<br>
        &#60;class&#62;<br>
        &#60;class-code&#62;<span class="font-italic font-weight-light" :style="{'color': theme.footer.panel.color}">CIS295</span>&#60;/class-code&#62;<br>
        &#60;class-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme.footer.panel.color}">Web Application Development</span>&#60;/class-name&#62;<br>
        &#60;instructor-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme.footer.panel.color}">Don Kraus</span>&#60;/instructor-name&#62;<br>
        &#60;/class&#62;<br>
        &#60;student-name&#62;<span class="font-italic font-weight-light" :style="{'color': theme.footer.panel.color}">Evgenii Eugene Esaulov</span>&#60;/student-name&#62;<br>
        &#60;/school&#62;
    </code>
</template>

<script>
    export default {
        name: "SchoolInfo",
        props: ['theme'],
        data: () => ({
            fontCodeSize: '18px',
        }),
        methods:{
            onResize () {
                if (this.$vuetify.breakpoint.xs){
                    this.fontCodeSize = "10px";
                }
            },
        },
        created() {
            if (this.$vuetify.breakpoint.xs){
                this.fontCodeSize = "10px";
            }
        },
    }
</script>

<style scoped>

</style>
