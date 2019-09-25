<template>
  <div>
    <div style="height: 164px;width:100%">
        <mt-swipe :auto="5000" v-if='bannerList.length < 3'>
          <mt-swipe-item  v-for="(item,index) in bannerList" :key="index">
              <img :src="item.photoUrl" @click="targetUrl(item)" height="164px" width="100%" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <el-carousel v-else :interval="4000" type="card" height="164px" indicator-position="outside" autoplay>
          <el-carousel-item  v-for="(item,index) in bannerList" :key="index"  height="164px">
            <img :src="item.photoUrl" @click="targetUrl(item)" alt="" width="100%" height="164px">
          </el-carousel-item>
        </el-carousel>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  props: {
    bannerList: null
  },

  components: {},

  computed: {
    ...mapGetters(["loginData"])
  },

  methods: {
    targetUrl(item) {
      if(item.linkUrl){
        window.location.href = item.linkUrl;
      }
    }
  },

  created() {}
};
</script>
<style scoped>
/* element-ui card */
/deep/ .el-carousel__item--card {
  /* border:1px solid red; */
  background: #fff;
}
/deep/ .el-carousel__item--card.is-active {
  z-index: 2;
  left: -20%;
  width: 91%;
}
/deep/.is-active > .carousel_text {
  display: block;
}
/deep/ .el-carousel__button {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
/* element-ui card ---- end*/
</style>
