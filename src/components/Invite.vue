<template>
    
</template>

<script>

    import Axios from 'axios'
    import router from '../router'

    export default {
        name: "Invite",

        props: ['invite_token'],

        mounted(){

            Axios.get(`${this.$backendBaseUrl}/api/accept/${this.invite_token}`).then(res => {

                const data = res.data;

                // console.log(data);

                router.push({name: 'Register', query: { token: data.token, email: data.email }});


            }).catch(err => {

                console.log(err);

            });

        }
    }
</script>

<style scoped>

</style>