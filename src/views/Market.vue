<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="text-h1 font-weight-bold">MarketPlace</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row >
        <v-col cols="12">
          <v-card class="mt-n16 pa-8">
            <v-row class="ma-0">
              <v-col
                v-for="(item, index) in datas"
                :key="index"
                class="d-flex child-flex"
                cols="3"
              >
               
                <v-card
                  valid
                  width="100%"
                  @click="nftItemView(item.id)"
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  
</template>

<script>
import { initweb3, getWeb3 } from '@/web3Server';
import { mapActions } from 'vuex'
import Binancelogo from '@/components/Binancelogo.vue'
export default {
  components: {
    Binancelogo
  },
  data: () => ({
    web3: null,
    datas: [],
  }),
  computed: {
    // ...mapGetters([
    //   'web3',
    // ]),
  },
  async mounted() {
    // this.getAllDatas();
    this.web3 = initweb3;
    if(typeof this.web3 === 'undefined'){
      console.log('undefin log');
      this.web3 = await getWeb3();
    }
    // this.web3 = await getWeb3();
    console.log('first mounted', this.web3);
    const networkId = await this.web3.eth.net.getId();
    console.log('web3 network', networkId);
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
      this.datas.push({
        id: item.artNFT,
        dataUrl: "https://ipfs.io/ipfs/"+item.ipfsHashofArt,
        title: item.artNFTname,
        detail: item.artNFTSymbol,
        price: this.web3.utils.fromWei(item.artPrice, 'ether'),
      })
    })
    console.log('=== all Arts ===', this.datas);
  },
  methods: {
    ...mapActions([
      'getNFTs',
    ]),
    nftItemView(id) {
      // alert(id);
      this.$router.push(`/market/${id}`)
      // location.href=`./market/${id}`
    },
    getAllDatas(){
      this.getNFTs().then((res) => {
        console.log(res);
        res.data.nftdata.map((item) => {
          this.datas.push({
            id: item._id,
            dataUrl: item.datalink,
            title: item.title,
            price: item.price,
          })
        })
      })
    }
  }
}
</script>