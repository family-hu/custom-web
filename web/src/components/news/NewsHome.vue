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
        : sessionStorage.getItem("orgId"),
      newsList: [],
      navName: sessionStorage.getItem("navName"), //导航首页名字
      pageUrl: sessionStorage.getItem("pageUrl") //首页地址-返回微页面
    };
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
        item.newsId.value +
        "&orgNames=" +
        this.navName +
        "&pageUrl=" +
        this.pageUrl +
        '&customOrgId=' + this.orgId;
    },

    requestNewsList() {
      let request = {
        orgId: this.orgId,
        pageNum: this.page,
        pageSize: 2
      };
      let vm = this;
      this.$store.dispatch("newsList", request).then(newsList => {
        if (newsList) {
          for (let i = 0; i < newsList.length; i++) {
            vm.newsList.push(newsList[i]);
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
