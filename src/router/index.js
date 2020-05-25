import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "common" */ "@/views/Home.vue");
const Login = () => import(/* webpackChunkName: "common" */ "@/views/LogIn.vue");
const FAQ = () => import(/* webpackChunkName: "common" */ "@/views/FAQ.vue");
const About = () => import(/* webpackChunkName: "common" */ "@/views/About.vue");
const SortingAlgorithms = () => import(/* webpackChunkName: "common" */ "@/views/SortingAlgorithms.vue");
const Administration = () => import(/* webpackChunkName: "common" */ "@/views/Administration.vue");
const InsiderNews = () => import(/* webpackChunkName: "common" */ "@/views/InsiderNews.vue");
const Page404 = () => import(/* webpackChunkName: "common" */ "@/views/404.vue");

import { getCookie } from "../Cookies/index";

function guard(to, from, next){
  if (getCookie('Authentication') === 'Success' && (to.path === '/login')){
    next('/');
  }
  else{
    if (to.path === '/administration' && parseInt(getCookie('auth')) < 5){
      next('/404')
    }
    if (to.path === '/insider-news' && parseInt(getCookie('auth')) < 1){
      next('/404')
    }
    next();
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
    path: '/administration',
    name: 'Administration',
    component: Administration
  },
  {
    beforeEnter: guard,
    path: '/insider-news',
    name: 'Insider News',
    component: InsiderNews
  },
  {
    path: '/404',
    name: 'Page is not exist',
    component: Page404
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
