<template>
    <div class="container">
        <div class="row wow fadeIn">
            <!-- nft item begin -->
            <div 
                class="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                v-for="(item, index) in datas"
                :key="index"
            >
                <div class="nft__item">
                    <div class="author_list_pp">
                        <a href="author.html">                                    
                            <img class="lazy" src="images/author/author-11.jpg" alt="">
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
</template>

<script>

export default {
    name: 'ProfileCollections',
    props: {
        datas: {
            type: Array
        }
    },
    components: {

    },
    data: () => ({

    }),
    mounted() {

    },
    methods: {
        nftItemView( id ) {
            this.$router.push(`/market/${id}`)
        },
    }
}
</script>