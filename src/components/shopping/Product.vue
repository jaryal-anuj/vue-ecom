<template>
	<div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
		<a href="#">
			<img class="hover:grow hover:shadow-lg" :src="product.image">
			<div class="pt-3 flex items-center justify-between">
				<p class="text-black">{{ product.name }}</p>
		
				<a class="h-6 w-6 fill-current text-gray-500 hover:text-black" @click.prevent="addToCart">
					<img src="@/assets/images/add-to-cart.png">
				</a>
			</div>
			<p class="pt-1 text-gray-900">£{{ product.price }}</p>
		</a>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	props:['product'],
	methods:{
		...mapActions({
			addProductToCart:'shopping/addProductToCart'
		}),
		addToCart(){
		
			this.addProductToCart({ product:this.product, quantity:1 })
		}
	}
}
</script>