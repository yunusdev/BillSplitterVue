<template>
    <div  class="mh-fullscreen bg-img center-vh p-20" style="background-image: url(assets/img/bg-girl.jpg); " data-aos-easing="ease" data-aos-duration="1500" data-aos-delay="0">

        <div class="card card-shadowed p-50 w-400 mb-0" style="max-width: 100%;margin-top: 30px">
            <h5 class="text-uppercase text-center" style="margin-bottom: -30px">Register</h5>

            <hr>
            <!--<app-message></app-message>-->

            <div class="alert alert-danger mb-3" v-if="error" role="alert">
                <strong>Oh snap!</strong> {{error}}.
            </div>

            <div class="form-type-material">
                <div class="form-group">
                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.hasError('name')}" placeholder="Name" v-model = "user.name">
                    <div class="invalid-feedback" v-if="errors.hasError('name')">{{ errors.first('name') }}</div>
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" v-if="isInvitedUser" :disabled="true" :class="{ 'is-invalid': errors.hasError('email')}" placeholder="Email address" v-model = "user.email">
                    <input type="text" class="form-control" v-else :class="{ 'is-invalid': errors.hasError('email')}" placeholder="Email address" v-model = "user.email">
                    <div class="invalid-feedback" v-if="errors.hasError('email')">{{ errors.first('email') }}</div>
                </div>

                <div class="form-group">

                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.hasError('phone')}" placeholder="Phone Number" v-model = "user.phone">
                    <div class="invalid-feedback" v-if="errors.hasError('phone')">{{ errors.first('phone') }}</div>
                </div>

                <div class="form-group">

                    <input type="text" class="form-control"  placeholder="Account Number">
                    <small>Am not Saving the account number because I wont be using it to make transfer since I would be transfering to a test account</small>
                    <br>
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" :class="{ 'is-invalid': errors.hasError('password')}" placeholder="Password" v-model = "user.password">
                    <div class="invalid-feedback" v-if="errors.hasError('password')">{{ errors.first('password') }}</div>
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password (confirm)" v-model = "user.password_confirmation">
                </div>

                <div class="form-group">
                    <label class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input">
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">I agree to all <a class="text-primary" href="#">terms</a></span>
                    </label>
                </div>

                <br>
                <button class="btn btn-bold btn-block btn-warning" v-if="isInvitedUser" @click="completeRegister()" :disabled="btnDisabled" type="submit">Register</button>
                <button class="btn btn-bold btn-block btn-primary" :disabled="btnDisabled"  v-else @click="register()" type="submit">Register</button>
            </div>

            <hr class="w-30">

            <p class="text-center text-muted fs-13 mt-20">Already have an account?
                <router-link to="/login">
                    <a >Sign in</a>
                </router-link>
            </p>
        </div>

    </div>

</template>

<script>

    import Axios from 'axios'
    import router from '../router'
    import ErrorBag from '../error_bag'

    class User{

        constructor(user){

            this.email = user.email || '',
            this.name = user.name || '',
            this.phone = user.phone || '',
            this.password = user.password || '',
            this.password_confirmation = user.password_confirmation || ''
        }
    }

    export default {
        name: "Register",

        data(){

            return{

                btnDisabled: false,
                user: new User({}),
                errors: new ErrorBag,
                error: null,
                invited_email: ''
            }
        },

        mounted(){

            if(this.$route.query.email){

                this.invited_email = this.$route.query.email;
                this.user.email = this.$route.query.email;
            }

        },

        computed: {

            isInvitedUser(){

                return this.$route.query.email;
            }

        },

        methods: {

            register(){

                this.btnDisabled = true;


                Axios.post(this.$backendBaseUrl + 'api/register', this.user).then(res => {

                    const data = res.data;

                    localStorage.setItem('token', data['access_token']);
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('isAdmin', data['user']['is_admin']);
                    localStorage.setItem('isVerified', false);
                    localStorage.setItem('user', JSON.stringify(data['user']));
                    localStorage.setItem('user_id', JSON.stringify(data['user']['id']));
                    router.push({name: 'Home'});
                    location.reload();


                }).catch(err => {

                    if (err.response && err.response.status == 422) {
                        const errors = err.response.data.error;
                        this.errors.setErrors(errors);
                    }else{

                        this.error = "Something Went Wrong. Try Again"
                    }
                });

                this.btnDisabled = false;

            },

            completeRegister(){

                this.btnDisabled = true;


                Axios.post(this.$backendBaseUrl + 'api/invited/register', this.user).then(res => {

                    const data = res.data;

                    const verified = (data['user']['verified'] === '1');

                    localStorage.setItem('token', data['access_token']);
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('isAdmin', data['user']['is_admin']);
                    localStorage.setItem('isVerified', verified);
                    localStorage.setItem('user', JSON.stringify(data['user']));
                    localStorage.setItem('user_id', JSON.stringify(data['user']['id']));
                    router.push({name: 'Home'});
                    location.reload();


                }).catch(err => {

                    if (err.response && err.response.status == 422) {
                        const errors = err.response.data.error;
                        this.errors.setErrors(errors);
                    }else{

                        this.error = "Something Went Wrong. Try Again"
                    }
                })

                this.btnDisabled = false;


            }
        }
    }
</script>

<style scoped>

    .is-invalid{

        border-color: red;
    }

</style>