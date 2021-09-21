<template>
  <div class="fill-height" :style="headerStyle">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col class="ma-auto" cols="4">
          <v-form v-model="loginvalid" ref="logform">
            <v-card class="pa-10 deep-purple darken-4  white--text" outlined elevation="24">
              <v-row>
                <v-col class="mb-4" cols="12">
                  <h1>Login</h1>
                  <h2>Welcome back to Website</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="username"
                    solo
                    :rules="[rules.required]"
                    type="text"
                    name="username"
                    v-model="loginform.username"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Password"
                    solo
                    v-model="loginform.password"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="passwordShow ? 'text' : 'password'"
                    name="password"
                    hint="At least 8 characters"
                    counter
                    @click:append="passwordShow = !passwordShow"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    :disabled="!loginvalid"
                    block
                    elevation="25"
                    color="pink"
                    @click="loginSubmit"
                  >
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bgheroM.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundSize: '100% 100%',
        backgroundImage: `url(${this.header})`
      };
    }
  },
  data: () => ({
    background: require("@/assets/img/mariya-georgieva.jpg"),
    loginvalid: true,
    passwordShow: false,
    loginform: {
                username: '',
                password: '',
              },
    rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
  }),
  methods: {
    ...mapActions([
      'login',
    ]),
    loginSubmit(){
      console.log(this.$refs.logform.validate());
      let self = this;
      if(this.$refs.logform.validate()){
        console.log(this.loginform);
        this.login(this.loginform).then((res) => {
          console.log(res);
          console.log(self.$router);
          // self.$router.push('/market');
          location.href = "./";
        })
      }
    }
  }
}
</script>