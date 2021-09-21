<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      src="@/assets/img/bgDrawer.jpg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="@/assets/logo.png" alt="Logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">Calango</v-list-item-title>
            <v-list-item-subtitle>WEB</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list dense>
        <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          @click="gotoLink(link)"
          link 
          >
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      :flat="flat"
      :color="color"
      dark
      class="px-16"
      :class="{ expand: flat }"
    >
      <v-toolbar-title>
        <v-img src="@/assets/logo.png" max-width="50px"/>
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
      />
      <div v-else class="justify-center align-center d-flex">
        <v-btn text  @click="gotoLink('/market')">
          <v-icon>mdi-shopping-music</v-icon>
          <span class="mr-2">
            marketplace
          </span>
        </v-btn>
        <v-btn text @click="gotoLink('#')">
          <v-icon>mdi-clipboard-text-outline</v-icon>
          <span class="mr-2">
            About
          </span>
        </v-btn>
        <v-btn text @click="gotoLink('#')">
          <v-icon>mdi-clipboard-text-outline</v-icon>
          <span class="mr-2">
            Faq
          </span>
        </v-btn>
        <v-btn text  v-if="!isAuthenticated" @click="gotoLink('/login')">
          <v-icon>mdi-account-check</v-icon>
          <span class="mr-2">
            Login
          </span>
        </v-btn>
        <v-btn text  v-if="!isAuthenticated" @click="gotoLink('/signup')">
          <v-icon>mdi-account-plus</v-icon>
          <span class="mr-2">
            Register
          </span>
        </v-btn>
        <v-menu offset-y v-if="isAuthenticated">
          <template v-slot:activator="{on, attrs}">
            <div
              class="ma-5"
              v-bind="attrs"
              v-on="on"
            >
              <v-avatar class="mr-2">
                <!-- <v-img :src="getprofileImg"/> -->
                <v-img src="@/assets/logo.png"/>
              </v-avatar>
              <span>{{profile.username}}</span>      
            </div>
          </template>
          <v-list class="text-start">
            <v-list-item @click="gotoLink('/profile')">
              <v-list-item-title>
                   Profile
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="gotoLink('/generatenft')">
              <v-list-item-title>
                   Ganerate NFT
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logouter">
              <v-list-item-title>
                   Logout
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-col>
        </v-col>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    drawer: null,
    isXs: false,
    items: [
      ["mdi-shopping-music", "marketplace", "/market"],
      ["mdi-clipboard-text-outline", "About", "#features"],
      ["mdi-lock-question", "Faq", "#download"],
      ["mdi-account-check", "Login", "/login"],
      ["mdi-account-plus", "Register", "/signup"],
    ],
  }),
  props: {
    color: String,
    flat: Boolean
  },
  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
   computed: {
    ...mapGetters([
      'isAuthenticated',
      'profile',
    ]),
    getprofileImg() {
      console.log('test state work');
      console.log(this.profile);
      if (this.profile.avata) {
        return this.profile.avata;
      } else {
        return this.profilImg;
      }
    },
    getUsername(){
      return this.profile.username;
    }
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    gotoLink(link) {
      console.log(link);
      
      this.$router.push(link);
    },
    logouter() {
      this.logout().then((res) => {
        console.log(res);
        location.href="./"
      });
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
}
</script>