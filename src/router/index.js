import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store';

const routes = [
    {
		path: '/',
		name: 'Home',
		component: Home
    },
    {
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
		path:'/login',
		name:'Login',
		component:() => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
		meta:{gaurd:'guest'}
    },
    {
		path:'/register',
		name:'Register',
		component:() => import(/* webpackChunkName: "login" */ '../views/Register.vue'),
		meta:{gaurd:'guest'}
    },
    {
		path:'/products',
		name:'Product',
		component:() => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
		meta:{gaurd:'user'}
    },
    {
		path:'/cart',
		name:'Cart',
		component:() => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
		meta:{gaurd:'user'}
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from, next)=>{
	
	if(to.matched.some(record => record.meta.gaurd =='guest') && store.state.auth.user.authenticated == true){	
		next('/products')
	}else if(to.matched.some(record => record.meta.gaurd=='user') && store.state.auth.user.authenticated == false){
		next('/login')
	}else{
		next();
	}
	
});

export default router
