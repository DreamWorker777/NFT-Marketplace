<template>
<div>
  <v-parallax
  height="150"
    dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
  </v-parallax>
  <v-container>
    <!-- <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    @click="uploadImg()"
    ref="profileImg"  max-width="150" height="150" class="rounded-circle ma-auto mt-n16"/> -->
    <v-avatar
      class="mt-n16"
      size="128"
    >
      <v-img :src="getProfileImage"
        ref="profileImg"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height blue" justify="center" align="end">
            <v-col class="blue">
            
            </v-col>
          </v-row>
        </template>
        <template>
          <v-row justify="center" align="end">
            <v-col class="mb-3 blue lighten-2" @click="uploadImg()">
              <v-icon>mdi-upload</v-icon>
            </v-col>
          </v-row>
        </template>
      </v-img>
    </v-avatar>
    <input type="file" ref="imgfile" @change="onLoadImgChange" style="display: none"/>
    <v-row class="mt-10">
      <v-col cols="12">
        <v-container>
          <v-row class="pa-5" justify="center" align="start">
            <v-col cols="12">
              <v-card class="pa-6" elevation="24">
                <v-tabs vertical>
                  <v-tab>
                    <v-row class="pa-3" justify="start" align="center">
                      <v-icon>mdi-account</v-icon>
                      Account
                    </v-row>
                  </v-tab>
                  <v-tab>
                    <v-row class="pa-3" justify="start" align="center">
                      <v-icon>
                        mdi-wallet
                      </v-icon>
                      Wallet
                    </v-row>
                  </v-tab>
                  <v-tab>
                    <v-row class="pa-3" justify="start" align="center">
                      <v-icon>
                        mdi-access-point
                      </v-icon>
                      Collections
                    </v-row>
                  </v-tab>
                  <v-tab-item>
                    <v-card flat>
                      <v-row>
                        <v-col cols="12">
                          <v-container>
                            <Account />
                          </v-container>  
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-row>
                        <v-col cols="12">
                          <v-container>
                            <v-row>
                              <v-text-field label="WalletId" outlined v-model="wallet.walletId" readonly></v-text-field>
                            </v-row>
                            <v-row>
                              <v-text-field label="Ballence" outlined v-model="wallet.ballance" readonly></v-text-field>
                            </v-row>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-row>
                        <v-col cols="12">
                          <v-container>
                            <!-- <Collections /> -->
                            <v-row>
                              <v-col v-for="(item, index) in collections"
                              :key="index" cols="4">
                                <v-card
                                  valid
                                  width="100%"
                                  :elevation="24">
                                  <v-app-bar flat color="#fff">
                                    <v-btn
                                      color="red"
                                      icon
                                    >
                                      <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                  </v-app-bar>
                                  <v-img
                                    :src="item.dataUrl"
                                    aspect-ratio="1"
                                    class="grey lighten-2"
                                  />
                                  <v-card-text>
                                    <v-row>
                                      <v-col cols="6">
                                        <div class="text-start font-weight-bold mb-2">
                                          <h4 class="text-h6 font-weight-bold">{{item.title}}</h4>
                                        </div>
                                        <div class="text-start font-weight-bold">
                                          <v-icon>mdi-link-variant</v-icon>
                                        </div>
                                      </v-col>
                                      <v-col cols="6">
                                        <div class="text-end font-weight-bold mb-2">
                                          Price
                                        </div>
                                        <div class="text-end font-weight-bold align-center justify-end d-flex subtitle-1">
                                          <Binancelogo class="mr-2" /> {{item.price}}
                                        </div>
                                      </v-col>
                                    </v-row>
                                    
                                  </v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>                                                              
      
    </v-row>
  </v-container>
  
  </div>
</template>

<script>
import { initweb3, getWeb3 } from '@/web3Server';
import Account from '@/components/Account.vue'
// import Collections from '@/components/Collections.vue'
import { mapGetters, mapActions } from 'vuex'
import Binancelogo from '@/components/Binancelogo.vue'
export default {
  components: {
    Account,
    Binancelogo,
    // Collections,
  },
  data: () => ({
    web3: null,
    wallet: {
      walletId: '',
      ballance: ''
    },
    collections: []
  }),
  computed: {
    ...mapGetters([
      'profile',
    ]),
    getProfileImage () {
      return this.profile.avata;
    }
  },
  async mounted() {
    console.log('MYTEST', this.profile)
    this.web3 = initweb3;
    if(typeof this.web3 === 'undefined'){
      console.log('undefin log');
      this.web3 = await getWeb3();
    }
    console.log(this.web3);
    const networkId = await this.web3.eth.net.getId();
    const tmpwallet = await this.web3.eth.getAccounts();
    console.log('this is my logo file', this.wallet);
    let tmpballent = await this.web3.eth.getBalance(tmpwallet[0]);
    tmpballent = this.web3.utils.fromWei(tmpballent, 'ether')
    console.log('ballance val', tmpballent);
    this.wallet.walletId = tmpwallet[0];
    this.wallet.ballance = tmpballent;

    const jsonArtNFTData = require("../../build/contracts/ArtNFTData.json");
    const deployNet = jsonArtNFTData.networks[networkId.toString()];
    const artNFTData = new this.web3.eth.Contract(
      jsonArtNFTData.abi,
      deployNet && deployNet.address,
    );
    console.log("== instance NFTData ==", artNFTData);
    const allArts = await artNFTData.methods.getAllArts().call();
    console.log("=== all arts contracts ===", allArts);
    allArts.map((item) => {
      if(this.wallet.walletId == item.ownerAddress){
        this.collections.push({
          id: item.artNFT,
          dataUrl: "https://ipfs.io/ipfs/"+item.ipfsHashofArt,
          title: item.artNFTname,
          detail: item.artNFTSymbol,
          price: this.web3.utils.fromWei(item.artPrice, 'ether'),
        })
      }
    })
    console.log('=== all Arts ===', this.collections);
  },
  created() {
    // this.$refs.profileImg.src = this.profile.avata;
    // console.log(this.profile)
  },
  methods: {
    ...mapActions([
      'updateProfileImage',
    ]),
    uploadImg(){
      // alert('upload your image');
      this.$refs.imgfile.click();
    },
    onLoadImgChange() {
      let self = this;
      const uploadImage = this.$refs.imgfile.files;
      var reader = new FileReader();
      reader.onload = function(e){
        var uril = e.target.result;
        self.updateProfileImage(uril).then((res) => {
          console.log(res)
          self.$refs.profileImg.src = uril
        })
      }
      reader.readAsDataURL(uploadImage[0])

    }
  }
}
</script>