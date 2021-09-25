<template>
  <div>
    <!-- <v-parallax
      dark
      height="80"
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
    </v-parallax>
    <v-container>
      <v-row class="pt-16">
        <v-col cols="10"  class="mx-auto">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-card
                  elevation="20"
                >
                  <v-img
                    :src="nftDataById.imgUrl"
                    aspect-ratio="0.85"
                  />
                </v-card>
                <v-divider class="mt-5 mb-5"></v-divider>
                <v-container>
                    <v-row>
                      <v-col cols="12">
                        <span class="text-h6 font-weight-bold">{{nftDataById.createdAt}}</span><span class="text-h6"> Created</span> 
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <Binancelogo class="mr-2" />  <span class="text-h4 font-weight-bold">{{nftDataById.price}}</span> <span class="text-h5">(BNB)</span>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-btn v-if="!nftOwner" color="primary" block @click="buyItem()"><v-icon class="mr-3">mdi-wallet</v-icon>Buy Bow</v-btn>
                        <v-btn v-else color="primary" block :disabled="editing" @click="editableData()">Edit</v-btn>  
                      </v-col>
                      <v-col cols="12" sm="12" md="12" v-if="editing">
                          <v-row>
                            <v-col cols="6">
                              <v-btn block color="primary" @click="saveEditedData">Save</v-btn>
                            </v-col>
                            <v-col cols="6">
                              <v-btn block color="warring" @click="cancelEdit">Cancel</v-btn>
                            </v-col>
                          </v-row>
                      </v-col>
                    </v-row>
                </v-container>
              </v-col>

              <v-col class="text-start" cols="12"  sm="8" justify="" align-self="start">
                <v-row class="pa-5">
                  <v-col cols="12">
                      <h2 v-if="!editing" class="mb-4 text-h3 font-weight-bold">{{nftDataById.title}}</h2>
                      <v-text-field
                        v-else
                        outlined
                        label="Title"
                        v-model="nftDataById.title"
                        class="text-h4 font-weight-bold"
                        filled
                        dense
                      ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                      <v-textarea
                        outlined
                        label="Description"
                        :readonly="!editing"
                        class="text-h6"
                        v-model="nftDataById.detail"
                        :value="nftDataById.detail"
                        elevation="12"
                      >
                      </v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-card class="pa-4" elevation="12">
                      <v-row>
                        <v-col cols="12">
                          <span class="text-h6">Onwer : </span>
                          <span v-if="!nftOwner" class="text-h5 font-weight-bold">{{nftDataById.userId}}</span>
                          <span v-else class="text-h5 font-weight-bold">You</span>
                        </v-col>
                        <v-col cols="6">
                          <span class="text-h6">Category :</span> <span class="text-h5 font-weight-bold">{{nftDataById.category}}</span>
                        </v-col>
                        <v-col cols="6">
                          <span class="text-h6">Type :</span> <span class="text-h5 font-weight-bold">{{nftDataById.type}}</span>
                        </v-col>
                        <v-col cols="12">
                          <span class="text-h6">Keyword :</span> <span class="text-h5 font-weight-bold">{{nftDataById.keyword}}</span>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>
