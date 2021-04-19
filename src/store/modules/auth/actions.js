import router from '@/router'

export const signUp = ({ dispatch }, form) =>{
		fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDy5I03BPRvz15-5s3Y5JTnz4hxjqDGJxA',{
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body:JSON.stringify({email:form.email,password:form.password, returnSecureToken:true})
		}).then(response=>{
			if(!response.ok) {
				return response.json().then(error=>{
					throw error;
				});
			}
			return  response.json();
		
		}).then((response)=>{
			console.log('sign up',response);
			dispatch('updateUserInfo', {idToken:response.idToken,displayName:form.name});
			
		}).catch(err=>{
			//console.log(err);
			dispatch('flashMessage',{type:'danger', message:err.error.errors[0].message},{root:true});
		});
		

}


export const updateUserInfo = ({dispatch},data)=>{
	//console.log(data);
	return fetch(
		'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDy5I03BPRvz15-5s3Y5JTnz4hxjqDGJxA',{
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body:JSON.stringify(data)
	}).then(response=>{
		if(!response.ok) {
			return response.json().then(error=>{
				throw error;
			});
		}
		return  response.json();
	
	}).then(response=>{
		console.log('update user info',response);
		dispatch('flashMessage',{type:'success', message:'Register successfully, Please login to continue'},{root:true});
		router.push('/login')
	}).catch(err=>{
		console.log(err);
		dispatch('flashMessage',{type:'danger', message:err.error.errors[0].message || 'Unknown error'},{root:true});
	});
}

let tokenExpirationTimer= null;
//console.log('out',tokenExpirationTimer)
export const setExpirationTimer = ({dispatch},time)=>{
	//console.log('in set',tokenExpirationTimer)
	tokenExpirationTimer= setTimeout(()=>{
		dispatch('authLogout');
	},time);
	//console.log('in set after',tokenExpirationTimer)
}

export const signIn = ({  commit, dispatch }, form) =>{
	return fetch(
		'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDy5I03BPRvz15-5s3Y5JTnz4hxjqDGJxA',{
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({email:form.email,password:form.password, returnSecureToken:true})
	}).then(response=>{
		if(!response.ok) {
			return response.json().then(error=>{
				throw error;
			});
		}
		return  response.json();
	
	}).then(response=>{
		console.log('sign In',response);
		dispatch('setExpirationTimer',+response.expiresIn*1000)
		const expirationDate = new Date(new Date().getTime() + +response.expiresIn*1000);
		let user = {name:response.displayName,email:response.email,localId:response.localId, idToken:response.idToken, expiresIn:expirationDate};
		commit('authSuccess',user);
		localStorage.setItem('userData',JSON.stringify(user));
		dispatch('flashMessage',{type:'success', message:'Login successfully, Please login to continue'},{root:true})
		router.push('/products');
	}).catch(err=>{
		console.log(err);
		dispatch('flashMessage',{type:'danger', message:err.error.errors[0].message || 'Unknown error'},{root:true});
	});
	

}



export const autoLogin = ({commit,dispatch})=>{
	const userData = JSON.parse(localStorage.getItem('userData'));
	if(!userData){
		return {type:'DUMMY'};
	}

	//console.log(userData);
	if(userData.idToken){
		const expirationDuration = new Date(userData.expiresIn).getTime()-new Date().getTime();
		if(expirationDuration < 0){
			return;
		}
		//console.log(expirationDuration);
		tokenExpirationTimer= setTimeout(()=>{
			dispatch('authLogout');
		}, expirationDuration);
		commit('authSuccess',userData);
	}
}

export const authLogout = ()=>{
	//console.log('in logout',tokenExpirationTimer)
	clearTimeout(tokenExpirationTimer);
	//console.log('in logout after',tokenExpirationTimer)
	localStorage.removeItem('userData');
	//console.log(router);
	router.go('/login');
	
}