<template>
    <div class="no-bottom no-top" id="content">
        <div id="top"></div>
        
        <section 
            class="full-height relative no-top no-bottom vertical-center" 
            data-bgimage="url(images/background/subheader.jpg) top" 
            data-stellar-background-ratio=".5">

            <div class="overlay-gradient t50">
                <div class="center-y relative">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-5 text-light wow fadeInRight" data-wow-delay=".5s">
                                <div class="spacer-10"></div>
                                <h1>Create, sell or collect digital items.</h1>
                                <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.</p>
                            </div>
                            
                            <div class="col-lg-4 offset-lg-2 wow fadeIn" data-wow-delay=".5s">
                                <div class="box-rounded padding40" data-bgcolor="#ffffff">
                                    <h3 class="mb10">Sign In</h3>

                                    <p>Login using an existing account or create a new account 
                                        <router-link :to="{ name: 'SignUp' }"> here<span></span> </router-link>
                                    </p>

                                    <form name="contactForm" id='contact_form' class="form-border">
                                        <div class="field-set">
                                            <input 
                                                type='text' 
                                                name='email' 
                                                id='email' 
                                                :class="{'form-control': true, 'error_input': !validateForm.username}"
                                                placeholder="username"
                                                v-model="loginForm.username"
                                                >
                                        </div>
                                        
                                        <div class="field-set">
                                            <input 
                                                type='password' 
                                                name='password' 
                                                id='password' 
                                                :class="{'form-control': true, 'error_input': !validateForm.password}"
                                                placeholder="password"
                                                v-model="loginForm.password"
                                                >
                                        </div>

                                        <div class="field-set">
                                            <button 
                                                id='send_message' 
                                                class="btn btn-main btn-fullwidth color-2"
                                                @click.prevent="loginSubmit"
                                                >
                                                Submit
                                            </button>
                                        </div>

                                        <div class="clearfix"></div>

                                        <div class="spacer-single"></div>

                                        <!-- social icons -->
                                        <ul class="list s3">
                                            <li>Login with:</li>
                                            <li><a href="#">Facebook</a></li>
                                            <li><a href="#">Google</a></li>
                                        </ul>
                                        <!-- social icons close -->
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    data: () => ({
        loginForm: {
            username: '',
            password: '',
        },
        validateForm: {
            username: true,
            password: true,
        }
    }),
    methods: {
        ...mapActions([
            'login',
        ]),
        validate() {
            if( !this.loginForm.username )
                this.validateForm.username = false;
            if( !this.loginForm.password || this.loginForm.password.length < 8 )
                this.validateForm.password = false;

            if( this.validateForm.username && this.validateForm.password )
                return true;
            
            return false;
        },
        loginSubmit() {
            let self = this;

            if(this.validate()) {

                this.login(this.loginForm).then((res) => {
                    
                    console.log(res);
                    console.log(self.$router);

                    location.href = "./";
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#send_message {
    color: white !important;
}
</style>