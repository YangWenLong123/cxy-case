/*
 * @Author: along
 * @Description:
 * @Date: 2023-10-16 13:48:55
 * @LastEditors: along
 * @LastEditTime: 2023-10-16 13:52:18
 * @FilePath: /cxy-case/drag/src/router/index.ts
 */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
