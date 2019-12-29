<template>

    <div  class="modal fade" id="createBillInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div  class="modal-dialog" role="document">
            <div class="modal-content" style="border: 3px solid #0facf3">
                <div class="modal-header btn-primary" style="border-color: #0facf3">
                    <h5 class="modal-title text-white" title="Bill Name" id="exampleModalLabel">{{bill.name}}</h5>
                    <span title="Bill Price" style="background-color: white" class="badge btn-round badge-lg badge-warning pull-right"><b style="color: #0facf3">N{{bill.total_price | formatMoney}}</b></span>
                    <button type="button" @click="hideModal()" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-for="split in bill.splitting" class="form-group col-lg-7" style="margin: 10px auto">

                        <div>

                            <h6 v-if="split.user.id !== user_id" style=" text-align: center;">{{split.user.name}},
                                     N{{split.amount | formatMoney}} <i class="fa  fa-tag"></i>
                            </h6>

                            <h6 v-else style=" text-align: center;">You,
                                N{{split.amount | formatMoney}} <i class="fa  fa-tag"></i>
                            </h6>

                            <label class="mb-2 " style="text-align: center;">Products</label>
                            <div  class="row">

                                <ul v-for="product in bill.products"  class="list-unstyled">

                                    <li style="max-width: 100%" class=" mr-50" v-if="product.user_id === split.user_id">{{product.name | capitalize}}, <mark><b>N{{product.price | formatMoney}}</b> </mark></li>

                                </ul>

                                <br>
                                <div v-if="bill.user.id !== user_id && user_id === split.user_id && split.settled === 0">
                                    <h6>You are owning <b class="pr-2">{{bill.user.name}} </b>  <b>N{{split.amount}}</b></h6>
                                </div>

                                <div v-if="bill.user.id !== user_id && user_id === split.user_id && split.settled === 1">
                                    <h6>You have paid your Debt of <b>N{{split.amount}} </b> to   <b> {{bill.user.name}} </b></h6>
                                </div>

                            </div>
                        </div>

                        <hr>

                    </div>

                </div>
                <div class="modal-footer" style="margin-top: -47px">
                    <button aria-label="Close" type="button" style="background-color: #e4e7ea; color: #535353; padding: 7px 15px" class=" btn btn-secondary close  pull-right" @click="hideModal()" data-dismiss="modal">Close.</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "BillInfo",

        data(){

            return {

                bill: {},
                user_id: parseInt(localStorage.getItem('user_id'))

            }
        },

        mounted(){

            this.$parent.$on('view-bill-info', (bill) => {

                $('#createBillInfo').modal();
                this.bill = bill;

            })
        },

        methods: {

            hideModal(){

                $('#createBillInfo').modal('hide');

            }
        }
    }
</script>

<style scoped>


    @media only screen and (max-width: 768px) {
        .v--modal-box .v--modal {
            width: 310px;
        }
    }
</style>