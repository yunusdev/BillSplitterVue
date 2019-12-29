<template>
  <div id="app">

    <Slide>


          <router-link to="/">

              <a id="home" class="btn btn-sm text-white btn-secondary-outline ">
                <span style="margin-right: 40px">Home</span>
              </a>

          </router-link>

        <router-link v-if="!isToken" to="/login">

            <a v-if="!isToken" class="text-white btn btn-sm btn-success" ><span style="margin-right: 38px">Login</span></a>

        </router-link>

          <router-link v-if="!isToken" to="/register">

              <a v-if="!isToken" class="text-white btn btn-sm btn-success" ><span style="margin-right: 15px">Register</span></a>

          </router-link>


        <div>
            <a v-if="isToken && isVerified" @click=" viewInvitesModal()" class="btn btn-sm text-white btn-info">Send Invites</a>

        </div>


        <router-link to="/create/bill">

          <a v-if="isToken && isVerified" class="btn btn-sm btn-secondary-outline text-white">Create Bill</a>

        </router-link>

         <h5 v-if="isToken && isVerified" style="border-bottom: 2px solid white; margin-right: 130px" class="text-danger">{{user.real_name}}</h5>

          <router-link  to="/my/bills">

            <a v-if="isVerified" id="bills" class="btn btn-sm btn-outline btn-secondary " style="color: white">
              <span>My Bills</span>
            </a>

          </router-link>

        <div>

            <a v-if="isToken" class="btn btn-sm btn-danger  text-white" @click="logout()" id="logout">

                <span>Logout</span>

            </a>

        </div>

        <h5 v-if="isToken && isAdmin && isVerified" style="border-bottom: 2px solid white; margin-right: 130px" class="text-white">Admin</h5>

      <router-link  to="/admin/all/bills">

        <a v-if="isToken && isAdmin && isVerified" class="btn btn-sm btn-secondary-outline" id="bills" style="color: white">
          <span>All Bills</span>
        </a>

      </router-link>

      <router-link  to="/admin/all/users">

        <a v-if="isToken && isAdmin && isVerified" class="btn btn-sm btn-secondary-outline" id="bills" style="color: white">
          <span>All Users</span>
        </a>

      </router-link>


    </Slide>

    <div class="mt-100">

      <router-view/>

    </div>

    <footer class="site-footer">
      <div class="container">
        <div class="row gap-y">
          <div class="col-12 col-md-6">
            <p class="text-center text-md-left">Copyright © 2019 <a class="text-dark" href="#">BillSplitter</a>. All rights reserved.</p>
          </div>

          <div class="col-12 col-md-6">
            <ul class="nav nav-inline nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
              <li class="nav-item">
                <a class="nav-link" href="#">Terms of use</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Privacy policy</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">About</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    <invite-user></invite-user>

  </div>
</template>


<script>

    import router from './router'

    import { Slide } from 'vue-burger-menu'
    export default {

        components: {
            Slide
        },

        data(){

            return{

                token: null,
                user: null,
                invite_email: 'testinglaravel96@gmail.com',
                btnDisabled: false,
                isCollapsed: true,
                isAdmin: null,
                isVerified: null,

            }
        },

        mounted(){

            this.token = (localStorage.getItem('isLogin')  === 'true');

            this.isAdmin = (localStorage.getItem('isAdmin')  === 'true');

            this.isVerified = (localStorage.getItem('isVerified')  === 'true');

            // this.token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

            this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;




        },

        computed: {

            isToken(){

                return this.token;

            },
        },


        methods: {

            logout(){

                localStorage.clear();
                router.push('/');
                location.reload();

            },

            viewInvitesModal(){

                this.$emit('invite_user');
            },


        }

    }

</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .topbar.topbar-inverse .topbar-nav>.nav-item>.nav-link, .topbar.topbar-inverse .topbar-toggler, .topbar.topbar-inverse .drawer-toggler{
    color: grey;
  }

  .topbar>.container, .topbar>.container-wide, .topbar>.container-fluid{

    height: 40px;
  }

  .main{
  //margin: 30px 50px 100px;
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.1);
    border: 1px solid #ebebeb;

  }

  nav{

    /*margin-bottom: 100px;*/
  }

  /*footer{*/

    /*position:absolute;*/
    /*bottom:0;*/
    /*width:100%;*/
  /*}*/
</style>
