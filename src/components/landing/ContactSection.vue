<template>
  <section class="pb-8 mt-5" id="contact">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row justify="center">
            <v-col cols="12" class="text-center">
              <h1 class="font-weight-light text-h3 font-weight-bold">Contact US</h1>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="5" class="text-start">
              <h3 class="font-weight-light mt-3">
                You have any questions about our platform or good suggestion, please contact us.
              </h3>
              <h3 class="font-weight-light mt-3">
                Contact Address
              </h3>
              <h3 class="font-weight-light mt-3">
                Telefone: +xx (xx) xxxxx-xxxx
              </h3>
              <h3 class="font-weight-light">
                Email: email@email.com
              </h3>
            </v-col>
            <v-col cols="12" sm="7">
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nome"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-textarea
                    v-model="textArea"
                    :rules="textAreaRules"
                    label="Mensagem"
                    required
                />

                <v-btn
                    :disabled="!valid"
                    color="primary"
                    :dark="valid"
                    rounded
                    block
                    class="mt-3"
                    @click="submit"
                >
                  Enviar
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
        v-model="snackbar.enabled"
        timeout="3000"
        right
        top
        :color="snackbar.color"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="snackbar.enabled = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<style scoped>
#contact {
  background-color: #f4f7f5;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

</style>

<script>
// import {db} from '@/main'

export default {
  data: () => ({
    icons: ["fa-facebook", "fa-twitter", "fa-linkedin", "fa-instagram"],
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "The name field is required",
      (v) => (v && v.length >= 6) || "Name must be longer than 6 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "The name field is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ],
    textArea: "",
    textAreaRules: [
      (v) => !!v || "The name field is required",
      (v) => (v && v.length >= 10) || "Minimum of 10 characters",
    ],
    lazy: false,
    snackbar: {
      enabled: false,
      text: '',
      color: ''
    }
  }),
  methods: {
    submit() {
      /*db.collection("contactData").add({
        name: this.name,
        email: this.email,
        message: this.textArea
      }).then(() => {
        this.snackbar.text = "Mensagem enviada com sucesso"
        this.snackbar.color = "success"
        this.snackbar.enabled = true
      }).catch(() => {
        this.snackbar.text = "Erro ao enviar mensagem"
        this.snackbar.color = "danger"
        this.snackbar.enabled = true
      })*/
    }
  }
};
</script>
