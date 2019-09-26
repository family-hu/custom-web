<template>
    <div>
      <div class="title">
        <div class="h3"><span></span>文章资讯</div>
        <a @click="goMore" class="more">更多<img src="/static/img/more.png" alt=""></a>
      </div>
      <div>
        <news-item v-for="item in newsList" :key="item.newsId.value" :newsItem="item" @click.native="toDetail(item)" ></news-item>
      </div>
    </div>
</template>

<script>
import NewsItem from "./NewsItem.vue";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : localStorage.getItem("orgId"),
      newsList: [],
      navName: localStorage.getItem("navName"), //导航首页名字
      pageUrl: localStorage.getItem("pageUrl") //首页地址-返回微页面
    };
  },

  props: {
    sourceIds: null
  },

  computed: {},

  components: {
    newsItem: NewsItem
  },

  methods: {
    goMore() {
      this.$router.push({
        path: "newsList",
        query: {
          orgId: this.orgId
        }
      });
    },
    //资讯详情
    toDetail(item) {
      window.location.href =
        "http://yun.sinoylb.com/newsDetail?newsId=" +
        item.newsId +
        "&timestampCustomServe=true" +
        "&orgNames=" +
        this.navName +
        "&pageUrl=" +
        this.pageUrl +
        '&customOrgId=' + this.orgId;
    },

    requestNewsList() {
      let request = {
        orgId: this.orgId,
        classifyId: this.sourceIds,
        pageNum: this.page,
        pageSize: 2
      };
      let vm = this;
      this.$store.dispatch("newsList", request).then(data => {
        if (data.newsList.length > 0) {
          for (let i = 0; i < data.newsList.length; i++) {
            vm.newsList.push(data.newsList[i]);
          }
        }
      });
    }
  },

  created() {
    this.requestNewsList();
  }
};
</script>

<style scoped>
</style>
