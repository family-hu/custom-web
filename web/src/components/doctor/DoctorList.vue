<template>
    <div>
      <div class="mian_box" v-if="doctorList.length > 0">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <doctor-item v-for="(doctorDetail,index) in doctorList" :key="index" :doctorDetail="doctorDetail" @click.native="toDetail(doctorDetail)"></doctor-item>
        </ul>
      </div>
      <div class="empty" v-if="empty">
        <img :src="consultationEmpty" width="144px" height="136px">
        <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无相关结果</div>
      </div>
    </div>
</template>

<script>
import DoctorItem from "../doctor/DoctorItem.vue";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {  //医生列表预览
  data() {
    return {
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : sessionStorage.getItem("orgId"),
      classifyId: this.$route.query.classifyId,
      doctorList: [],
      empty: false,
      loading: false,
      page: 1,
      loaded: false ,//是否加载完成
      navName: sessionStorage.getItem("navName"), //导航首页名字
      pageUrl: sessionStorage.getItem("pageUrl") //首页地址-返回微页面
    };
  },

  components: {
    doctorItem: DoctorItem
  },

  computed: {
    consultationEmpty() {
      return imgMap.consultationEmpty;
    },
  },

  mounted() {},

  methods: {
    //分页
    loadMore() {
      if (!this.loaded) {
        this.page++;
        this.requestDoctorList();
      }
    },
    //医生列表
    requestDoctorList() {
      this.$indicator.open();
      this.loading = true;
      let request = {
        orgId: this.orgId,
        classifyId: this.classifyId,
        pageNum: this.page,
        pageSize: 10
      };
      let vm = this;
      this.$store
        .dispatch("doctorList", request)
        .then(data => {
          if (data.doctorList.length > 0) {
            for (let i = 0; i < data.doctorList.length; i++) {
              vm.doctorList.push(data.doctorList[i]);
            }
            vm.loaded = vm.doctorList.length >= data.total;
            this.loading = false;
          }else{
            vm.loaded = true;
            vm.empty = true
          }
        })
        .catch(error => {
          vm.loaded = true;
          vm.empty = true;
          this.loading = false;
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    //医生详情
    toDetail(item) {
      window.location.href =
        "http://yun.sinoylb.com/doctorDetail?userId=" +
        item.userId.value +
        "&orgNames=" +
        this.navName +
        "&pageUrl=" +
        this.pageUrl;
    }
  },

  created() {
    this.requestDoctorList();
    this.navName = sessionStorage.getItem("navName");
    this.pageUrl = sessionStorage.getItem("pageUrl");
  }
};
</script>

<style scoped>
.empty {
  padding: 50px 40px;
  text-align: center;
}
.mian_box {
  overflow: hidden;
  margin-left: -4%;
  padding: 0 16px 16px;
  background: #fff;
}
</style>
