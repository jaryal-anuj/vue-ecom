export const authSuccess = (state, user)=>{
	state.user.authenticated= true;
	state.user.data = user;
	//console.log(state);
}
