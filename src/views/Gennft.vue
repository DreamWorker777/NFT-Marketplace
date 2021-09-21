<template>
  <div>
    <v-parallax
      dark
      height="250"
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row align="center" justify="center">
        <v-col>
          <h1 class="text-h2 font-weight-bold mt-10">Generate Your NFT</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row >
        <v-col cols="12">
          <v-container class="mt-n16">
            <v-card class="pa-12" elevation="24">
              <v-row>
                <v-col cols="3">
                  <v-img 
                    ref="nftdataImg"
                    max-width="500"
                    aspect-ratio="1"
                    elevation="24"
                    class="border rounded-lg"
                    hide-input='true'
                    @click="uploadImg()"
                    @dragover="dragover"
                    @dragleave="dragleave"
                    @drop="nftImagedrop"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height blue lighten-1 ma-0" justify="center" align="center">
                        <v-col>
                          <span class="text-h5 font-weight-bold">{{nftStateStr}}</span>
                        </v-col>
                      </v-row>
                    </template>
                  </v-img>
                  <input type="file" ref="nftfile" @change="onnftfilechange" style="display: none"/>
                </v-col>
                
                <v-col class="px-12" cols="8">
                  <v-form v-model="nftformvalid" ref="nftform">
                  <v-row class="text-start" justify="start" align="center">
                    <v-col cols="5">
                      <v-text-field
                        solo
                        :rules="[rules.required]"
                        v-model="nftDataform.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="text-start" justify="start" align="center">
                    <v-col cols="12">
                      <v-textarea
                        label="Description"
                        auto-grow
                        filled
                        v-model="nftDataform.detail"
                        solo
                        rows="5"
                        row-height="15"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row class="text-start" justify="start" align="center">
                    <v-col cols="6">
                      <v-select
                        solo
                        :items="typeItems"
                        :rules="[rules.required]"
                        v-model="nftDataform.type"
                        label="Type"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        solo
                        :rules="[rules.required]"
                        v-model="nftDataform.category"
                        label="Category"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="text-start" justify="start" align="center">
                    <v-col cols="6">
                      <v-text-field
                        solo
                        :rules="[rules.required]"
                        v-model="nftDataform.keyword"
                        type="text"
                        label="Keyword"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        solo
                        :rules="[rules.required]"
                        v-model="nftDataform.price"
                        type="number"
                        label="Price"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="text-start" justify="start" align="center">
                    <v-col cols="6">
                      <v-btn
                        :disabled="!nftformvalid"
                        class="mr-4"
                        elevation="24"
                        color="primary"
                        @click="submitNftData"
                      >
                        update
                      </v-btn>
                      <v-btn
                        :disabled="!nftformvalid"
                        elevation="24"
                        color="primary"
                        @click="submitNftData"
                      >
                        cancel
                      </v-btn>
                    </v-col>
                  </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { initweb3, getWeb3 } from '@/web3Server';

const ipfs = require('@/components/ifpsEngine.js');

