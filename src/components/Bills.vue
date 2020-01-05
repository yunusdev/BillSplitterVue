<template>

    <div class="container">




        <div v-if="my_bills.length === 0 && !bill_loaded" class="m-auto">

            <h1 class="text-center display-3 mt-5">
                <i class="fa fa-spinner fa-spin"></i>
            </h1>

        </div>

        <div  v-else-if="my_bills.length === 0 && bill_loaded">

            <h2>My Bills</h2>
            <p>You have no bills yet....</p>

        </div>

        <div v-else>
            <div class="text-center mb-40 mt-80">
                <h2>My Bills</h2>
                <p>These are your generated bills...</p>
            </div>

            <div  class="row">

                <div class="col-lg-4 col-md-6" v-for="bill in my_bills" >
                    <div class="card ks-card-widget ks-widget-payment-card-rate-details main" >

                            <h5 :class="{'btn-primary': bill.user.email === user_email, 'btn-warning': bill.user.email !== user_email }" class="card-header" >
                                {{bill.name}}

                                <button :class="{'text-primary': bill.user.email === user_email, 'text-warning': bill.user.email !== user_email }"
                                        class="btn  btn-round btn-white pull-right" @click="viewBillPage(bill)" >
                                    View Info</button>
                            </h5>


                        <div class="card-block">

                            <table class="table ks-payment-card-rate-details-table">
                                <tbody><tr>
                                    <td class="ks-currency">
                                        Split Method
                                    </td>
                                    <td class="ks-amount">{{bill.split_method | capitalize}}</td>
                                </tr>
                                <tr>
                                    <td class="ks-currency">
                                        Total Amount
                                    </td>
                                    <td class="ks-amount">N{{bill.total_price | formatMoney}}</td>
                                </tr>
                                <tr>
                                    <td class="ks-currency">
                                        Created
                                    </td>
                                    <td class="ks-amount">{{bill.created_at}}</td>
                                </tr>

                                <tr>
                                    <td class="ks-currency">
                                        Number of users
                                    </td>
                                    <td class="ks-amount">{{bill.splits.length}}</td>
                                </tr>
                                <tr>
                                    <td class="ks-currency">
                                        Number of Products
                                    </td>
                                    <td class="ks-amount">{{bill.products.length}}</td>
                                </tr>
                                <div v-for="split in bill.splits">


                                    <tr v-if="bill.user.id !== user_id && user_email === split.email && split.settled === 1">
                                        <td class="ks-currency">
                                            You have paid your Debt of <b>N{{split.amount}}</b> to
                                        </td>
                                        <td class="ks-amount"> {{bill.user.name}} </td>
                                    </tr>


                                    <tr v-if="bill.user.id !== user_id && user_email === split.email && split.settled === 0" >
                                        <td class="ks-currency">
                                            You are owning <b>{{bill.user.name}}, </b>
                                        </td>
                                        <td class="ks-amount pull-right">N{{split.amount | formatMoney}}</td>
                                        <span @click="payDebt(split.amount, split.email, split.id)" class="btn btn-xl btn-success">Pay</span>
                                    </tr>
                                </div>


                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br>
                </div>

            </div>

        </div>


        <bill-info></bill-info>

    </div>

</template>

<script>

    import Axios from 'axios'
    import Swal from 'sweetalert'
    import router from '../router'

    export default {
        name: "Bills",
        error_message: '',

        data(){

            return {

                my_bills: [],
                bill_loaded: false,
                user_id: parseInt(localStorage.getItem('user_id')),
                user_email: JSON.parse(localStorage.getItem('user')).email


            }
        },

        mounted(){


            Axios.get(this.$backendBaseUrl + 'api/my/bills').then(res => {

                // console.log(res);

                this.my_bills = res.data;
                this.bill_loaded = true;

            }).catch(err => {

                // console.log(err.response);

            })
        },

        methods: {

            viewBillInfoModal(bill) {

                this.$emit('view-bill-info', bill)
            },

            viewBillPage(bill){

                let code_email = '';

                bill.splits.forEach((split) => {

                    if (split.email === this.user_email){

                        code_email = split.code

                    }
                })

                router.push({name: 'MyBill', params: {code: code_email}});
            },


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

                        // console.log(response);

                        if (response.status === 'success'){

                            Axios.post(the.$backendBaseUrl + 'api/pay/debt', {split_id: split_id, amount: amount}).then(res => {

                                // console.log(res.data);

                                if (res.data.status){

                                    Swal( "Success" ,  "Transfer Made Successfully!" ,  "success" ).then(() => {

                                        location.reload();

                                    });

                                }


                            }).catch(err => {

                                // console.log(err.response);

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

    td.ks-amount {
        padding-right: 0;
        width: 1px;
        font-weight: 600;
        /*text-align: right;*/
    }

    td.ks-currency {
        /*padding-left: 0;*/
        text-align: left;

    }


</style>