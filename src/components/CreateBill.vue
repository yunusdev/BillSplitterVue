<template>
    <div class="col-lg-6 col-sm-12 col-sm-8" style="margin: 0px auto" id = "here">
        <!--0facf3-->


        <header class="section-header" style="margin-bottom: -20px">
            <small>Bill</small>
            <h2>Activate a Bill</h2>
            <hr>
            <p class="lead">Won't said night above you're she'd behold moveth said one fowl. Beast forth.</p>
        </header>

        <div v-if="options.length === 0" class="m-auto">

            <h1 class="text-center display-3 mt-5">
                <i class="fa fa-spinner fa-spin"></i>
            </h1>

        </div>

        <form-wizard v-if="options.length !== 0" @on-complete="onComplete" title=" " subtitle = ' ' stepSize = "md" color ="#0facf3">
            <tab-content title="Description..." icon="ti-user" :before-change="validateFirstStep">

                <div class="alert col-lg-6  alert-danger mb-3" style="margin: 10px auto" v-if="error_message" role="alert">
                    <strong>Oh snap! </strong> {{error_message}}.
                </div>

                <div class="form-group col-lg-6 " style="margin: 10px auto">
                    <label for="name">What name would you like to name it: </label>
                    <input type="text" v-model="bill_name"  class="form-control" id ="name"  placeholder="Description..." >

                </div>

                <div class="form-group col-lg-6 " style="margin: 10px auto">
                    <label class="typo__label">Add Users </label>

                    <multiselect v-model="emails" tag-placeholder="Add this as new tag" placeholder="Search or add a user"
                                 :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>

                </div>

            </tab-content>
            <tab-content title="Users" icon="ti-money" :before-change="validateSecondStep">

                <h3>Add Products to Bill</h3>
                <h5>Total Price - N{{totalAmount}}</h5>

                <div class="alert col-lg-6  alert-danger mb-3" style="margin: 10px auto" v-if="error_message" role="alert">
                    <strong>Oh snap! </strong> {{error_message}}.
                </div>

                <div v-for="email in emails" class="form-group col-lg-6" style="margin: 10px auto">

                    <h6 style="font-weight: bold" v-if="email !== user_email">{{email}}</h6>
                    <h6 style="font-weight: bold" v-else>You</h6>

                    <label>Products:</label>
                    <div v-for="product, key in products" class="row">

                        <input v-if="product.email === email" type="text"  class="form-control form-round col-5 mb-1 mr-1" v-model= "product.name"   placeholder="Product" >
                        <input v-if="product.email === email" type="number"  class="form-control form-round col-4 mb-1" v-model ="product.price"  placeholder="Amount" >
                        <a @click="removeProduct(key)" title="Remove Item" v-if="product.email === email" class="item-remove col-2" style="margin-top: 5px"><i class="ti-close"></i></a>
                        <!--<input  type="hidden"  class="form-control col-6" v-model="product.user_id"  placeholder="Amount" >-->
                    </div>

                    <button class="mt-3 btn btn-sm btn-round btn-secondary" @click="addMoreProduct(email)"> <span class="fa fa-plus"></span> Add More Product</button>
                    <hr>

                </div>
            </tab-content>

            <tab-content title="Split Method" icon="ti-settings" :before-change="validateThirdStep">

                <h4 class="mb-3" style="font-weight: bold">Choose Split Method</h4>

                <h5 style="background-color: #0facf3; color: white; margin: 0 auto" class="btn-round pt-2 pb-2 col-7 mb-3">Total Price - N{{totalAmount}}</h5>

                <div class="alert col-lg-6  alert-danger mb-3" style="margin: 10px auto" v-if="error_message" role="alert">
                    <strong>Oh snap! </strong> {{error_message}}.
                </div>

                <label class="custom-control custom-radio">
                    <input v-model="split_method" :value="percentage_rep" type="radio" class="custom-control-input" name="radio1">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">By Percentage</span>
                </label>
                <label class="custom-control custom-radio">
                    <input v-model="split_method" :value="amount_rep" type="radio" class="custom-control-input" name="radio1">
                    <span class="custom-control-indicator"></span>
                    <span class="custom-control-description">By Amount</span>
                </label>

                <div v-if="split_method === amount_rep" v-for="val in splits" class="form-group col-lg-6" style="margin: 10px auto">

                    <h6 style="font-weight: bold" v-if="val.email !== user_email">{{val.email}}</h6>
                    <h6 style="font-weight: bold" v-else>You</h6>

                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">N</span>
                        <input type="text" v-model="val.amount" class="form-control" placeholder="Amount" aria-describedby="basic-addon1">
                    </div>

                    <hr>

                </div>
                <div v-if="split_method === percentage_rep" v-for="val in splits" class="form-group col-lg-6" style="margin: 10px auto">

                    <h6 style="font-weight: bold" v-if="val.email !== user_email">{{val.email}}</h6>
                    <h6 style="font-weight: bold" v-else>You</h6>

                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon2">%</span>
                        <input type="text" v-model="val.percentage" class="form-control form-round" placeholder="Percentage" aria-describedby="basic-addon1">
                    </div>
                    <hr>

                </div>

                <div class="row" v-if="split_method === percentage_rep">
                    <h3 style="width: 100%">{{percentageSum}}%</h3>
                    <h6 style="width: 100%">{{100 - percentageSum}}% remaining</h6>
                </div>

                <div class="row" v-if="split_method === amount_rep">
                    <h3 style="width: 100%">N{{amountSum}}</h3>
                    <h6 style="width: 100%">N{{total_amount - amountSum}} remaining</h6>
                </div>

            </tab-content>

            <tab-content title="Confirm Settings" icon="ti-settings">

                <h3>Confirm Settings</h3>
                <h5 style="background-color: #0facf3; color: white; margin: 0 auto" class="btn-round pt-2 pb-2 col-7">Total Price - N{{totalAmount}}</h5>
                <hr>


                <div v-for="val in splits" class="form-group col-lg-6" style="margin: 10px auto">

                    <h6 style="font-weight: bold" v-if="val.email !== user_email">{{val.email}}</h6>
                    <h6 style="font-weight: bold" v-else>You</h6>

                    <label class="mb-2">Products</label>
                    <div  class="row">

                        <ul v-for="product in products"  class="list-unstyled">

                            <li style="max-width: 100%" class=" mr-50" v-if="product.email === val.email">{{product.name | capitalize}}, <mark><b>N{{product.price}}</b> </mark></li>
                        </ul>

                    </div>

                    <div class="mt-10">
                        <h6 v-if="split_method === amount_rep && val.email !== user_email" style="color: grey">
                            {{val.name}} is to pay <b>N{{val.amount}}</b>
                        </h6>
                        <h6 v-else-if="split_method === amount_rep && val.email === user_email" style="color: grey">
                            You are to pay <b>N{{val.amount}}</b>
                        </h6>
                        <h6 v-else-if="split_method === percentage_rep && val.email !== user_email" style="color: grey">
                            {{val.name}} is to pay <b>{{val.percentage}}%</b>
                        </h6>
                        <h6 v-else style="color: grey">
                            You are to pay <b>{{val.percentage}}%</b>
                        </h6>
                    </div>

                    <hr>

                </div>

            </tab-content>

        </form-wizard>

    </div>
