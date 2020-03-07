import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login.vue"
import Main from "../views/main.vue"
import List from "../views/childs/list.vue"
import Edit from "../views/childs/edit.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        redirect: 'list',
        children: [
            {
                path: '/list',
                name: 'List',
                component: List
            },
            {
                path: '/edit',
                name: 'Edit',
                component: Edit
            }
        ]
    }
];

const router = new VueRouter({
  routes
});

export default router;
