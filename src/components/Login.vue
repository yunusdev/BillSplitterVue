<template>
    <div  class="mh-fullscreen bg-img center-vh p-20" style="background-image: url(assets/img/bg-girl.jpg); " data-aos-easing="ease" data-aos-duration="1500" data-aos-delay="0">


        <div class="card card-shadowed p-50 w-400 mb-0" style="max-width: 100%;margin-top: 30px">
            <h5 class="text-uppercase text-center" style="margin-bottom: -30px">Login</h5>

            <hr>
            <!--<app-message></app-message>-->
            <br>

            <div class="alert alert-danger mb-3" v-if="error" role="alert">
                <strong>Oh snap!</strong> {{error}}.
            </div>

            <div class="form-type-material">

                <div class="form-group">
                    <input type="text"  class="form-control" placeholder="Email address" v-model = "user.email">

                </div>

                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" v-model = "user.password">

                </div>

                <br>
                <button class="btn btn-bold btn-block btn-primary" @click="login()" :disabled="btnDisabled" type="submit">Login</button>
            </div>

            <hr class="w-30">

            <p class="text-center text-muted fs-13 mt-20">Already have an account?
                <router-link to="/register">
                    <a >Register</a>
                </router-link>
            </p>
        </div>

    </div>

</template>

<script>
    import Axios from 'axios'
    import router from '../router'


    class User{

        constructor(user){

            this.email = user.email || '',
            this.password = user.password || ''
        }
    }
    export default {
        name: "Login",
        data(){

            return{

                btnDisabled: false,
                user: new User({}),
                error: null

            }
        },

        methods: {


            login(){


                Axios.post(this.$backendBaseUrl + 'api/login', this.user).then(res => {

                    const data = res.data;
                    const verified = (data['user']['verified'] === '1');

                    console.log(data['access_token']);
                    localStorage.setItem('token', data['access_token']);
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('isVerified', verified);
                    localStorage.setItem('isAdmin', data['user']['is_admin']);
                    localStorage.setItem('user', JSON.stringify(data['user']));
                    localStorage.setItem('user_id', JSON.stringify(data['user']['id']));
                    router.push({name: 'Home'});
                    location.reload();


                }).catch(err => {

                    if (err.response && err.response.status == 401) {
                        this.error = "Wrong Credentials"
                    }
                    // console.log(err.response);
                })

            }
        }
    }
</script>

<style scoped>
    .is-invalid{

        border-color: red;
    }
</style>