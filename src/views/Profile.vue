<template>
    <div class="no-bottom no-top" id="content">
        <div id="top"></div>

        <section id="subheader" class="text-light" data-bgimage="url(/images/background/8.jpg) top">
            <div class="center-y relative text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h1>Profile</h1>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>

        <section aria-label="section" class="sm-mt-0">
            <div class="container">

                <div class="spacer30"></div>
                
                <div class="row">
                    <div class="col-3">
                        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button 
                                class="nav-link active" 
                                id="v-pills-account-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#v-pills-account" 
                                type="button" 
                                role="tab" 
                                aria-controls="v-pills-account" 
                                aria-selected="true">
                                Account
                            </button>
                            <button 
                                class="nav-link" 
                                id="v-pills-Wallet-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#v-pills-Wallet" 
                                type="button" 
                                role="tab" 
                                aria-controls="v-pills-Wallet" 
                                aria-selected="false">
                                Wallet
                            </button>
                            <button 
                                class="nav-link" 
                                id="v-pills-Collections-tab" 
                                data-bs-toggle="pill" 
                                data-bs-target="#v-pills-Collections" 
                                type="button" 
                                role="tab" 
                                aria-controls="v-pills-Collections" 
                                aria-selected="false">
                                Collections
                            </button>
                        </div>
                    </div>

                    <div class="col-9">
                        <div class="tab-content" id="v-pills-tabContent">
                            <!-- Account Panel -->
                            <div 
                                class="tab-pane fade show active" 
                                id="v-pills-account" 
                                role="tabpanel" 
                                aria-labelledby="v-pills-account-tab"
                            >
                                <Account />
                            </div>

                            <!-- Wallet Panel -->
                            <div 
                                class="tab-pane fade" 
                                id="v-pills-Wallet" 
                                role="tabpanel" 
                                aria-labelledby="v-pills-Wallet-tab"
                            >
                                <form class="form-border">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="field-set">
                                                <label>Wallet ID:</label>
                                                <input 
                                                    type='text'
                                                    :class="{'form-control': true}"
                                                    v-model="wallet.walletId"
                                                    readonly
                                                >
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="field-set">
                                                <label>Ballence:</label>
                                                <input 
                                                    type='text'
                                                    :class="{'form-control': true}"
                                                    v-model="wallet.ballance"
                                                    readonly
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <!-- Collections Panel -->
                            <div 
                                class="tab-pane fade" 
                                id="v-pills-Collections" 
                                role="tabpanel" 
                                aria-labelledby="v-pills-Collections-tab"
                            >
                                <profile-collections :datas="collections" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { initweb3, getWeb3 } from '@/web3Server';
import Account from '@/components/Profile/Account.vue'
import ProfileCollections from '@/components/Profile/ProfileCollections.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        Account,
        ProfileCollections,
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
        this.setLoading(true);

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

        this.setLoading(false);
        this.reloadScript();
    },
    methods: {
        ...mapActions([
            'updateProfileImage',
            'setLoading'
        ]),
        uploadImg(){
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
        },
        reloadScript() {
            this.$unloadScript('https://gigaland.io/js/designesia.js')
            .then(() => {
                this.$loadScript('https://gigaland.io/js/designesia.js')
            });
        }
    }
}
</script>