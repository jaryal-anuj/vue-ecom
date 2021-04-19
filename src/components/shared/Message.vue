<template>
	<div v-bind:class="classObject" class="text-white px-6 py-4 border-0 rounded relative mb-1"  v-if="flash_msg.message">
		{{ flash_msg.message }}
	</div>
</template>
<script>

import  { mapGetters } from 'vuex'

export default {

	computed:{
		...mapGetters({
			flash_msg :'flash_msg'
		}),
		classObject: function(){
				return{
					'bg-green-500':  this.flash_msg.type =='success',
					'bg-red-500': this.flash_msg.type == 'danger',
				}
				
		}
		
	}
}
</script>