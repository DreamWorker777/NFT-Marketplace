<template>
  <header class="transparent">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="de-flex sm-pt10">
                    <div class="de-flex-col">
                        <div class="de-flex-col">
                            <!-- logo begin -->
                            <div id="logo">
                                <router-link :to="{ name: 'Home'}">
                                    <img alt="" class="logo" src="images/logo-light.png" />
                                    <img alt="" class="logo-2" src="images/logo.png" />
                                </router-link>
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
                                <router-link :to="{ name: 'Market' }"> Martketplace<span></span> </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'About' }"> About<span></span> </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'Contact' }"> Contact<span></span> </router-link>
                            </li>
                        </ul>
                        <div class="menu_side_area">
                            <router-link 
                              :to="{ name: 'Login' }" 
                              class="btn-main">

                              <i class="icon_wallet_alt"></i>
                              <span>Login</span> 

                            </router-link>
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
    // ToDo: Component Data (internal)
  }),
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'profile',
    ]),
    getprofileImg() {
      if ( this.profile.avata ) {
        return this.profile.avata;
      } else {
        return this.profilImg;
      }
    },
    getUsername() {
      return this.profile.username;
    }
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
    gotoLink( link ) {
      this.$router.push( link );
    },
    logouter() {
      this.logout().then(( res ) => {
        console.log( 'logout: ', res );
        location.href = "./";
      });
    }
  },
  mounted() {
    // ToDo: Mounted Action
  },
}
</script>

<style lang="scss" scoped>
    
</style>