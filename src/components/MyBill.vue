<template>

    <div>
        <div v-if="Object.keys(bill).length === 0" class="m-auto mt-70">

            <h1 class="text-center display-3 mt-5">
                <i class="fa fa-spinner fa-spin"></i>
            </h1>

        </div>
        <div v-else class="card col-xs-12 col-lg-6" style="margin: 0 auto; border: 3px solid #0facf3">

            <div class="modal-header btn-primary"  style="border-color: #0facf3">
                <h5 class="modal-title text-white" title="Bill Name" id="exampleModalLabel">{{bill.name}}</h5>
                <span title="Bill Price" style="background-color: white" class="badge btn-round badge-lg badge-warning pull-right"><b style="color: #0facf3">N{{bill.total_price | formatMoney}}</b></span>
            </div>
            <div class="modal-body">
                <div v-for="split in bill.splitting" class="form-group col-lg-7" style="margin: 10px auto">

                    <div>

                        <h6 v-if="split.email !== bill.my_email" style=" text-align: center;">{{split.email}},
                            N{{split.amount | formatMoney}} <i class="fa  fa-tag"></i>
                        </h6>

                        <h6 v-else style=" text-align: center;">You,
                            N{{split.amount | formatMoney}} <i class="fa  fa-tag"></i>
                        </h6>

                        <div>
                            <code>
                                <router-link :to="{name: 'MyBill', params: {code: split.code}}">

                                    <a style="color: orangered">
                                        <b>Copy URL</b>
                                    </a>

                                </router-link>
                            </code>
                        </div>

                        <label class="mb-2 " style="text-align: center;">Products</label>
                        <div  class="row">

                            <ul v-for="product in bill.products"  class="list-unstyled">

                                <li style="max-width: 100%" class=" mr-50" v-if="product.email === split.email">{{product.name | capitalize}}, <mark><b>N{{product.price | formatMoney}}</b> </mark></li>

                            </ul>

                            <br>
                            <div v-if="bill.user.email !== bill.my_email && bill.my_email === split.email && split.settled === 0">
                                <h6>You are owning <b class="pr-2">{{bill.user.name}}, </b>  <i>N{{split.amount}}</i></h6>


                                <span @click="payDebt(split.amount, split.email, split.id)" class="btn btn-sm btn-success">Pay</span>



                            </div>

                            <div v-if="bill.user.email !== bill.my_email && bill.my_email === split.email && split.settled === 1">
                                <h6>You have paid your Debt of <b>N{{split.amount}} </b> to   <b> {{bill.user.name}} </b></h6>
                            </div>

                        </div>
                    </div>

                    <hr>

                </div>

            </div>
        </div>

    </div>


</template>

<script>
    import Axios from 'axios'
    import router from '../router'
    import Swal from 'sweetalert'

    export default {
        name: "MyBill",

        props: ['code'],

        data(){

            return {

                bill: {},
                split_index: 0,
                my_split: {}
            }
        },

        mounted(){


            Axios.get(this.$backendBaseUrl + 'api/bill/show/' + this.code).then(res => {

                let index = 0;
                res.data.splitting.forEach((split, index) => {

                    if (split.email === res.data.my_email){

                        this.split_index = index;
                        this.my_split = split
                    }
                    index++;

                });

                res.data.splitting.splice(this.split_index, 1);
                res.data.splitting.splice(0, 0, this.my_split);
                this.bill = res.data;


            }).catch(err => {

                console.log(err.response);
                console.log(err.response.status);
                if (err.response && err.response.status === 404){

                    router.push({'name': 'NotFound'});

                }

            })
        },

        methods: {

            payDebt(amount, email, split_id) {

                var the = this;

                var handler = PaystackPop.setup({

                    key: 'pk_test_5e135e1e155153434af039038d29a2a3812843f4',
                    email: 'yunusabdulqudus1@gmail.com',
                    amount: amount * 100,
                    currency: "NGN",
                    ref: Math.random().toString(36).substring(7), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                    metadata: {
                        custom_fields: [
                            {
                                display_name: "Mobile Number",
                                variable_name: "mobile_number",
                                value: "+2348012345678"
                            }
                        ]
                    },
                    callback: function(response){
                        Swal({ text: 'Please wait while we transfer the funds to the user ...', buttons: false });

                        console.log(response);

                        if (response.status === 'success'){

                            Axios.post(the.$backendBaseUrl + 'api/pay/debt', {split_id: split_id, amount: amount}).then(res => {

                                console.log(res.data);

                                if (res.data.status){

                                    Swal( "Success" ,  "Transfer Made Successfully!" ,  "success" ).then(() => {

                                        location.reload();

                                    });

                                }


                            }).catch(err => {

                                console.log(err.response);

                            })

                        }else {

                            Swal('Error', 'Transfer not Successful try again!' , 'error');

                        }


                    },
                    onClose: function(){
                        alert('window closed');
                    }
                });
                handler.openIframe();

            }
        }
    }
</script>

<style scoped>

</style>