export default {
  components: {
  },
  data: () => ({
    web3: null,
    account: null,
    balance: null,
    networkId: null,
    artNFTFactory: null,
    artNFTmarket: null,
    artNFTmarketAddress: null,
    NFTgenContract: require('../../build/contracts/ArtNFT.json'),
    nftdata: null,
    nftformvalid: true,
    nftStateStr: 'Please upload your image',
    image: null,
    typeItems: ['Image', 'audio', 'video'],
    nftDataform: {
      title: '',
      detail: '',
      type: '',
      category: '',
      keyword: '',
      price: ''
    },
    rules: {
      required: value => !!value || 'Required.'
    }
  }),
  async mounted() {
    this.web3 = initweb3;
    if(typeof this.web3 === 'undefined'){
      console.log('undefin log');
      this.web3 = await getWeb3();
    }
    this.networkId = await this.web3.eth.net.getId();
    this.account = await this.web3.eth.getAccounts();
    const tmpbalance = await this.web3.eth.getBalance(this.account[0]);
    this.balance = this.web3.utils.fromWei(tmpbalance, 'ether');
    console.log( "wallet ballence", this.balance);
    const jsonNFTFacotry = require('../../build/contracts/ArtNFTFactory.json');
    const jsonNFTmarket = require('../../build/contracts/ArtNFTmarketplace.json');
    const deployNetwork = jsonNFTFacotry.networks[this.networkId.toString()];
    this.artNFTFactory = new this.web3.eth.Contract(
      jsonNFTFacotry.abi,
      deployNetwork && deployNetwork.address,
    );
    console.log("==my Art Factory==", this.artNFTFactory);
    this.artNFTmarket = new this.web3.eth.Contract(
      jsonNFTmarket.abi,
      deployNetwork && deployNetwork.address,
    );
    console.log("==my Art artNFTmarket==", this.artNFTmarket);
    this.artNFTmarketAddress = deployNetwork.address;
    console.log("== my artNFT market address ==", this.artNFTmarketAddress);
  },
  methods: {
    ...mapActions([
      'generateNFT'
    ]),
    dragover(event){
      event.preventDefault();
    },
    dragleave(event){
      event.preventDefault();
    },
    nftImagedrop(event){
      event.preventDefault();
      this.$refs.nftfile.files = event.dataTransfer.files
      this.onnftfilechange()
      console.log(event)
    },
    submitNFTdata(){
      alert("myNFTgen");
    },
    onFileInfo(){
      console.log('sss')
    },
    onnftfilechange(){
      let self = this
      const nftfiles = this.$refs.nftfile.files
      var reader = new FileReader();
      reader.onload = function(e){
        console.log(e.target);
        var uril = e.target.result
        self.nftStateStr = '';
        self.$refs.nftdataImg.src = uril
      }
      reader.readAsDataURL(nftfiles[0])
      var bufferReader = new FileReader();
      bufferReader.readAsArrayBuffer(nftfiles[0])
      bufferReader.onloadend = () => {
        self.nftdata = Buffer(bufferReader.result);
      }
      
    },
    uploadImg(){
      this.$refs.nftfile.click();
    },
    submitNftData() {
      console.log(ipfs);
      let self = this;
      
      if(this.$refs.nftform.validate()){
        console.log()
        let ipfsId;
        console.log(this.nftdata)
        // console.log(Buffer(this.nftData))
        ipfs.default.add(this.nftdata).then((res) => {
          ipfsId = res[0].hash;
          console.log(ipfsId);
          const art_price = self.web3.utils.toWei(self.nftDataform.price, 'ether');
          const artsymbol = "truhelix";
          const nowTime = new Date().valueOf();
          const spfield = self.nftDataform.category + "(+)" + self.nftDataform.type + "(+)" + self.nftDataform.keyword + "(+)" + nowTime.toString();
          self.artNFTFactory.methods.createNewArtNFT(self.nftDataform.title, self.nftDataform.detail, spfield, artsymbol, art_price, ipfsId)
            .send({ from: self.account[0] })
            .once('receipt', (receipt) => {
              console.log('===receipt===', receipt);
              const Art_NFT = receipt.events.ArtNFTCreated.returnValues.artNFT;
              console.log("l=== receipt ARTNFT ===l", Art_NFT);
              const jsonArtNFT = require("../../build/contracts/ArtNFT.json");
              console.log(jsonArtNFT);
              let artNFT = new self.web3.eth.Contract(jsonArtNFT.abi, Art_NFT);
              console.log("== artNFT contract ==", artNFT);
              const artId = 1;
              artNFT.methods.ownerOf(artId).call().then(owner => console.log('ooooo= owner of artId 1 =oooo', owner));
              artNFT.methods.approve(self.artNFTmarketAddress, artId).send({from: self.account[0]}).once('receipt', (receipt) => {
                console.log("== nft approve ==", receipt);
                self.$router.push('/market')
                // self.artNFTmarket.methods.openTradeWhenCreateNewPhotoNFT(Art_NFT, artId, art_price)
                // .send({ from: self.account[0] })
                //   .once('receipt', (receipt) => {
                //     console.log("== opentradeWhencaret ==", receipt);
                //     self.$router.push('/market')
                //     // location.href="./market";
                //   })
              })

            })
          // const addNFTdata = {
          //   dataUrl: "https://ipfs.io/ipfs/" + ipfsId,
          //   title: self.nftDataform.title,
          //   detail: self.nftDataform.detail,
          //   price: self.nftDataform.price,
          // }
          // self.generateNFT(addNFTdata).then((res) => {
          //   console.log(res);
          //   self.$router.push('/market')
          // })
        })
      }
    }
  }
}
</script>
<style scoped>
.border{
  border: 1px solid #000;
}
</style>
