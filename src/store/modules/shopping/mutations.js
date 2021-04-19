export const setProducts = (state, products) =>{
	state.products = products
}

export const setCart = (state, items) =>{
	state.cart = items
}

export const appendToCart = (state, { product, quantity}) =>{
	const existing  = state.cart.find(item => {
		return item.product.id === product.id
	})

	if(existing){
		existing.quantity++
	}else{
		state.cart.push({
			product,
			quantity:quantity
		})
	}

}

export const decreaseProductQuantity = (state,productId)=>{
	let existing  = state.cart.find(item => {
		return item.product.id === productId
	});
	if(existing.quantity == 1){
		removeFromCart(state,productId)
	}else{
		existing.quantity--;
	}
}

export const removeFromCart = (state,  productId) =>{
	

	// if(existing){
	// 	existing.quantity--
	// }else{
		state.cart = state.cart.filter(item=>{
			return item.product.id !== productId
		})
	// }
}

export const clearCart = (state) => {
	state.cart=[];
}