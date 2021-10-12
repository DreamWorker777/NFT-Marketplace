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
                                <div class="box-rounded padding40" data-bgcolor="#ffffff" v-show="loginPage">
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

                                        <div class="forgot_password">
                                            <a href="#" @click.prevent="setForgotPassword">Forgot Password?</a>
                                        </div>
                                        
                                        <div class="field-set">
                                            <button
                                                class="btn btn-main btn-fullwidth color-2"
                                                @click.prevent="loginSubmit"
                                                >
                                                Submit
                                            </button>
                                        </div>

                                        <div class="clearfix"></div>

                                        <div class="spacer-single"></div>
                                    </form>
                                </div>

                                <div class="box-rounded padding40" data-bgcolor="#ffffff" v-show="forgotPasswordPage">
                                    <h3 class="mb10">Forgot Password?</h3>

                                    <p>
                                        Enter your email and we'll send you instructions to reset your password
                                    </p>

                                    <form class="form-border">
                                        <div class="field-set">
                                            <input 
                                                type='text' 
                                                name='reset_username' 
                                                id='reset_username' 
                                                :class="{'form-control': true, 'error_input': !validateForm.reset_username}"
                                                placeholder="happyCreator"
                                                v-model="resetForm.username"
                                                >
                                        </div>

                                        <div class="field-set">
                                            <input 
                                                type='text' 
                                                name='reset_email' 
                                                id='reset_email' 
                                                :class="{'form-control': true, 'error_input': !validateForm.reset_email}"
                                                placeholder="john@example.com"
                                                v-model="resetForm.email"
                                                >
                                        </div>

                                        <div class="backLogin">
                                            <a href="#" @click.prevent="setLogin">Back to Login</a>
                                        </div>
                                        
                                        <div class="field-set">
                                            <button
                                                class="btn btn-main btn-fullwidth color-2"
                                                @click.prevent="resetPasswordSubmit"
                                                >
                                                Send reset link
                                            </button>
                                        </div>

                                        <div class="clearfix"></div>

                                        <div class="spacer-single"></div>
                                    </form>
                                </div>

                                <div class="box-rounded padding40" data-bgcolor="#ffffff" v-show="checkEmailPage">
                                    <h3 class="mb10">Request sent!</h3>

                                    <p>
                                        We have sent instructions to your email. If you don't receive it in few minutes, please try again.
                                    </p>

                                    <form class="form-border">

                                        <div class="backLogin mt50">
                                            <a href="#" @click.prevent="setLogin">Back to Login</a>
                                        </div>
                                        
                                        <div class="clearfix"></div>

                                        <div class="spacer-single"></div>
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
        resetForm: {
            username: '',
            email: '',
        },
        validateForm: {
            username: true,
            password: true,
            reset_username: true,
            reset_email: true,
        },
        loginPage: true,
        forgotPasswordPage: false,
        checkEmailPage: false,
    }),
    methods: {
        ...mapActions([
            'login',
            'requestReset',
            'setLoading'
        ]),
        validate() {
            this.validateForm.username = true;
            this.validateForm.password = true;

            if( !this.loginForm.username )
                this.validateForm.username = false;
            if( !this.loginForm.password || this.loginForm.password.length < 8 )
                this.validateForm.password = false;

            if( this.validateForm.username && this.validateForm.password )
                return true;

            this.$toasted.error('Please enter username or password correctly.')
            return false;
        },
        loginSubmit() {
            let self = this;

            if(this.validate()) {
                // TO DO : call login API
                
                this.setLoading(true);

                this.login(this.loginForm).then((res) => {
                    if( res.data.success ) {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Success',
                            text: 'You have signed in to this site!'
                        });

                        self.$router.push({ name: 'Home' });
                        // location.href = "./";
                    } else {
                        this.$notify({
                            group: 'foo',
                            type: 'warn',
                            title: 'Login Failed',
                            text: res.data.message
                        });
                    }
                    this.setLoading(false);
                }).catch( err => {
                    console.warn('login: ', err);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Login Failed',
                        text: 'Something went wrong.'
                    });
                    this.setLoading(false);
                });
            }
        },
        resetPasswordSubmit() {
            this.validateForm.reset_username = true;
            this.validateForm.reset_email = true;

            if( !this.resetForm.username ) {
                this.validateForm.reset_username = false;
                this.$toasted.error('Username required.')
                return;
            }

            if( !this.resetForm.email ) {
                this.validateForm.reset_email = false;
                this.$toasted.error('Email required.')
                return;
            }

            if( /.+@.+/.test( this.resetForm.email ) === false ) {
                this.validateForm.email = false;
                this.$toasted.error('Please enter email correctly.')
                return;
            }
            
            this.setLoading(true);

            this.requestReset(this.resetForm).then((res) => {
                if( res.data.success ) {
                    this.checkEmailPage = true;
                    this.loginPage = false;
                    this.forgotPasswordPage = false;
                } else {
                    this.$notify({
                        group: 'foo',
                        type: 'warn',
                        title: 'Request Failed',
                        text: res.data.message
                    });
                }

                this.setLoading(false);
            }).catch( err => {
                console.warn('resetpass: ', err);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Request Failed',
                    text: 'Something went wrong.'
                });

                this.setLoading(false);
            })
        },
        setForgotPassword() {
            this.forgotPasswordPage = true;
            this.loginPage = false;
            this.checkEmailPage = false;
        },
        setLogin() {
            this.loginPage = true;
            this.forgotPasswordPage = false;
            this.checkEmailPage = false;
        }
    }
}
</script>

<style lang="scss" scoped>
#send_message {
    color: white !important;
}
.forgot_password {
    text-align: right;
    width: 100%;
    margin-top: -10px;
    margin-bottom: 20px;
}
.backLogin {
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
}
</style>