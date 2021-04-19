

export const getProducts = ({ commit }) =>{
	return fetch('https://vue-ecom-d63d3-default-rtdb.firebaseio.com/products.json').then(res=>{
		if(!res.ok){throw res}
		return res.json();
	}).then(data=>{
		//console.log(data)
		commit('setProducts',data)
		return Promise.resolve()
	})
}

export const addProductToCart = ({ commit,dispatch },{product, quantity}) =>{
	commit('appendToCart',{product,quantity})
	dispatch('flashMessage',{type:'success',message:'Item added to cart'}, {root:true})
}

export const getCart = () =>{
	// get cart from server
}

export const decreaseProductQuantity =({ commit },productId)=>{
	console.log(productId)
	commit('decreaseProductQuantity',productId)
}

export const removeProductFromCart = ({ commit },productId) =>{
	console.log(productId)
	commit('removeFromCart', productId)
}

export const removeAllProductsFromCart = () =>{
	
}