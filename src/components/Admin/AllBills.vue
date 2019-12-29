<template>
    <section class="content">

        <div v-if="all_bills.length === 0 && !bill_loaded" class="m-auto">

            <h1 class="text-center display-3 mt-5">
                <i class="fa fa-spinner fa-spin"></i>
            </h1>

        </div>

        <div  v-else-if="all_bills.length === 0 && bill_loaded">

            <h6>You have no bills yet....</h6>

        </div>

        <div v-else class="row">
            <div class="col-10" style="margin: 0 auto">

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">All Bills</h3>

                    </div>


                    <!-- /.card-header -->
                    <div class="card-body" style="overflow-x:auto;">
                        <table id="example1" class=" table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>#No</th>
                                <th>Bill Name</th>
                                <th>User Created</th>
                                <th>Split Method</th>
                                <th>Total Price</th>
                                <th>Created at</th>
                                <th>Number of Users</th>
                                <th>Number of Products</th>
                                <th>View Details</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="bill, key in all_bills">
                                <td>{{key+1}}</td>
                                <td>{{bill.name}}</td>
                                <td>{{bill.user.name}}</td>
                                <td>{{bill.split_method | capitalize}}</td>
                                <td>N{{bill.total_price | formatMoney}}</td>
                                <td>{{bill.created_at}}</td>
                                <td>{{bill.users.length}}</td>
                                <td>{{bill.products.length}}</td>
                                <td><button @click ="viewBillInfoModal(bill)" class="btn-xs btn btn-primary"><i class="fa  fa-eye"></i></button></td>
                                <td><button @click="deleteBill(bill, key)" class="btn-xs btn btn-danger"><i class="fa fa-trash"></i></button></td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>#No</th>
                                <th>Bill Name</th>
                                <th>User Created</th>
                                <th>Split Method</th>
                                <th>Total Price</th>
                                <th>Created at</th>
                                <th>Number of Users</th>
                                <th>Number of Products</th>
                                <th>View Details</th>
                                <th>Delete</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>

            </div>
        </div>

        <bill-info></bill-info>


    </section>

</template>

<script>

    import Swal from'sweetalert'




    export default {
        name: "AllBills",

        data(){

            return {

                all_bills: [],
                bill_loaded: false

            }
        },

        mounted(){

            this.$http.get(this.$backendBaseUrl + 'api/admin/all/bills').then(res => {

                console.log(res);

                this.all_bills = res.data;
                this.bill_loaded = true;

            }).catch(err => {

                // console.log(err.response);

            })
        },

        methods: {

            viewBillInfoModal(bill){

                this.$emit('view-bill-info', bill)
            },

            deleteBill(bill, key){

                this.$http.delete(`${this.$backendBaseUrl}api/admin/bill/delete/${bill.id}`).then(res => {

                    console.log(res);

                    this.all_bills.splice(key, 1);

                    Swal("Success", "Bill Activated Successfully!", "success");

                }).catch(err => {

                    // console.log(err.response);

                })

            }
        }
    }
</script>

<style scoped>

    th {

        font-weight: bold;
    }
</style>