<template>
  <div>
    <div class="title">
      <div class="h3"><span></span>心理测评</div>
      <a @click="goMore" class="more">更多<img src="/static/img/more.png" alt=""></a>
    </div>
    <div class="upFooterView">
      <ul v-if="consultationList.length > 0">
        <consultation-item v-for="(item,index) in consultationList" :key="index" :consultationItem="item" @click.native="toDetail(item)"></consultation-item>
      </ul>
    </div>
  </div>

</template>

<script>
import ConsultationItem from "./ConsultationItem.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      // sortBy: this.$route.query.sortBy, //排序
      consultationList: [],
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : sessionStorage.getItem("orgId"), //"1079654019066011648",
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

  computed: {},

  methods: {
    initData(cosGroupKeys) {
      let method = "evalListQuery";
      let request = {
        orgId: this.orgId,
        pageNum: 1,
        pageSize: 4,
        cosGroupKeys: cosGroupKeys
      };
      this.$store
        .dispatch(method, request)
        .then(data => {
          this.consultationList = data;
        })
    },
    goMore() {
      //更多测评
      window.location.href =
        "http://gzh.1010psy.com/consultationList?sortBy=time_create&initOrgId=" +
        this.orgId +
        "&orgNames=" +
        this.navName +
        "&pageUrl=" +
        this.pageUrl;
    },
    toDetail(item) {
      window.location.href =
        "http://gzh.1010psy.com/courseInfo?consultationDetail=" +
        item.pevalId.value +
        "&orgNames=" +
        this.navName +
        "&pageUrl=" +
        this.pageUrl;
    }
  },

  created() {
    this.initData(this.initGroupKey);
  }
};
</script>

<style scoped>
.upFooterView {
  overflow: hidden;
  margin-left: -4%;
  padding: 16px;
}
</style>