</template>

<script>
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    import VueFormWizard from 'vue-form-wizard'
    import Vue from 'vue'
    Vue.use(VueFormWizard)
    import Axios from 'axios'
    import Swal from 'sweetalert'
    import Multiselect from 'vue-multiselect'
    import 'vue-multiselect/dist/vue-multiselect.min.css'
    import router from '../router'
    import VueNotifications from 'vue-notifications'
    import miniToastr from 'mini-toastr'
    const toastTypes = {
        success: 'success',
        error: 'error',
        info: 'info',
        warn: 'warn'
    }
    miniToastr.init({types: toastTypes});
    function toast ({title, message, type, timeout, cb}) {
        return miniToastr[type](message, title, timeout, cb)
    }
    const options = {
        success: toast,
        error: toast,
        info: toast,
        warn: toast
    };
    Vue.use(VueNotifications, options);


    export default {
        name: "CreateBill",

        data(){

            return{

                users: [],
                emails: [],
                splits: [],
                bill_name: '',
                split_method: 'percentage',
                percentage_rep: 'percentage',
                amount_rep: 'amount',
                total_amount: 0,
                products: [],
                option_users: [],
                options: [],
                users_id : null,
                errors: {},
                error_message: '',
                user_id: parseInt(localStorage.getItem('user_id')),
                user_email: JSON.parse(localStorage.getItem('user')).email


            }
        },

        notifications: {
            showError: {
                title: 'Error',
                message: 'Failed to authenticate',
                type: 'error'
            }
        },

        mounted(){

            // Axios.get(this.$backendBaseUrl + 'api/verified/user').then(res => {
            //
            //     console.log(res.data);
            //     this.options = res.data;
            //
            // }).catch(err => {
            //
            //     console.log(err.response);
            //
            // });

            const user = JSON.parse(localStorage.getItem('user'))

            this.users.push(user);
            this.emails.push(user.email);
            this.options.push(user.email);
            // this.options.push('You');

        },

        components: {
            Multiselect
        },

        computed: {

            totalAmount(){

                Array.prototype.sum = function (prop) {
                    var total = 0
                    for ( var i = 0, _len = this.length; i < _len; i++ ) {

                        const num = this[i][prop] === '' ? 0 : this[i][prop];

                        total += parseInt(num);
                    }
                    return total
                }

                this.total_amount =  this.products.sum('price');

                return this.total_amount;

            },

            percentageSum(){

                return this.splits.sum('percentage');
            },

            amountSum(){

                return this.splits.sum('amount');

            },

            usersIdArray(){

                if (this.users.length === 0){

                    return [1, 5];
                }

                return [1, 2, 3];
            }

        },

        methods: {

            addTag (newTag) {
                // const tag = {
                //     name: newTag
                // }
                console.log(newTag);
                this.options.push(newTag);
                // this.users.push(tag);
                this.emails.push(newTag);

                // this.users_id = this.users.map(value => value.id)
            },

            addMoreUser(email){


            },

            addMoreProduct(email){

                this.products.push({
                    name: '',
                    price: '',
                    // user_id: id,
                    email: email,
                });

            },

            removeProduct(key){

                this.products.splice(key, 1);
            },


            validateFirstStep(){

                const the = this

                if  (this.products.length < this.emails.length){

                    this.emails.forEach(function (email) {

                        the.products.push({
                            name: '',
                            price: '',
                            email: email
                        });
                    })
                }

                if (this.bill_name === ''){

                    this.error_message = 'Bill name is Required';
                    this.showError({message: 'Bill name is Required'});

                    return false;

                } if (this.emails.length < 2){

                      this.error_message = 'You need to add at least a user that will be dining with you..';
                      this.showError({message: 'You need to add at least a user that will be dining with you..'});


                    return false;

                }

                this.error_message = '';

                return true;
            },
            validateSecondStep(){

                const the = this;

                // if  (this.splits.length < this.emails.length) {
                //
                //     this.splits = [];
                //
                //     this.emails.forEach(function (email) {
                //
                //         the.splits.push({
                //
                //             // name: user.name,
                //             // user_id: user.id,
                //             email: email,
                //             percentage: '',
                //             amount: ''
                //
                //         })
                //
                //     });
                //
                // }

                //I try to strip the products that doesnt have a price or name in the object

                const valid_products = [];

                var strimProducts = function(all) {
                    all.forEach(function(o){
                        if(o['price'] || o['name']){

                            valid_products.push(o)

                        }else{
                        }
                    });
                };

                strimProducts(this.products);
                this.products = valid_products;
                // console.log(this.products);


                if (this.products.length < this.users.length){

                    this.error_message = 'Add a Product for each user';
                    this.showError({message: 'Add a Product for each user'});

                    return false;

                }

                //check the user ids and product ids

                const product_emails = [];

                var checkUserProducts = function(products) {

                    products.forEach(function(o){

                        product_emails.push(o['email']);

                    });
                };


                checkUserProducts(this.products);


                Array.prototype.diff = function(a) {
                    return this.filter(function(i) {return a.indexOf(i) < 0;});
                };

                const strim_emails = [...new Set(this.emails)];
                const strim_product_emails = [...new Set(product_emails)];


                // var arrayRemove = function (arr, value) {
                //
                //     return arr.filter(function(ele){
                //         return ele != value;
                //     });
                //
                // }


                var removeProductWithoutUser = function(products) {
                    products.forEach(function(product, index){

                        if (!strim_emails.includes(product['email'])){

                            the.products.splice(index, 1);

                            strim_product_emails.forEach(function(email, index){

                                if (email === product['user_id']){

                                    strim_product_emails.splice(index, 1);
                                }


                            });

                        }

                    });
                };


                removeProductWithoutUser(this.products);

                //I valid if each product ha a price and name, if not I return an error..

                const errorProductArray = [];

                var validateFields = function(all, required_fields) {
                    all.forEach(function(o){
                        required_fields.forEach(function(field){
                            if(o[field]){
                                errorProductArray.push('false')

                            }else{
                                errorProductArray.push('true')
                            }
                        });
                    });
                };


                validateFields(this.products, ['price', 'name']);

                if (errorProductArray.includes('true')){

                    this.error_message = 'Pls make sure every product has a product and price...';
                    this.showError({message: 'Pls make sure every product has a product and price...'});


                    return false;

                }

                // I validate if each user (email) have atleast a product in the products array


                const arraysEqual = function(arr1, arr2) {
                    if(arr1.length !== arr2.length)
                        return false;
                    for(var i = arr1.length; i--;) {
                        if(arr1[i] !== arr2[i])
                            return false;
                    }

                    return true;
                };


                if (!arraysEqual(strim_emails, strim_product_emails)){

                    this.error_message = 'Pls make sure every user has atleast a product..';
                    this.showError({message: 'Pls make sure every user has atleast a product..'});

                    return false;

                }

                this.error_message = '';


                const split_emails = [];

                this.splits.forEach((split) => {

                    split_emails.push(split.email);

                });

                if  (!arraysEqual(this.emails, split_emails)){

                    this.splits = [];

                    this.emails.forEach(function (email) {

                        the.splits.push({

                            email: email,
                            percentage: '',
                            amount: ''

                        })

                    });

                    console.log(split_emails);
                    console.log(this.emails)

                }

                return true;

            },

            validateThirdStep(){

                // console.log(100 - this.percentageSum);

                if (this.split_method === 'percentage' && ((100 - this.percentageSum) !== 0) ){

                    this.error_message = 'Pls Make Sure that the percentage sums up to a 100';
                    this.showError({message: 'Pls Make Sure that the percentage sums up to a 100'});


                    return false;

                } if (this.split_method === 'amount' && ((this.total_amount - this.amountSum) !== 0)){

                    this.error_message = 'Pls Make Sure that the amount sums up to N' + this.total_amount;
                    this.showError({message: 'Pls Make Sure that the amount sums up to N' + this.total_amount});


                    return false;

                }

                this.error_message = '';

                return true;
            },

            onComplete() {

                const the = this;

                Swal({ text: 'Please wait while we initiate the bill ...', buttons: false });

                Axios.post(this.$backendBaseUrl + 'api/create/bill', {

                    users: this.users,
                    splits: this.splits,
                    products: this.products,
                    split_method: this.split_method,
                    bill_name: this.bill_name,
                    total_price: this.total_amount

                }).then(res => {

                    Swal("Success", "Bill Activated Successfully!", "success").then(res => {

                        router.push({name: 'Bills'});

                    }).catch(err => {

                        // console.log(err)
                    });

                    // console.log(res.data);

                }).catch(err => {

                    console.log(err.response);

                })


            },

        },

    }
</script>

<style scoped>

    @media screen and (max-width: 376px){

        div#here .vue-form-wizard .wizard-card-footer div#.wizard-footer-right button{

            margin-top: 10px
        }

    }

    .is-invalid{

        border-color: red;
    }

</style>