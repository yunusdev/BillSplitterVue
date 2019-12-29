import router from '../r'

export default {

    router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        const token =  localStorage.getItem('token');
        // const status = 0;

        Axios.get('http://127.0.0.1:8000/api/user').then(res => {

            console.log(res);
            const status = true ? res.status = 200 : false;
            console.log(status);

        }).catch(err => {

            console.log(err.response);

        });
        if (!status) {

            localStorage.clear();

            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

}