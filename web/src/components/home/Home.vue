<template>
  <div v-if="arr.length > 0">
    <div v-for="(item , index) in arr" :key="index">
      <div class="main"  v-if="item.comCode == 'SEARCH'" >搜索{{item.comCode}}</div>
      <div class="main_banner"  v-if="item.comCode == 'POSTER'">
        <!-- 海报 -->
        <banner :bannerList="bannerList"></banner>
      </div>
      <div class="main"  v-if="item.comCode == 'EXPERTS'" >
        <!-- 精选专家 -->
        <doctor-home :sourceIds="item.sourceIds[0]"></doctor-home>
      </div>
      <div class=""  v-if="item.comCode == 'NEWS'" >
        <!-- 文章资讯 -->
        <news-home :sourceIds="item.sourceIds[0]"></news-home>
      </div>
      <div class="main" v-if="item.comCode == 'HEALTHSERVICE'">
        <!-- 健康商城 -->
        <shop :sourceIds="item.sourceIds[0]"></shop>
      </div>
      <div class="main" v-if="item.comCode == 'KNOWLEDGEPAY'">
        <!-- 健康课程 -->
        <course-home :initGroupKey="item.sourceIds[0]"></course-home>
      </div>
      <div class="main"  v-if="item.comCode == 'PSYCHOEVALUATION'">
        <!-- 心理测评 -->
        <psyer-home :initGroupKey="item.sourceIds[0]"></psyer-home>
      </div>
      <div class="main"  v-if="item.comCode == 'CONSULTANT'">
        <!-- 咨询师 -->
        <consultation-list :initGroupKey="item.sourceIds[0]"></consultation-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NewsHome from "../news/NewsHome.vue";
import Shop from "../shop/Shop.vue";
import Banner from "../home/Banner.vue";
import DoctorHome from "../doctor/DoctorHome.vue";
import CourseHome from "../consultation/CourseHome.vue";
import PsyerHome from "../consultation/PsyerHome.vue";
import ConsultationList from "../consultation/ConsultationList.vue";

export default {
  data() {
    return {
      sourceIds: "",
      arr: [],
      bannerList: "",
      page: 1,
      isShare: this.$route.query.isShare,//分享
    };
  },
  props: {
    pageId: ""
  },

  components: {
    shop: Shop,
    banner: Banner,
    newsHome: NewsHome,
    courseHome: CourseHome,
    psyerHome: PsyerHome,
    consultationList: ConsultationList,
    doctorHome: DoctorHome
  },

  computed: {
    ...mapGetters(["loginData"]),
    //标题
    title() {
      if (this.arr.comCode == "HEALTHSERVICE") {
        return "医疗服务";
      }
    }
  },

  methods: {
    //初始化组件
    getOrgShow() {
      let vm = this;
      const request = {
        pageId: this.pageId ? this.pageId : this.$route.query.pageId
      };
      vm.$store
        .dispatch("orgShow", request)
        .then(data => {
          if (data.data) {
            vm.arr = data.data.detailsList;
            let navName = data.data.pageName;
            let pageUrl = data.data.pageUrl;
            //页面跳转，返回参数
            localStorage.setItem("navName", navName);
            localStorage.setItem("pageUrl", pageUrl);
            for (let i = 0; i < data.data.detailsList.length; i++) {
              let comCode = data.data.detailsList[i].comCode;
              // if (data.data.detailsList[i].sourceIds.length > 0) {
              //   this.sourceIds.push(data.data.detailsList[i].sourceIds[0]);
              // }
              switch (comCode) {
                case "POSTER": //海报
                  this.bannerList = data.data.detailsList[i].bannerList;
                  break;
              }
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },

  created() {
    this.getOrgShow();
    console.log(this.pageId, "==home-pageId");
  }
};
</script>
<style>
.title {
  padding: 14px 16px;
  background: #fff;
  overflow: hidden;
}
.title .h3 {
  float: left;
  color: #000;
  font-size: 18px;
  font-weight: 500;
}
.h3 span {
  display: inline-block;
  width: 3px;
  height: 16px;
  background: #0093ff;
  margin-right: 5px;
  position: relative;
  top: 2px;
}
.more {
  float: right;
  font-size: 13px;
  color: #7a8093;
  text-decoration: none;
  font-weight: 400;
  margin-top: 3px;
}
.more img {
  width: 10px;
  height: 10px;
}
</style>

<style scoped>
.main {
  background: #fff;
  margin-bottom: 10px;
}
.main_banner{
  background: #fff;
  padding-bottom: 10px;
}
</style>
