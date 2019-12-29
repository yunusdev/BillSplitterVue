<template>

    <div class="m-auto">

    <h1 class="text-center display-3 mt-5">
    <i class="fa fa-spinner fa-spin"></i>
    </h1>

    </div>
    
</template>

<script>
    import Axios from 'axios'
    import router from '../router'

    export default {
        name: "Verify",

        props: ['verify_token'],

        mounted(){

            Axios.get(`${this.$backendBaseUrl}/api/verify/${this.verify_token}`).then(res => {

                const data = res.data.data;

                console.log(data);

                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('isVerified', true);


                router.push({name: 'Home'});
                location.reload();


            }).catch(err => {

                // console.log(err);

            });

        }

    }
</script>

<style scoped>

</style>