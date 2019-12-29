<template>
    <section class="content">

        <div v-if="all_users.length === 0" class="m-auto">

            <h1 class="text-center display-3 mt-5">
                <i class="fa fa-spinner fa-spin"></i>
            </h1>

        </div>


        <div  v-else class="row">
            <div class="col-10" style="margin: 0 auto">

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users</h3>

                    </div>


                    <!-- /.card-header -->
                    <div class="card-body" style="overflow-x:auto;">
                        <table id="example1" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>#No</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Admin</th>
                                <th>Created At</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user, key in all_users">
                                    <td>{{key+1}}</td>
                                    <td  style="text-align: left">{{user.name}}</td>
                                    <td  style="text-align: left">{{user.email}}</td>
                                    <td style="text-align: left">{{user.phone}}</td>
                                    <td style="text-align: left">{{user.verified}}</td>
                                    <td style="text-align: left">{{user.isAdmin}}</td>
                                    <td style="text-align: left">{{user.created_at}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>#No</th>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Admin</th>
                                <th>Created At</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>

            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "ViewUsers",

        data(){

            return {

                all_users: [],
                loaded: false

            }
        },

        mounted(){

            this.$http.get(this.$backendBaseUrl + 'api/admin/all/users').then(res => {

                console.log(res);

                this.all_users = res.data;
                this.loaded = true;

            }).catch(err => {

                console.log(err.response);

            })
        },

    }
</script>

<style scoped>

    th {

        font-weight: bold;
    }

</style>