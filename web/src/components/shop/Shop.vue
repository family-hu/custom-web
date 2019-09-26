<template>
    <div>
      <div class="title">
        <div class="h3"><span></span>医疗服务</div>
        <a @click="goMore" class="more">更多<img src="/static/img/more.png" alt=""></a>
      </div>
      <!-- 体检套餐list -->
      <div class="mian_box" v-if="serviceList.length > 0">
        <health-service-item v-for="(items , index) in serviceList" :key="index" :orgId="orgId" :navName="navName" :pageUrl="pageUrl" :healthServiceItem="items"></health-service-item>
      </div>
    </div>
</template>

<script>
import HealthServiceItem from "../shop/HealthServiceItem.vue";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId ? this.$route.query.orgId : sessionStorage.getItem('orgId'),
      serviceList:[],
      navName: null, //导航首页名字
      pageUrl: null //首页地址-返回微页面
    };
  },
  props: {
    sourceIds: null
  },

  components: {
    healthServiceItem: HealthServiceItem,
  },


  computed: {

  },

  mounted() {
  },

  methods: {
    //健康服务
    getPackagesList() {
      let vm = this;
      const request = {
        pageParam:{
          pageSize: 10,
          pageNum: this.page,
        },
        packProdGroupId: this.sourceIds
      };
      this.$store
        .dispatch("groupPackagesList", request)
        .then(data => {
          if (data.data) {
            this.serviceList = data.data.list;
          }
        })
    },

    goMore() { //更多商城
      this.$router.push({
          path: "shopList",
          query: {
            packProdGroupId: null
          }
        });
    },


  },

  created() {
    this.getPackagesList();
    this.navName = sessionStorage.getItem("navName");
    this.pageUrl = sessionStorage.getItem("pageUrl");
  },


};
</script>

<style scoped>
.mian_box{
    overflow: hidden;
    margin-left: -4%;
    padding: 0 16px 16px;
    background: #fff;
  }
</style>
