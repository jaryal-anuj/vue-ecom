<template>
    <div class="w-full flex flex-wrap mt-20 mb-4">

        <!-- Login Section -->
        <div class="w-full md:w-1/2 flex flex-col">


            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-black text-3xl">Welcome.</p>
				<Message />
                <form @submit.prevent="submitLoginForm" class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                    <div class="flex flex-col">
                        <label for="email" class="text-lg">Email</label>
                        <input :class="{'border-red-500':v$.form.email.$error}" type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" v-model.trim="form.email" @blur="v$.form.email.$touch()">
                        <p v-if="v$.form.email.$error" class="text-red-500 text-xs">{{ v$.form.email.$errors[0].$message }}</p>
                    </div>
    
                    <div class="flex flex-col">
                        <label for="password" class="text-lg">Password</label>
                        <input :class="{'border-red-500':v$.form.password.$error}" type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" v-model.trim="form.password" @blur="v$.form.password.$touch()">
                        <p v-if="v$.form.password.$error" class="text-red-500 text-xs">{{ v$.form.password.$errors[0].$message }}</p>
                    </div>
    
                    <input type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>Don't have an account? <a href="register.html" class="underline font-semibold">Register here.</a></p>
                </div>
            </div>

        </div>

        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0">
        </div>
    </div>
</template>

<script>
import { email,required, minLength, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { mapActions, mapGetters } from 'vuex'
import Message from '@/components/shared/Message.vue'

export default {
	name:'Login',
	components: {
		Message
	},
	data(){
		return{
			form:{
				email:'',
                password:'',
            }
		}
	},
	setup: () => ({ v$: useVuelidate() }),
	validations() {
        return{
            form:{

                email: {
                    required, email
                },
                password:{
                    required,
                    minLength:minLength(6),
                    maxLength:maxLength(20)
                }
            }
        }
	},
	computed:{
		...mapGetters({
			user:'auth/user'
		})
	},
	methods:{
		...mapActions({
			signIn:'auth/signIn'
		}),
        submitLoginForm(){
            this.v$.$touch();
            //this.v$.$validate();
            if (!this.v$.form.$invalid) {
				this.signIn(this.form);           
            }
        }
    }
}
</script>