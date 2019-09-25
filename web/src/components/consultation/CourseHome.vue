<template>
  <div>
    <div class="title">
      <div class="h3"><span></span>健康课程</div>
      <a @click="goMore" class="more">更多<img src="/static/img/more.png" alt=""></a>
    </div>
    <div class="upFooterView">
      <ul v-if="dataList.length > 0">
        <consultation-item v-for="(item,index) in dataList" :key="index" :consultationItem="item" :ifcos="1" @click.native="toDetail(item)"></consultation-item>
      </ul>
    </div>

  </div>
</template>

<script>
import ConsultationItem from "../consultation/ConsultationItem.vue";
import { mapGetters, mapMutations } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : sessionStorage.getItem("orgId"), //"1079654019066011648",
      dataList: [],
      navName: sessionStorage.getItem("navName"), //导航首页名字
      pageUrl: sessionStorage.getItem("pageUrl") //首页地址-返回微页面
    };
  },
  props: {
    initGroupKey: null
  },

  components: {
    consultationItem: ConsultationItem
  },

  methods: {
    goMore() {
      //健康课程
      window.location.href =
        "http://gzh.1010psy.com/courseHome?initOrgId=" +
        this.orgId +
        "&orgNames=" +
        this.navName +
        "&pageUrl=" +
        this.pageUrl;
    },
    initData(cosGroupKey) {
      const request = {
        orgId: this.orgId,
        // cosGroupKey: cosGroupKey,
        pageNum: 1,
        pageSize: 4
      };
      this.$store
        .dispatch("jvCosInfoColumnQuery", request)
        .then(data => {
          this.dataList = data;
        })
    },
    toDetail(item) {
      if (item.ifcolumn.value == 0) {
        window.location.href =
          "http://gzh.1010psy.com/courseInfo?cosId=" +
          item.id.value +
          "&orgNames=" +
          this.navName +
          "&pageUrl=" +
          this.pageUrl;
      } else {
        window.location.href =
          "http://gzh.1010psy.com/columnIntroduce?cosId=" +
          item.id.value +
          "&orgNames=" +
          this.navName +
          "&pageUrl=" +
          this.pageUrl;
      }
    }
  },

  created() {
    this.initData(this.initGroupKey);
  }
};
</script>

<style>
.upFooterView {
  overflow: hidden;
  margin-left: -4%;
  padding: 16px;
}
</style>
