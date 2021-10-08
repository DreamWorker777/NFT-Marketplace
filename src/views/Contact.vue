<template>
    <div class="no-bottom no-top" id="content">
        <div id="top"></div>
        
        <!-- section begin -->
        <section id="subheader" class="text-light" data-bgimage="url(images/background/subheader.jpg) top">
            <div class="center-y relative text-center">
                <div class="container">
                    <div class="row">
                        
                        <div class="col-md-12 text-center">
                            <h1>Contact Us</h1>
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
                    
                    <div class="col-lg-8 mb-sm-30">
                    <h3>Do you have any question?</h3>
                    
                    <form name="contactForm" id="contact_form" class="form-border">

                        <div class="field-set">
                            <textarea 
                                name="message" 
                                id="message" 
                                class="form-control" 
                                placeholder="Your Message"
                                v-model="ticketForm.ticketContent"
                                >
                            </textarea>
                        </div>

                        <div class="spacer-half"></div>

                        <div id="submit">
                            <button 
                                class="btn btn-main"
                                @click.prevent="sendTicket"
                            >
                                Send Now
                            </button>
                        </div>
                        <div id="mail_success" class="success">Your message has been sent successfully.</div>
                        <div id="mail_fail" class="error">Sorry, error occured this time sending your message.</div>
                    </form>
                </div>
                
                <div class="col-lg-4">

                    <div class="padding40 box-rounded mb30" data-bgcolor="#F2F6FE">
                        <h3>US Office</h3>
                        <address class="s1">
                            <span><i class="id-color fa fa-map-marker fa-lg"></i>08 W 36th St, New York, NY 10001</span>
                            <span><i class="id-color fa fa-phone fa-lg"></i>+1 333 9296</span>
                            <span><i class="id-color fa fa-envelope-o fa-lg"></i><a href="mailto:contact@example.com">contact@example.com</a></span>
                            <span><i class="id-color fa fa-file-pdf-o fa-lg"></i><a href="#">Download Brochure</a></span>
                        </address>
                    </div>


                    <div class="padding40 bg-color text-light box-rounded">
                        <h3>AU Office</h3>
                        <address class="s1">
                            <span><i class="fa fa-map-marker fa-lg"></i>100 Mainstreet Center, Sydney</span>
                            <span><i class="fa fa-phone fa-lg"></i>+61 333 9296</span>
                            <span><i class="fa fa-envelope-o fa-lg"></i><a href="mailto:contact@example.com">contact@example.com</a></span>
                            <span><i class="fa fa-file-pdf-o fa-lg"></i><a href="#">Download Brochure</a></span>
                        </address>
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
    name: 'About',
    data: () => ({
        ticketForm: {
            ticketContent: '',
        },
        validateForm: {
            ticketContent: true,
        }        
    }),
    methods: {
        ...mapActions([
            'setLoading',
            'sendTicketAction'
        ]),
        async sendTicket() {
            if( this.validate() ) {
                const self = this;

                this.setLoading(true);

                await this.sendTicketAction({ ticketContent: this.ticketForm.ticketContent }).then(() => {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully sent the message'
                    });
                    self.ticketForm.ticketContent = '';
                }).catch(() => {
                    this.$notify({
                        group: 'foo',
                        type: 'warn',
                        title: 'Oops!',
                        text: 'Something went wrong.'
                    });
                });

                this.setLoading(false);
            }
        },
        validate() {
            this.validateForm.ticketContent = true;

            if( this.ticketForm.ticketContent.length < 10 ) {
                this.$toasted.error('Please enter message at least 10 characters.');
                this.validateForm.ticketContent = false;
                return false;
            }

            return true;
        }
    }
}
</script>