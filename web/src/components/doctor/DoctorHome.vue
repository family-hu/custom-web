<template>
    <div>
      <div class="title">
        <div class="h3"><span></span>精选专家</div>
        <a @click="goMore" class="more">更多<img src="/static/img/more.png" alt=""></a>
      </div>
      <div class="mian_box" v-if="doctorList.length > 0">
        <doctor-item v-for="(doctorDetail,index) in doctorList" :key="index" :doctorDetail="doctorDetail" @click.native="toDetail(doctorDetail)"></doctor-item>
      </div>
    </div>
</template>

<script>
import DoctorItem from "../doctor/DoctorItem.vue";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : sessionStorage.getItem("orgId"),
      doctorList: [],
      navName: sessionStorage.getItem("navName"), //导航首页名字
      pageUrl: sessionStorage.getItem("pageUrl") //首页地址-返回微页面
    };
  },
  props: {
    sourceIds: null
  },

  components: {
    doctorItem: DoctorItem
  },

  computed: {},

  mounted() {},

  methods: {
    //医生列表
    requestDoctorList() {
      let request = {
        orgId: this.orgId,
        classifyId: this.sourceIds,
        pageNum: this.page,
        pageSize: 3
      };
      let vm = this;
      this.$store
        .dispatch("doctorList", request)
        .then(data => {
          if (data.doctorList) {
            for (let i = 0; i < data.doctorList.length; i++) {
              vm.doctorList.push(data.doctorList[i]);
            }
          }
        })

    },
    //更多
    goMore() {
      window.location.href =
        "http://yun.sinoylb.com/doctorOneList?orgId=" +
        this.orgId
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
.mian_box {
  overflow: hidden;
  margin-left: -4%;
  padding: 0 16px 16px;
  background: #fff;
}
</style>
