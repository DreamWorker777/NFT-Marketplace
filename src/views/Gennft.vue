<template>
    <div class="no-bottom no-top" id="content">
        <div id="top"></div>
        
        <!-- section begin -->
        <section id="subheader" class="text-light" data-bgimage="url(images/background/subheader.jpg) top">
                <div class="center-y relative text-center">
                    <div class="container">
                        <div class="row">
                            
                            <div class="col-md-12 text-center">
                                <h1>Create</h1>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
        </section>
        <!-- section close -->
        
        <!-- section begin -->
        <section aria-label="section">
            <div class="container">
                <div class="row wow fadeIn">
                    <div class="col-lg-7 offset-lg-1">
                        <form id="form-create-item" class="form-border">
                            <div class="field-set">
                                <h5>Upload file</h5>

                                <div class="d-create-file">
                                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                                    <input type="button" id="get_file" class="btn-main" value="Browse">
                                    <input 
                                        type="file" 
                                        id="upload_file"
                                        ref="nftfile" 
                                        @change="onnftfilechange"
                                    >
                                </div>

                                <div class="spacer-single"></div>

                                <h5>Title</h5>
                                <input 
                                    type="text"
                                    :class="{'form-control': true, 'error_input': !validateForm.title}"
                                    placeholder="e.g. 'Crypto Funk'"
                                    v-model="nftDataform.title"
                                />

                                <div class="spacer-10"></div>

                                <h5>Description</h5>
                                <textarea 
                                    data-autoresize 
                                    :class="{'form-control': true, 'error_input': !validateForm.detail}"
                                    placeholder="e.g. 'This is very limited item'"
                                    v-model="nftDataform.detail"
                                >
                                </textarea>

                                <div class="spacer-10"></div>

                                <h5>Type</h5>
                                <div id="buy_category" class="dropdown">
                                    <a class="btn-selector">{{ nftDataform.type }}</a>
                                    <ul>
                                        <li 
                                            v-for="(item, index) in typeItems"
                                            :key="index"
                                            :class="{active: index === 0}"
                                            @click.prevent="setTypeAction"
                                        >
                                            <span>{{ item }}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="spacer-10"></div>

                                <h5>Category</h5>
                                <input 
                                    type="text" 
                                    :class="{'form-control': true, 'error_input': !validateForm.category}"
                                    placeholder="e.g. 'Art'" 
                                    v-model="nftDataform.category"
                                />

                                <div class="spacer-10"></div>

                                <h5>Keyword</h5>
                                <input 
                                    type="text" 
                                    :class="{'form-control': true, 'error_input': !validateForm.keyword}"
                                    v-model="nftDataform.keyword"
                                    placeholder="e.g. 'Crypto'" 
                                />  

                                <div class="spacer-10"></div>

                                <h5>Price</h5>
                                <input 
                                    type="number" 
                                    :class="{'form-control': true, 'error_input': !validateForm.price}"
                                    v-model="nftDataform.price"
                                    placeholder="enter price for one item (BNB)" />

                                <div class="spacer-single"></div>

                                <button class="btn-main" @click.prevent="submitNftData">Create Item </button>
                                <div class="spacer-single"></div>
                            </div>
                        </form>
                    </div>

                    <div class="col-lg-3 col-sm-6 col-xs-12">
                        <h5>Preview item</h5>
                        <div class="nft__item">
                            <div class="author_list_pp">
                                <a>
                                    <img class="lazy" :src="profileImg" alt="">
                                    <i class="fa fa-check"></i>
                                </a>
                            </div>
                            <div class="nft__item_wrap">
                                <a>
                                    <img
                                        ref="nftdataImg"
                                        src="images/collections/coll-item-3.jpg" 
                                        id="get_file_2"
                                        class="lazy nft__item_preview" 
                                        alt="">
                                </a>
                            </div>
                            <div class="nft__item_info">
                                <a>
                                    <h4>{{ this.nftDataform.title ? this.nftDataform.title : 'Not set' }}</h4>
                                </a>
                                <div class="nft__item_price">
                                    {{ this.nftDataform.price ? this.nftDataform.price : 0 }} BNB
                                </div>
                                <div class="nft__item_like">
                                    <i class="fa fa-heart"></i><span>0</span>
                                </div>                            
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </section>

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
    typeItems: ['Image', 'Audio', 'Video'],
    nftDataform: {
        title: '',
        detail: '',
        type: 'Image',
        category: '',
        keyword: '',
        price: ''
    },
    validateForm: {
        title: true,
        detail: true,
        type: true,
        category: true,
        keyword: true,
        price: true,
        nftdata: true
    },
    profileImg: require('@/assets/logo.png')
  }),
  async mounted() {
    // TODO: Get web3 instance
    this.web3 = initweb3;
    if( typeof this.web3 === 'undefined' ){
        this.web3 = await getWeb3();
    }

    // TODO: Get networkId, account, balance
    this.networkId = await this.web3.eth.net.getId();
    this.account = await this.web3.eth.getAccounts();
    const tmpbalance = await this.web3.eth.getBalance(this.account[0]);
    this.balance = this.web3.utils.fromWei(tmpbalance, 'ether');

    // TODO: Get ArtNFTFactory Smartcontract instance
    const jsonNFTFacotry = require('../../build/contracts/ArtNFTFactory.json');
    const jsonNFTmarket = require('../../build/contracts/ArtNFTmarketplace.json');
    const deployNetwork = jsonNFTFacotry.networks[ this.networkId.toString() ];
    this.artNFTFactory = new this.web3.eth.Contract(
        jsonNFTFacotry.abi,
        deployNetwork && deployNetwork.address,
    );
    console.log("==my Art Factory==", this.artNFTFactory);

    // TODO: Get ArtNFTMarket Smartcontract instance
    this.artNFTmarket = new this.web3.eth.Contract(
        jsonNFTmarket.abi,
        deployNetwork && deployNetwork.address,
    );
    console.log("==my Art artNFTmarket==", this.artNFTmarket);

    // TODO: Get ArtNFT market address
    this.artNFTmarketAddress = deployNetwork.address;
    console.log("== my artNFT market address ==", this.artNFTmarketAddress);
  },
  methods: {
    ...mapActions([
        'generateNFT'
    ]),
    onnftfilechange() {
        const self = this;
        const nftfiles = this.$refs.nftfile.files;
        const reader = new FileReader();
        reader.onload = function( e ) {
            const uril = e.target.result;
            self.nftStateStr = '';
            self.$refs.nftdataImg.src = uril;
        }
        reader.readAsDataURL(nftfiles[0]);

        const bufferReader = new FileReader();
        bufferReader.readAsArrayBuffer(nftfiles[0]);
        bufferReader.onloadend = () => {
            self.nftdata = Buffer(bufferReader.result);
        }
    },
    setTypeAction(val) {
        this.nftDataform.type = val;
    },
    submitNftData() {
        console.log("IPFS: ", ipfs);
        const self = this;
        
        if( this.validate() ) {
            let ipfsId;
            console.log('Create NFT Data: ', this.nftdata)
            
            ipfs.default.add(this.nftdata).then((res) => {
                ipfsId = res[0].hash;
                console.log("IPFS ID(hash): ", ipfsId);
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
                        console.log("jsonArtNFT: ", jsonArtNFT);
                        let artNFT = new self.web3.eth.Contract(jsonArtNFT.abi, Art_NFT);
                        console.log("== artNFT contract ==", artNFT);
                        const artId = 1;
                        artNFT.methods.ownerOf(artId).call().then(owner => console.log('ooooo= owner of artId 1 =oooo', owner));
                        artNFT.methods.approve(self.artNFTmarketAddress, artId).send({from: self.account[0]}).once('receipt', (receipt) => {
                            console.log("== nft approve ==", receipt);

                            this.$notify({
                                group: 'foo',
                                type: 'success',
                                title: 'Success',
                                text: `You've successfully created your own NFT.`
                            });

                            self.$router.push('/market')
                        })
                    })
            }).catch( err => {
                console.warn('create NFT ipfs error: ', err);
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Create failed',
                    text: 'Something went wrong!'
                });
            });
        }
    },
    validate() {
        this.validateForm = {
            title: true,
            detail: true,
            type: true,
            category: true,
            keyword: true,
            price: true,
            nftdata: true
        };

        if( !this.nftdata ) {
            this.$toasted.error('Please upload your NFT.');
            this.validateForm.nftdata = false;
            return false;
        }

        if( !this.nftDataform.title ) {
            this.$toasted.error('Please enter the title of your NFT.');
            this.validateForm.title = false;
            return false;
        }

        if( !this.nftDataform.detail ) {
            this.$toasted.error('Please enter a description of your NFT.');
            this.validateForm.detail = false;
            return false;
        }

        if( !this.nftDataform.type ) {
            this.$toasted.error('Please select the type of your NFT.');
            this.validateForm.type = false;
            return false;
        }

        if( !this.nftDataform.category ) {
            this.$toasted.error('Please enter the category of your NFT.');
            this.validateForm.category = false;
            return false;
        }

        if( !this.nftDataform.keyword ) {
            this.$toasted.error('Please enter the keyword of your NFT.');
            this.validateForm.keyword = false;
            return false;
        }

        if( !this.nftDataform.price ) {
            this.$toasted.error('Please enter the price of your NFT.');
            this.validateForm.price = false;
            return false;
        }

        return true;
    }
  }
}
</script>
<style lang="scss" scoped>
.border {
    border: 1px solid #000;
}

.dropdown {
    margin-bottom: 20px;
}

</style>