<script>
import { initweb3, getWeb3 } from '@/web3Server';
import { mapActions } from 'vuex';
// import Binancelogo from '@/components/Binancelogo.vue'
export default {
  components: {
    // Binancelogo,
  },
  data: () => ({
    web3: null,
    jsonArtNFT: {},
    artNFTData: null,
    getArt: null,
    getArtDetail: null,
    accounts: [],
    artNFTmarketplace: null,
    nftDataById: {
      id: '',
      imgUrl: '',
      title: '',
      detail: '',
      category: '',
      keyword: '',
      type: '',
      price: '',
      userId: '',
      createdAt: '',
    },
    nftOwner: false,
    editing: false,
  }),
  props: ['itemId'],
  
  async mounted() {
    // this.getNFTById({id: this.itemId}).then((res) => {
    //   console.log(res);
    //   this.nftDataById.id = res.data.data._id;
    //   this.nftDataById.imgUrl = res.data.data.datalink;
    //   this.nftDataById.detail = res.data.data.detail;
    //   this.nftDataById.title = res.data.data.title;
    //   this.nftDataById.price = res.data.data.price;
    //   this.nftDataById.userId = res.data.data.byuser[0];
    // })

    this.web3 = initweb3;
    if(typeof this.web3 === 'undefined'){
      console.log('undefin log');
      this.web3 = await getWeb3();
    }
    console.log('first mounted', this.web3);
    const networkId = await this.web3.eth.net.getId();
    this.accounts = await this.web3.eth.getAccounts();
    const jsonArtNFTData = require("../../build/contracts/ArtNFTData.json");
    this.jsonArtNFT = require("../../build/contracts/ArtNFT.json");
    const jsonArtNFTmarket = require("../../build/contracts/ArtNFTmarketplace.json");
    const marketNet = jsonArtNFTmarket.networks[networkId.toString()];
    this.artNFTmarketplace = new this.web3.eth.Contract(
      jsonArtNFTmarket.abi,
      marketNet && marketNet.address,
    );
    console.log("== market contract ==", this.artNFTmarketplace);
    const deployNet = jsonArtNFTData.networks[networkId.toString()];
    this.artNFTData = new this.web3.eth.Contract(
      jsonArtNFTData.abi,
      deployNet && deployNet.address,
    );
    console.log("== instance NFTData ==", this.artNFTData);
    this.getArt = await this.artNFTData.methods.getArtByNFTAddress(this.itemId).call();
    this.getArtDetail = await this.artNFTData.methods.getArtDetailByNFTAddress(this.itemId).call();
    console.log("=== all arts contracts ===", this.getArt);
    console.log("== all arts detail contracts ==", this.getArtDetail);
    this.nftDataById.id = this.getArt.artNFT;
    this.nftDataById.imgUrl = "https://ipfs.io/ipfs/"+this.getArt.ipfsHashofArt;
    this.nftDataById.detail = this.getArtDetail.artNFTdetail;
    const spDetails = this.getArtDetail.artNFTspfield.split('(+)');
    console.log("divition sp details", spDetails);
    const creatTimestamp = parseInt(spDetails[3]);
    const createdDate = new Date(creatTimestamp);
    this.nftDataById.category = spDetails[0];
    this.nftDataById.type = spDetails[1];
    this.nftDataById.keyword = spDetails[2];
    this.nftDataById.createdAt = createdDate.toLocaleString();
    this.nftDataById.title = this.getArt.artNFTname;
    this.nftDataById.price = this.web3.utils.fromWei(this.getArt.artPrice, 'ether');
    this.nftDataById.userId = this.getArt.ownerAddress;
    if(this.nftDataById.userId == this.accounts[0]){
      this.nftOwner = true;
    }
  },
  methods: {
    ...mapActions([
      'getNFTById',
    ]),
    async buyItem(){
      console.log('this gen art');
      let self = this;
      // const artId = 1;
      const artNFT = new this.web3.eth.Contract(this.jsonArtNFT.abi, this.itemId);
      console.log("== bue artNFT ==", artNFT);
      // const owner = await artNFT.methods.ownerOf(photoId).call();

      const art = await this.artNFTData.methods.getArtByNFTAddress(this.itemId).call();
      const buyAmount = await art.artPrice;
      // const txReceipt = await 
      console.log("this is my art", art.artNFT);
      this.artNFTmarketplace.methods.buyPhotoNFT(art.artNFT).send({ from: this.accounts[0], value: buyAmount }).once('receipt', (receipt) => {
        console.log("==response of buyArtNFT===", receipt);  
        self.$router.push('/market');
      });
    },
    editableData() {
      this.editing = true;
    },
    async saveEditedData() {
      // const artNFT = new this.web3.eth.Contract(this.jsonArtNFT.abi, this.itemId);
      const art = await this.artNFTData.methods.getArtByNFTAddress(this.itemId).call();
      console.log("+ update gen nft +", art);
      console.log(this.nftDataById.detail);
      // this.artNFTmarketplace.methods.ArtNFTUpdate(art.artNFT, this.nftDataById.title, this.nftDataById.detail).send({ from: this.accounts[0] }).once('receipt', (receipt) => {
      //   console.log("=== updated dat ===", receipt);
      // });

      this.artNFTData.methods.UpdateArtdata(art.artNFT, this.nftDataById.title, this.nftDataById.detail).send({ from: this.accounts[0] }).once('receipt', (receipt) => {
        console.log("=== updated dat ===", receipt);
      })

      // const updatedRsult = await this.artNFTData.methods.updateStatus(this.itemId, this.nftDataById.title, this.nftDataById.detail).call();
      // console.log("== updated result ==", updatedRsult);


    },
    cancelEdit() {
      this.editing = false;
      this.nftDataById.detail = this.getArt.artNFTDetail;
      this.nftDataById.title = this.getArt.artNFTname;
    }
  }
}
</script>
