<template>
    <!--Nav-->
    <nav id="header" :class="{'bg-white shadow':scrollPos > 10}" class="fixed w-full z-30 top-0 text-white">
      <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div class="pl-4 flex items-center">
          <router-link to="/" :class="scrollPos > 10 ? 'text-gray-800' : 'text-white'" class="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
            <!--Icon from: http://www.potlabicons.com/ -->
            <svg class="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005">
              <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)" />
              <path
                class="plane-take-off"
                d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "
              />
            </svg>
            LANDING 
          </router-link>
        </div>
        <div class="block lg:hidden pr-4">
          <button @click="isOpenNav = !isOpenNav" id="nav-toggle" class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div :class="{'bg-gray-100':scrollPos <= 10,'bg-white':scrollPos >10, 'hidden':!isOpenNav}" class="w-full flex-grow lg:flex lg:items-center lg:w-auto  mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          <ul class="list-reset lg:flex justify-end flex-1 items-center">
            <li class="mr-3">
                <router-link to="/login" class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" v-if="!user.authenticated">Login</router-link>
              <!-- <a class="inline-block py-2 px-4 text-black font-bold no-underline" href="#">Active</a> -->
            </li>
            <li class="mr-3">
                <router-link to="/register" class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" v-if="!user.authenticated">Register</router-link>
              <!-- <a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">link</a> -->
            </li>
            <li class="mr-3">
              <router-link to="/products" class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" v-if="user.authenticated" >Shop</router-link>
            </li>
			<li class="mr-3">
              <a href="#" @click.prevent="logout" class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" v-if="user.authenticated" >Logout</a>
            </li>
            <li class="mr-3">
              <router-link v-if="user.authenticated" to="/cart" class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" >
				<svg class="flex-1 w-8 h-8 fill-current" viewbox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
					</svg>
					<span class="absolute right-44 top-4 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{{ cartItemCount }}
					</span>
				</router-link>
            </li>
          </ul>
          <button
            id="navAction"
            :class="{'bg-white text-gray-800':scrollPos <= 10,'gradient text-white':scrollPos >10}"
            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Action
          </button>
        </div>
      </div>
      <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
</template>
<script>
import {  mapGetters, mapActions } from 'vuex'
export default {
    name:'Navbar',
    data(){
        return {
            scrollPos:0,
            currentPath :"",
            isOpenNav:false,
        }
    },
    watch:{
        $route (to){
           // console.log('watch');
            this.currentPath =to.fullPath
            if(this.currentPath != '/' ) {
              this.scrollPos = 11;
            } 
        }
    },
    created(){
        this.currentPath = this.$route.path;

        if(this.currentPath == '/' ) { 
            this.scrollPos = window.scrollY;
        }else{
            this.scrollPos = 11;
        }
        window.addEventListener('scroll', this.handleScroll);
    },
    unMounted () {
        window.removeEventListener('scroll', this.handleScroll);
	},
	computed:{
		...mapGetters({
			cartItemCount:'shopping/cartItemCount',
			user:'auth/user'
		})
	},
    methods:{
		...mapActions({
			logout:'auth/authLogout'
		}),
        handleScroll(){
            if(this.currentPath == '/') {
                this.scrollPos = window.scrollY;
            }else{
                this.scrollPos = 11;
            }
            //console.log(window.scrollY);
        }
	},
	mounted(){
		//console.log(this.user)
	}

}
</script>>