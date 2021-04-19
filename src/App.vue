<template>
  <div class="app">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/components/header/Navbar.vue'
import Footer from '@/components/header/Footer.vue'
import { mapActions } from 'vuex'

export default {
	name: 'App',
	components: {
		Navbar,
		Footer
	},
	methods:{
		...mapActions({
			autoLogin:'auth/autoLogin'
		})
		
	},
	mounted(){
    	console.log('auto login')
		this.autoLogin();
	}
}
</script>
<style src="@/assets/styles/app.css"></style>
