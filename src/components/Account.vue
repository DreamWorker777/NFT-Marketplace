<template>
  <div>
    <!-- <v-row>
      <v-col cols="12">
        <v-text-field label="User Name" outlined v-model="userProfile.username" :readonly="editable"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field label="First Name" outlined  v-model="userProfile.firstname" :readonly="editable"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field label="Last Name" outlined  v-model="userProfile.lastname" :readonly="editable"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field label="Email" outlined  v-model="userProfile.email" :readonly="editable"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="end" align="center">
        <v-btn class="ma-3" color="primary" v-if="editable" @click="editfunc">Edit</v-btn>
        <v-btn class="ma-3" color="warning" v-if="!editable">Submit</v-btn>
        <v-btn class="ma-3" color="error" v-if="!editable" @click="cancelfunc">Cancel</v-btn>
    </v-row> -->
  </div>
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
    }  
  }),
  computed: {
    ...mapGetters([
      'profile',
    ]),
  },
  mounted() {
    console.log(this.profile)
    if(this.profile){
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
    cancelfunc(){
      this.editable = true;
      this.userProfile.username = this.profile.username;
      this.userProfile.firstname = this.profile.firstname;
      this.userProfile.lastname = this.profile.lastname;
      this.userProfile.email = this.profile.email;
    }
  }
}
</script>
