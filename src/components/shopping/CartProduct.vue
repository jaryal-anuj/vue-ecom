<template>
	
	<div class="flex justify-between items-center mt-6 pt-6">
		<div class="flex items-center"> <img :src="item.product.image" width="60" class="rounded-full ">
			<div class="flex flex-col ml-3"> <span class="md:text-md font-medium">{{ item.product.name }}</span> <span class="text-xs font-light text-gray-400">#41551</span> </div>
		</div>
		<div class="flex justify-center items-center">
			<div class="pr-8 flex "> 
				<span @click.prevent="decreaseProductQuantity(item.product.id)" class="font-semibold" >-</span> <input type="text" class="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2" :value="item.quantity"> 
				<span class="font-semibold" @click.prevent="addToCart">+</span> 
			</div>
			<div class="pr-8 "> 
				<span class="text-xs font-medium">${{ item.product.price }}</span> 
			</div>
			<a href="#" @click.prevent="removeProductFromCart(item.product.id)"> <i class="fa fa-close text-xs font-large"></i> </a>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	name:'CartProduct',
	props:['item'],
	methods:{
		...mapActions({
			removeProductFromCart:'shopping/removeProductFromCart',
			decreaseProductQuantity:'shopping/decreaseProductQuantity',
			addProductToCart:'shopping/addProductToCart'
		}),
		addToCart(){
			this.addProductToCart({ product:this.item.product, quantity:1 })
		}
	}
}
</script>