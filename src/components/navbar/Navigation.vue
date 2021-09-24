tn<template>
  <!-- <div>
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
  </div> -->
  <header class="transparent">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="de-flex sm-pt10">
                    <div class="de-flex-col">
                        <div class="de-flex-col">
                            <!-- logo begin -->
                            <div id="logo">
                                <a href="index.html">
                                    <img alt="" class="logo" src="@/assets/images/logo-light.png" />
                                    <img alt="" class="logo-2" src="@/assets/images/logo.png" />
                                </a>
                            </div>
                            <!-- logo close -->
                        </div>
                        <div class="de-flex-col">
                            <input id="quick_search" class="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
                        </div>
                    </div>
                    <div class="de-flex-col header-col-mid">
                        <!-- mainmenu begin -->
                        <ul id="mainmenu">
                            <li>
                                <a href="index.html">Home<span></span></a>
                                <ul>
                                    <li><a href="03_grey-index.html">New: Grey Scheme</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="explore.html">Explore<span></span></a>
                                <ul>
                                    <li><a href="explore.html">Explore</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Pages<span></span></a>
                                <ul>
                                    <li><a href="author.html">Author</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Stats<span></span></a>
                                <ul>
                                    <li><a href="activity.html">Activity</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Elements<span></span></a>
                                <ul>
                                    <li><a href="icons-elegant.html">Elegant Icons</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div class="menu_side_area">
                            <a href="wallet.html" class="btn-main"><i class="icon_wallet_alt"></i><span>Connect Wallet</span></a>
                            <span id="menu-btn"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </header>
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

<style lang="scss" scoped>
    
</style>