<template>
    <div class="no-bottom no-top" id="content">
        <div id="top"></div>
        
        <!-- section begin -->
        <section id="subheader" class="text-light" data-bgimage="url(images/background/subheader.jpg) top">
            <div class="center-y relative text-center">
                <div class="container">
                    <div class="row">
                        
                        <div class="col-md-12 text-center">
                            <h1>Register</h1>
                            <p>Anim pariatur cliche reprehenderit</p>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
        <!-- section close -->

        <section aria-label="section">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <h3>Don't have an account? Register now.</h3>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        
                        <div class="spacer-10"></div>
                        
                        <form name="contactForm" id='contact_form' class="form-border">

                            <div class="row">

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>First Name:</label>
                                        <input 
                                            type='text' 
                                            name='firstname' 
                                            id='firstname' 
                                            :class="{'form-control': true, 'error_input': !validateForm.firstname}"
                                            v-model="signUpForm.firstname"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Full Name:</label>
                                        <input 
                                            type='text' 
                                            name='lastname' 
                                            id='lastname' 
                                            :class="{'form-control': true, 'error_input': !validateForm.lastname}"
                                            v-model="signUpForm.lastname"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Choose a Username:</label>
                                        <input 
                                            type='text' 
                                            name='username' 
                                            id='username' 
                                            :class="{'form-control': true, 'error_input': !validateForm.username}"
                                            v-model="signUpForm.username"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Email Address:</label>
                                        <input 
                                            type='text' 
                                            name='email' 
                                            id='email' 
                                            :class="{'form-control': true, 'error_input': !validateForm.email}"
                                            v-model="signUpForm.email"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Password:</label>
                                        <input 
                                            type='password' 
                                            name='password' 
                                            id='password' 
                                            :class="{'form-control': true, 'error_input': !validateForm.password}"
                                            v-model="signUpForm.password"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="field-set">
                                        <label>Re-enter Password:</label>
                                        <input 
                                            type='password' 
                                            name='passwordConfirm' 
                                            id='passwordConfirm' 
                                            :class="{'form-control': true, 'error_input': !validateForm.passwordConfirm}"
                                            v-model="signUpForm.passwordConfirm"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="field-set">
                                        <label>Wallet:</label>
                                        <input 
                                            type='text'
                                            readonly 
                                            name='wallet' 
                                            id='wallet' 
                                            :class="{'form-control': true, 'error_input': !validateForm.wallet}"
                                            v-model="signUpForm.wallet"
                                        >
                                    </div>
                                </div>

                                <div class="col-md-12">

                                    <div id='submit' class="pull-left">
                                        <button 
                                            class="btn btn-main color-2"
                                            @click.prevent="signUpSubmit"
                                        >
                                            Register Now
                                        </button>
                                    </div>

                                    <div class="clearfix"></div>
                                </div>

                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>        
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { getWeb3 } from '@/web3Server';
export default {
    computed: {
        // To Do: computed funcitons
    },
    async mounted() {
        this.web3 = await getWeb3();
        this.accounts = await this.web3.eth.getAccounts();

        if( this.accounts.length < 1 ){
            this.getAccounts();
        } else {
            this.signUpForm.wallet = this.accounts[ 0 ];
        }
    },
  data: () => ({
    web3: null,
    accounts: [],
    signupvalid: true,
    signUpForm: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        wallet: '',
    },
    validateForm: {
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        password: true,
        passwordConfirm: true,
        wallet: true,
    },
  }),
  methods: {
    ...mapActions([
        'signup',
    ]),
    signUpSubmit( ) {
        let self = this;
        if( this.validate() ) {
            
            this.signup( this.signUpForm ).then(( res ) => {
                if( res.data.success ) {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: 'Success',
                        text: res.data.message
                    });
                    self.$router.push('/login');
                } else {
                    this.$notify({
                        group: 'foo',
                        type: 'warn',
                        title: 'Register Failed',
                        text: res.data.message
                    });
                }
            }).catch( (err) => {
                console.warn(err);

                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Register failed',
                    text: 'Something went wrong!'
                });
            });
        }
    },
    getAccounts() {
        const getAccInterval = setInterval( async () => {
            this.accounts = await this.web3.eth.getAccounts();
            if( this.accounts.length > 0 ) {
                this.signUpForm.wallet = this.accounts[0];
                clearInterval( getAccInterval );
            }
        })
    },
    validate() {        
        this.validateForm.firstname = true;
        this.validateForm.lastname = true;
        this.validateForm.username = true;
        this.validateForm.email = true;
        this.validateForm.password = true;
        this.validateForm.passwordConfirm = true;
        this.validateForm.wallet = true;

        if( !this.signUpForm.firstname ) {
            this.$toasted.error('Please enter your first name.');
            this.validateForm.firstname = false;
            return false;
        }

        if( !this.signUpForm.lastname ) {
            this.$toasted.error('Please enter your full name.');
            this.validateForm.lastname = false;
            return false;
        }

        if( !this.signUpForm.username ) {
            this.$toasted.error('Please enter your user name.');
            this.validateForm.username = false;
            return false;
        }

        if( !this.signUpForm.email || /.+@.+/.test( this.signUpForm.email ) === false ) {
            if( !this.signUpForm.email )
                this.$toasted.error('Please enter your email.');
            else
                this.$toasted.error('Please enter your email correctly. For example: example@123.com');
            this.validateForm.email = false;
            return false;
        }

        if( !this.signUpForm.password || (this.signUpForm.password && this.signUpForm.password.length < 8) ) {
            if( !this.signUpForm.password )
                this.$toasted.error('Please enter your password.');
            else
                this.$toasted.error('Please enter password at least 8 characters.');
            this.validateForm.password = false;
            return false;
        }

        if( this.signUpForm.passwordConfirm != this.signUpForm.password ) {
            this.$toasted.error('Password confirmation failed.');
            this.validateForm.passwordConfirm = false;
            return false;
        }

        if( !this.signUpForm.wallet ) {
            this.$toasted.error('Please connect the wallet.');
            this.validateForm.wallet = false;
            return false;
        }

        return true;
    }
  }
}
</script>
