<template>
    <div class="no-bottom no-top" id="content">
        <div id="top"></div>
        
        <!-- section begin -->
        <section id="subheader" class="text-light" data-bgimage="url(images/background/subheader.jpg) top">
                <div class="center-y relative text-center">
                    <div class="container">
                        <div class="row">
                            
                            <div class="col-md-12 text-center">
                                <h1>MarketPlace</h1>
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
                    <div class="col-lg-12">

                        <div class="items_filter">
                            <form class="row form-dark" id="form_quick_search">
                                <div class="col text-center">
                                    <input class="form-control" v-model="searchString" placeholder="search item here..." type="text" /> <a href="#" id="btn-submit"><i class="fa fa-search bg-color-secondary"></i></a>
                                    <div class="clearfix"></div>
                                </div>
                            </form>

                            <div id="item_category" class="dropdown">
                                <a href="#" class="btn-selector">All categories</a>
                                <ul>
                                    <li class="active" @click.prevent="selectCategory('')"><span>All categories</span></li>
                                    <li v-for="(item, index) in categories" :key="index" @click.prevent="selectCategory(item)">
                                        <span>{{ item }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>                     
                    <!-- nft item begin -->
                    <div 
                        class="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                        v-for="(item, index) in filteredData"
                        :key="index"
                    >
                        <div class="nft__item">
                            <div class="author_list_pp">
                                <a href="author.html">                                    
                                    <img class="lazy" :src="require('@/assets/img/avatar.png')" alt="">
                                    <i class="fa fa-check"></i>
                                </a>
                            </div>
                            <div class="nft__item_wrap">
                                <a @click="nftItemView(item.id)">
                                    <img :src="item.dataUrl" class="lazy nft__item_preview" alt="">
                                </a>
                            </div>
                            <div class="nft__item_info">
                                <a @click="nftItemView(item.id)">
                                    <h4>{{ item.title }}</h4>
                                </a>
                                <div class="nft__item_price">
                                    {{ item.price }} BNB
                                </div>
                                <div class="nft__item_action">
                                    <a @click="nftItemView(item.id)">View Details</a>
                                </div>
                                <div class="nft__item_like">
                                    <i class="fa fa-heart"></i><span>0</span>
                                </div>                            
                            </div> 
                        </div>
                    </div>

                    <div class="col-md-12 text-center">
                        <a href="#" id="loadmore" class="btn-main wow fadeInUp lead">Load more</a>
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
        datas: [],
        filteredData: [],
        categories: [],
        category: '',
        searchString: '',
    }),
    computed: {
    },
    async mounted() {
        this.setLoading(true).catch(err => console.log('error', err));

        // TODO: Get web3 & network id
        this.web3 = initweb3;
        if(typeof this.web3 === 'undefined'){
            console.log('web3 undefined log');
            this.web3 = await getWeb3();
        }
        console.log('first mounted', this.web3);

        const networkId = await this.web3.eth.net.getId().catch(err => console.error(err));
        console.log('web3 network', networkId);

        // TODO: Get ArtNFTData smart contract instance
        const jsonArtNFTData = require("../../build/contracts/ArtNFTData.json");
        const deployNet = jsonArtNFTData.networks[networkId.toString()];
        const artNFTData = new this.web3.eth.Contract(
            jsonArtNFTData.abi,
            deployNet && deployNet.address,
        );
        console.log("== instance NFTData ==", artNFTData);

        // TODO: Get All NFTDatas
        const allArts = await artNFTData.methods.getAllArts().call();
        const allArtDetails = await artNFTData.methods.getAllArtDetails().call();
        console.log("=== all arts contracts ===", allArts);
        console.log("=== all arts contracts ===", allArtDetails);

        allArts.map((item, index) => {
            const category = allArtDetails[index].artNFTspfield.split('(+)')[0];

            const isExist = this.categories.findIndex(item => item === category);
            if( isExist === -1 )
                this.categories.push(category);

            this.datas.push({
                id: item.artNFT,
                dataUrl: "https://ipfs.io/ipfs/"+item.ipfsHashofArt,
                title: item.artNFTname,
                detail: item.artNFTSymbol,
                price: this.web3.utils.fromWei(item.artPrice, 'ether'),
                category: category
            })
        })
        console.log('=== all Arts ===', this.datas);
        this.filteredData = this.datas;

        this.setLoading(false).catch(err => console.error(err));
        this.reloadScript();
    },
    methods: {
        ...mapActions([
            'getNFTs',
            'setLoading'
        ]),

        nftItemView( id ) {
            this.$router.push(`/market/${id}`)
        },
        
        selectCategory( value ) {
            this.category = value;
        },

        reloadScript() {
            this.$unloadScript('https://gigaland.io/js/designesia.js')
            .then(() => {
                this.$loadScript('https://gigaland.io/js/designesia.js')
            });
        },

        filter() {
            this.filteredData = this.datas.filter((item) => {
                return (item.category === this.category || this.category == '') &&
                        (item.title.includes(this.searchString) || item.detail.includes(this.searchString) || item.category.includes(this.searchString) || this.searchString == '');
            });

            this.reloadScript();
        }
    },
    watch: {
        category: function() {
            this.filter();
        },
        searchString: function() {
            this.filter();
        },
    }
}
</script>

<style lang="scss">
.nft__item {
    cursor: pointer;
    &_action {
        color: rgb(86, 146, 206);
    }
}
</style>