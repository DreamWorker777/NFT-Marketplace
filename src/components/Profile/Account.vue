<template>

    <form class="form-border">
        <div class="row">

            <div class="col-md-6">
                <div class="field-set">
                    <label>First Name:</label>
                    <input 
                        type='text' 
                        name='firstname' 
                        id='firstname' 
                        :class="{'form-control': true, 'error_input': !validateForm.firstname}"
                        v-model="userProfile.firstname"
                        :readonly="editable"
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
                        v-model="userProfile.lastname"
                        :readonly="editable"
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
                        v-model="userProfile.username"
                        :readonly="editable"
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
                        v-model="userProfile.email"
                        :readonly="editable"
                    >
                </div>
            </div>

            

            <div class="col-md-12">

                <div class="setCenter">
                    <button 
                        type="button"
                        class="btn btn-main color-2"
                        v-if="editable"
                        @click.prevent="editfunc"
                    >
                        Edit
                    </button>

                    <button 
                        type="button"
                        class="btn btn-main color-1"
                        v-if="!editable"
                    >
                        Submit
                    </button>

                    <button 
                        type="button"
                        class="btn btn-main btn-back"
                        v-if="!editable"
                        @click.prevent="cancelfunc"
                    >
                        Cancel
                    </button>
                </div>

                <div class="clearfix"></div>
            </div>

        </div>
    </form>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        editable: true,
        userProfile: {
            username: 'test',
            firstname: 'test',
            lastname: 'test',
            email: 'test@se.com',
        },
        validateForm: {
            username: true,
            firstname: true,
            lastname: true,
            email: true,
        }
    }),
    computed: {
        ...mapGetters([
            'profile',
        ]),
    },
    mounted() {
        console.log( this.profile )
        if( this.profile ) {
            this.userProfile.username = this.profile.username;
            this.userProfile.firstname = this.profile.firstname;
            this.userProfile.lastname = this.profile.lastname;
            this.userProfile.email = this.profile.email;
        }
    },
    methods: {
        editfunc() {
            this.editable = false;
        },
        cancelfunc() {
            this.editable = true;
            this.userProfile.username = this.profile.username;
            this.userProfile.firstname = this.profile.firstname;
            this.userProfile.lastname = this.profile.lastname;
            this.userProfile.email = this.profile.email;
        }
    }
}
</script>

<style lang="scss" scoped>
.setCenter {
    text-align: center;
}
.btn {
    margin-left: 10px;
    margin-right: 10px;

    &-back {
        background-color: #7e7e7e;
    }
}
</style>