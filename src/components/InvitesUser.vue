<template>
    <div class="modal fade" id="inviteUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Invite User</h5>
                    <button type="button" @click="hide()" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>


                </div>
                <div class="modal-body">

                    <p class="lead">Invite users to join our satisfied customers using our product.</p>

                    <div class="alert col-lg-6  alert-danger mb-3" style="margin: 10px auto" v-if="error_message" role="alert">
                        <strong>Oh snap! </strong> {{error_message}}.
                    </div>

                    <div class="form-group">
                        <input type="email" class="form-control"  placeholder="Email" v-model="invite_email">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary pull-left" @click="hide()" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" :disabled = "btnDisabled" @click="inviteUser()">Invite User</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Swal from 'sweetalert'
    import Axios from 'axios'

    export default {
        name: "InvitesUser",

        data(){

            return{

                invite_email: '',
                btnDisabled: false,
                error_message: ''
            }
        },

        mounted(){

            this.$parent.$on('invite_user', () => {

                $('#inviteUser').modal();

            })
        },

        methods: {


            inviteUser(){

                if(this.invite_email === ''){

                    this.error_message = 'Pls Provide an email addresss'
                }else{


                    Swal({ text: 'Please wait while we send invitation mail ...', buttons: false });

                    Axios.post(this.$backendBaseUrl + 'api/invite', {email: this.invite_email}).then(res => {

                        console.log(res);
                        this.btnDisabled = false;
                        this.invite_email = '';
                        Swal("Success", "Invitation Sent Successfully!", "success");
                        $('#inviteUser').modal('hide');


                    }).catch(err => {

                        // console.log(err.response);

                    });


                }

            },

            hide () {

                $('#inviteUser').modal('hide');

            },
        }
    }
</script>

<style scoped>

</style>