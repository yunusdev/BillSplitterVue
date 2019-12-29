import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Verify from './components/Verify.vue'
import Invite from './components/Invite.vue'
import CreateBill from './components/CreateBill'
import Bills from './components/Bills'
import ViewUsers from './components/Admin/ViewUsers'
import AllBills from './components/Admin/AllBills'
import Axios from 'axios'
import { createMiddleware } from 'vue-router-middleware'
import VueRouterMiddleware, { middleware } from 'vue-router-middleware'

Vue.use(Router);


const router  = new Router({

    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },

        ...middleware('check-auth', [

            {
                path: '/login',
                name: 'Login',
                component: Login
            },


            {
                path: '/register',
                name: 'Register',
                component: Register

            },

        ]),

        {
            path: '/verify/:verify_token',
            name: 'Verify',
            component: Verify,
            props: true

        },

        {
            path: '/invite/:invite_token',
            name: 'Invite',
            component: Invite,
            props: true,
            params: true

        },
        ...middleware('require-auth', [

            {

                path: '/create/bill',
                name: 'CreateBill',
                component: CreateBill,
            },

            {

                path: '/my/bills',
                name: 'Bills',
                component: Bills,
            },

            {

                path: '/admin/all/bills',
                name: 'AllBills',
                component: AllBills,
            },

            {

                path: '/admin/all/users',
                name: 'ViewUsers',
                component: ViewUsers
            },
        ]),

    ]


});

Vue.use(VueRouterMiddleware, { router });

createMiddleware('check-auth', (args, to, from, next) => {

    const status = localStorage.getItem('isLogin');

    if ((status === 'true')) {

        next({
            path: '/',
        });
        location.reload();

    } else {
        next();
    }

});

createMiddleware('require-auth', (args, to, from, next) => {

    Axios.get('http://127.0.0.1:8000/api/check/token').then(res => {

        res.status === 200 ? localStorage.setItem('isLogin', true) : localStorage.setItem('isLogin', false);
        // console.log(res.status)

    }).catch(err => {

        // console.log('err');
        err.response.status === 404 ? localStorage.setItem('isLogin', false) : localStorage.setItem('isLogin', true);

    });

    const status = localStorage.getItem('isLogin');
    // console.log(status);

    if (!(status === 'true')) {

        localStorage.clear();



        next({
            path: '/login',
            // query: {
            //     redirect: to.fullPath,
            // },
        });
        location.reload();

    } else {
        next();
    }

});



export default router;