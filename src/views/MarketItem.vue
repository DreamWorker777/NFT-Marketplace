<template>
    <div class="no-bottom no-top" id="content">
        <div id="top"></div>

        <section id="subheader" class="text-light" data-bgimage="url(/images/background/5.jpg) top">
                <div class="center-y relative text-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h1>{{ nftDataById.title }}</h1>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
        </section>

        <section aria-label="section" class="sm-mt-0">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 text-center">
                        <img :src="nftDataById.imgUrl" class="img-fluid img-rounded mb-sm-30" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="item_info">
                            Auctions ends in <div class="de_countdown" data-year="2021" data-month="10" data-day="16" data-hour="8"></div>

                            <h2 v-show="!editing">{{ nftDataById.title }}</h2>

                            <input 
                                v-show="editing"
                                type="text"
                                :class="{'form-control': true, 'edit_input': true, 'error_input': !validateForm.title}"
                                placeholder="e.g. 'Crypto Funk'"
                                v-model="nftDataById.title"
                            />
                            

                            <div class="item_info_counts">
                                <div class="item_info_type"><i class="fa fa-image"></i>{{ nftDataById.type }}</div>
                                <div class="item_info_views"><i class="fa fa-eye"></i>250</div>
                                <div class="item_info_like"><i class="fa fa-heart"></i>18</div>
                            </div>

                            <p v-show="!editing" >{{ nftDataById.detail }}</p>

                            <textarea 
                                v-show="editing"
                                data-autoresize 
                                :class="{'form-control': true, 'edit_input': true, 'error_input': !validateForm.detail}"
                                placeholder="e.g. 'This is very limited item'"
                                v-model="nftDataById.detail"
                            >
                            </textarea>

                            <div class="itemSector">
                                <p class="itemSector__title">Category : </p>
                                <p>{{ nftDataById.category }}</p>
                            </div>
                            
                            <div class="itemSector">
                                <p class="itemSector__title">Keyword : </p>
                                <p>{{ nftDataById.keyword }}</p>
                            </div>

                            <div class="itemSector">
                                <p class="itemSector__title">Created_At : </p>
                                <p>{{ nftDataById.createdAt }}</p>
                            </div>

                            <div class="itemSector">
                                <p class="itemSector__title">Price : </p>
                                <p>{{ nftDataById.price }} BNB</p>
                            </div>

                            <h6>Owner</h6>
                            <div class="item_author">
                                <div class="author_list_pp">
                                    <a href="author.html">
                                        <img class="lazy" src="/images/author/author-11.jpg" alt="">
                                        <i class="fa fa-check"></i>
                                    </a>
                                </div>
                                <div class="author_list_info">
                                    <a v-if="!nftOwner" >{{ nftDataById.userId }}</a>
                                    <a v-else >You</a>
                                </div>
                            </div>

                            <div class="spacer-40"></div>
                            
                            <button 
                                v-if="!nftOwner" 
                                class="btn-main" 
                                @click="buyItem()"
                            > 
                                <i class="fa fa-fw"></i> 
                                Buy Now 
                            </button>

                            <button 
                                v-if="nftOwner && !editing" 
                                class="btn-main" 
                                @click="editableData()"
                            > 
                                <i class="fa fa-edit"></i> 
                                Edit 
                            </button>
                            
                            <button
                                v-if="editing"
                                class="btn-main"
                                @click="saveEditedData"
                            >
                                Save
                            </button>

                           <button
                                v-if="editing"
                                class="btn-main btn-cancel"
                                @click="cancelEdit"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { initweb3, getWeb3 } from '@/web3Server';
import { mapActions } from 'vuex'

export default {
    components: {
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
        validateForm: {
            title: true,
            detail: true
        }
    }),
  props: ['itemId'],
  
  async mounted() {
    // TODO: Get Web3
    this.web3 = initweb3;
    if(typeof this.web3 === 'undefined'){
      console.log('undefin log');
      this.web3 = await getWeb3();
    }
    console.log('first mounted', this.web3);

    // TODO: Get networkID and account info
    const networkId = await this.web3.eth.net.getId();
    this.accounts = await this.web3.eth.getAccounts();

    // TODO: Get smart contracts instance
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
        'setLoading'
    ]),
    async buyItem(){
        this.setLoading(true);

        console.log('this gen art');
        let self = this;

        const artNFT = new this.web3.eth.Contract(this.jsonArtNFT.abi, this.itemId);
        console.log("== buy artNFT ==", artNFT);

        const art = await this.artNFTData.methods.getArtByNFTAddress(this.itemId).call();
        const buyAmount = await art.artPrice;

        console.log("this is my art", art.artNFT);
        this.artNFTmarketplace.methods.buyPhotoNFT(art.artNFT).send({ from: this.accounts[0], value: buyAmount }).once('receipt', (receipt) => {
            console.log("==response of buyArtNFT===", receipt);

            this.setLoading(false);
            this.$notify({
                group: 'foo',
                type: 'success',
                title: 'Success',
                text: `You've successfully purchased the NFT.`
            });

            self.$router.push('/market');
        });
    },
    editableData() {
        this.editing = true;
    },
    async saveEditedData() {
        this.setLoading(true);
        const art = await this.artNFTData.methods.getArtByNFTAddress(this.itemId).call();
        console.log("+ update gen nft +", art);

        this.artNFTData.methods.UpdateArtdata(art.artNFT, this.nftDataById.title, this.nftDataById.detail).send({ from: this.accounts[0] }).once('receipt', (receipt) => {
            console.log("=== updated dat ===", receipt);

            this.setLoading(false);
            this.$notify({
                group: 'foo',
                type: 'info',
                text: `You've successfully updated the NFT Info.`
            });

            this.editing = false;
        })

    },
    cancelEdit() {
        this.editing = false;
        this.nftDataById.detail = this.getArtDetail.artNFTdetail;
        this.nftDataById.title = this.getArt.artNFTname;
    }
  }
}
</script>

<style lang="scss" scoped>
.itemSector {
    display: flex;

    &__title {
        font-weight: 800;
        margin-right: 10px;
        color: rgb(78, 78, 78);
    }
}
.edit_input {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.btn-cancel {
    margin-left: 10px;
    background: #b7b7b7;
}
</style>