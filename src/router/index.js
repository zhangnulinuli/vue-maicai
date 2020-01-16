import Vue from 'vue'
import VueRouter from 'vue-router'
// 一级页面
const Dashboard = () => import( /* webpackChunkName: "Dashboard" */ '../views/dashboard/Dashboard.vue')
// 懒加载二级组件 Tarbar
const Home = () => import( /* webpackChunkName: "Home" */ '../views/home/Home.vue');
const Category = () => import( /* webpackChunkName: "Category" */ '../views/category/Category.vue');
const Eat = () => import( /* webpackChunkName: "Eat" */ '../views/eat/Eat.vue');
const Cart = () => import( /* webpackChunkName: "Cart" */ '../views/cart/Cart.vue');
const Mine = () => import( /* webpackChunkName: "Mine" */ '../views/mine/Mine.vue');


Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/dashboard',
  // 是否数据缓存
  meta: {
    keepAlive: true
  }
}, {
  // 跟页面
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  children: [{
    path: '/dashboard',
    redirect: '/dashboard/home',
    // 是否数据缓存
    meta: {
      keepAlive: true
    },
  }, {
    // 主页
    path: 'home',
    name: 'home',
    component: Home,
    // 是否数据缓存
    meta: {
      keepAlive: true
    }
  }, {
    // 分类
    path: 'category',
    name: 'category',
    component: Category,
    // 是否数据缓存
    meta: {
      keepAlive: true
    },
  }, {
    // 吃什么
    path: 'eat',
    name: 'eat',
    component: Eat,
    // 是否数据缓存
    meta: {
      keepAlive: true
    }
  }, {
    // 购物车
    path: 'cart',
    name: 'cart',
    component: Cart,
    meta: {
      keepAlive: true
    }
  }, {
    // 我的
    path: 'mine',
    name: 'mine',
    component: Mine,
  }]
}]

const router = new VueRouter({
  routes
})

// 解决多次点击重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router