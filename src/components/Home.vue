<template>
    <div>
        <div v-if="isToken && isNotVerified">

            <div class="alert alert-success mb-3" v-if="message" role="alert">
                <strong>Success!</strong> {{message}}.
            </div>

            <p v-if="toggleSending"> You need to verify your email address, Check your mail for verification mail or click
                <a style="color: #0facf3" @click="sendVerifyMail()">here</a> to resend verification mail.</p>

            <div v-else class="m-auto">

                <h1 class="text-center display-3 mt-5">
                    <i class="fa fa-spinner fa-spin"></i>
                </h1>

            </div>

        </div>


        <header  data-overlay="8" class="header header-inverse bg-fixed"
                style="margin-top: -9px">
            <div class="container text-center"><div class="row">
                <div class="col-12 col-lg-8 offset-lg-2">
                    <h1>Bill Splitter</h1>
                    <p class="fs-18 opacity-70">A mini website for splitting bills with friends....</p>
                </div>
            </div>
            </div>
        </header>
        <div class="container">

            <div class="text-center mb-70 mt-40">
                <h2>Bill Splitting</h2>
                <p>A mini website for splitting bills with friends....</p>
            </div>



        </div>

    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "Home",

        data(){

            return{

                token: null,
                user: null,
                toggleSending: true,
                message: null,

            }
        },

        mounted(){

            this.token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

            this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;



        },

        methods: {

            sendVerifyMail(){

                this.toggleSending = false;

                Axios.get(`${this.$backendBaseUrl}api/mail/${this.user.id}/resend`).then(res => {

                    this.message = "Mail Sent Successfully";
                    // console.log(res);
                    this.toggleSending = true;


                }).catch(err => {

                    // console.log(err);

                });

            }

        },

        computed: {

            isToken(){

                return this.token;

            },

            isNotVerified(){

                return this.user.verified == '0' ? true : false;
            }

        }
    }
</script>

<style scoped>

    header{

        /*background-image: url('../../public/assets/img/dining1.jpeg')*/
        /*background-image: url('../../public/assets/img/dining2.jpg')*/
        /*background-image: url('../../public/assets/img/dining3.jpg')*/
        background-image: url('../../public/assets/img/dining4.jpg')

    }


</style>