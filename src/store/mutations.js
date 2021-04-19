export const setMessage = (state, msg_obj) =>{
	state.flash_msg.type = msg_obj.type;
	state.flash_msg.message = msg_obj.message
}

export const clearMessage = (state) =>{
	state.flash_msg.type = null;
	state.flash_msg.message = null;
}