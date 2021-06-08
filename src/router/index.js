import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // {
    //     path: '/news',
    //     name: 'News',
    //     // meta: {
    //     //     //da li je autentifikacija obavezna
    //     //     authRequired: true,
    //     // },
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AllNewNews.vue')
    // },
    {
        path: '/news/:id',
        name: 'single-news-view',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/SingleNewsView.vue')
    },
    {
        path: '/news/tag/:word',
        name: 'news-by-tag',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/NewsByTag.vue')
    },
    {
        path: '/news/category/:category',
        name: 'news-by-category',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/NewsByCategory.vue')
    },
    {
        path: '/top-news',
        name: 'top-news',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/TopNews.vue')
    },
    {
        path: '/category/:name',
        name: 'edit-category',
        meta: {
            authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/EditCategory.vue')
    },
    {
        path: '/user/:email',
        name: 'edit-user',
        meta: {
            authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/EditUser.vue')
    },
    {
        path: '/category',
        name: 'new-category',
        meta: {
            authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/NewCategory.vue')
    },
    {
        path: '/user',
        name: 'new-user',
        meta: {
            authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/NewUser.vue')
    },
    {
        path: '/cms',
        name: 'Cms',
        meta: {
            authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Cms.vue')
    },
    {
        path: '/cms-admin',
        name: 'CmsAdmin',
        meta: {
            authRequired: true,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/CmsAdmin.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.authRequired) {
        const jwt = localStorage.getItem('jwt');

        if (!jwt) {
            next({name: 'Login'});
            return;
        }

        const payload = JSON.parse(atob(jwt.split('.')[1]));
        const expDate = new Date(payload.exp * 1000);

        // if (payload.role === 0) {
        //     next({name: 'CmsAdmin'})
        // } else {
        //     next({name: 'Cms'})
        // }

        if (expDate < new Date()) {
            next({name: 'Login'});
            return;
        }
    }

    next();
});

export default router
