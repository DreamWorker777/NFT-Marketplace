<template>
  <div>
    <!-- <v-row>
      <v-col v-for="(item, index) in datas"
      :key="index" cols="4">
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
    </v-row> -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
// import Binancelogo from '@/components/Binancelogo.vue'
export default {
  components: {
    // Binancelogo
  },
  data: () => ({
    datas: [],
  }),
  mounted() {
    this.getNFTCollections().then((res) => {
      console.log(res)
      res.data.data.map((item) => {
        this.datas.push({
          id: item._id,
          dataUrl: item.datalink,
          title: item.title,
          price: item.price,
        })
      })
    })
  },
  methods: {
    ...mapActions([
      'getNFTCollections',
    ]),
    nftItemView(id) {
      // alert(id);
      this.$router.push(`/market/${id}`)
    },
  }
}
</script>