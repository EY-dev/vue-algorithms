import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import(/* webpackChunkName: "common" */ "@/views/Home.vue");
const About = () => import(/* webpackChunkName: "common" */ "@/views/About.vue");
const SortingAlgorithms = () => import(/* webpackChunkName: "common" */ "@/views/SortingAlgorithms.vue");

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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
