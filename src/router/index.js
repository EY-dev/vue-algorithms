import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "common" */ "@/views/Home.vue");
const Login = () => import(/* webpackChunkName: "common" */ "@/views/LogIn.vue");
const FAQ = () => import(/* webpackChunkName: "common" */ "@/views/FAQ.vue");
const About = () => import(/* webpackChunkName: "common" */ "@/views/About.vue");
const SortingAlgorithms = () => import(/* webpackChunkName: "common" */ "@/views/SortingAlgorithms.vue");
const MyAccount = () => import(/* webpackChunkName: "common" */ "@/views/MyAccount.vue");

import { getCookie } from "../Cookies/index";

function guard(to, from, next){
  if (getCookie('Authentication') !== 'Success'){
    if (to.path === '/login'){
      next();
    } else{
      next('/login');
    }
  }
  else{
    if (to.path === '/my-account'){
      next();
    } else{
      next('/my-account');
    }
  }
}

Vue.use(VueRouter);



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    redirect: "/",
  },
  {
    path: '/sorting-algorithms',
    name: 'Sorting Algorithms',
    component: SortingAlgorithms,
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    beforeEnter: guard,
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    beforeEnter: guard,
    path: '/my-account',
    name: 'My Account',
    component: MyAccount
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
