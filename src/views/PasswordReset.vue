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
                                    <h3 class="mb10">Reset Password</h3>

                                    <p>Do you want to go back to the home page?
                                        <router-link :to="{ name: 'Home' }"> Go to home page<span></span> </router-link>
                                    </p>

                                    <form name="contactForm" id='contact_form' class="form-border">                                        
                                        <div class="field-set">
                                            <input 
                                                type='password'
                                                :class="{'form-control': true, 'error_input': !validateForm.password}"
                                                placeholder="password"
                                                v-model="resetForm.password"
                                                >
                                        </div>
                                        
                                        <div class="field-set">
                                            <input 
                                                type='password'
                                                :class="{'form-control': true, 'error_input': !validateForm.passwordConfirm}"
                                                placeholder="passwordConfirm"
                                                v-model="resetForm.passwordConfirm"
                                                >
                                        </div>

                                        <div class="field-set">
                                            <button
                                                class="btn btn-main btn-fullwidth color-2 submitButton"
                                                @click.prevent="resetPasswordSubmit"
                                                >
                                                Submit
                                            </button>
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
    name: 'PasswordReset',
    data: () => ({
        resetForm: {
            password: '',
            passwordConfirm: '',
            userId: '',
            token: '',
        },
        validateForm: {
            password: true,
            passwordConfirm: true
        },
    }),
    methods: {
        ...mapActions([
            'resetPassword',
            'setLoading'
        ]),
        validate() {
            this.validateForm.password = true;
            this.validateForm.passwordConfirm = true;

            if( !this.resetForm.password || this.resetForm.password.length < 8 ) {
                this.validateForm.password = false;
                this.$toasted.error('Password must contain at least 8 characters.');
                return false;
            }
            if( this.resetForm.password != this.resetForm.passwordConfirm ) {
                this.validateForm.passwordConfirm = false;
                this.$toasted.error('Password confirmation failed.');
                return false;
            }

            return true;
        },
        resetPasswordSubmit() {
            let self = this;

            if(this.validate()) {
                // TO DO : call login API
                this.setLoading(true);

                this.resetForm.userId = this.$route.query.id;
                this.resetForm.token = this.$route.query.token;

                this.resetPassword(this.resetForm).then((res) => {
                    if( res.data.success ) {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: 'Success',
                            text: 'You have resetted the password!'
                        });

                        self.$router.push({ name: 'Home' });
                    } else {
                        this.$notify({
                            group: 'foo',
                            type: 'warn',
                            title: 'Resetting Password Failed',
                            text: res.data.message
                        });
                    }
                    this.setLoading(false);
                }).catch( err => {
                    console.log('reset password: ', err);
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Failed',
                        text: 'Something went wrong.'
                    });
                    this.setLoading(false);
                });
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.submitButton {
    margin-top: 20px;
}
</style>