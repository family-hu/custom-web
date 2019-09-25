<template>
    <div>
      <img width="100%" height="122px" :src="orgPubImg" v-if="org">
      <div class="org">
        <img class="icon" :src="orgImg" v-if="orgId">
        <p v-if="orgId">{{ orgInfo.orgNames }}</p>
      </div>
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <news-item v-for="item in newsList" :key="item.newsId.value" :newsItem="item" @click.native="toDetail(item)" ></news-item>
      </ul>
    </div>
</template>

<script>
  import NewsItem from './NewsItem.vue';
  import imgMap from '../../../static/js/imgmap.js';
  import * as types from '../../constant/ConstantConfig.js';
    export default {
      data() {
        return {
          orgId:this.$route.query.orgId,
          classifyId: this.$route.query.classifyId,
          orgInfo: {},
          org: false,
          newsList: [],
          loading: false,
          page: 1,
          loaded: false,   //是否加载完成
          navName: sessionStorage.getItem("navName"), //导航首页名字
          pageUrl: sessionStorage.getItem("pageUrl") //首页地址-返回微页面
        }
      },

      computed: {
        orgPubImg() {
          if(this.orgInfo.orgPubUrl) return this.orgInfo.orgPubUrl;
          return imgMap.orgPubImg;
        },
        orgImg() {
          if(this.orgInfo.photoUrl) return this.orgInfo.photoUrl;
          return imgMap.orgImg;
        }

      },

      components: {
        newsItem: NewsItem
      },

      methods:{
        //资讯详情
        toDetail(item) {
          window.location.href =
            "http://yun.sinoylb.com/newsDetail?newsId=" +
            item.newsId.value +
            "&orgNames=" +
            this.navName +
            "&pageUrl=" +
            this.pageUrl;
        },

        loadMore() {
          if(!this.loaded) {
            this.requestNewsList();
          }
        },

        requestNewsList() {
          this.$indicator.open();
          this.loading = true;
          let request = {
            orgId: this.orgId,
            classifyId: this.classifyId ? this.classifyId : null,
            pageNum: this.page,
            pageSize: '10'
          };
          let vm = this;
          this.$store.dispatch("newsList", request).then((newsList) => {
            vm.page++;
            if(newsList) {
              for(let i = 0; i < newsList.length; i++) {
                vm.newsList.push(newsList[i]);
              }
              vm.loaded = (newsList.length != 10);
            } else {
              vm.loaded = true;
            }
            vm.loading = false;
          }).catch(error => {
            vm.loading = false;
            vm.loaded = true;
            this.$toast(error.message);
          })
          .finally(() => {
            this.$indicator.close();
          });
        },

        requestOrgInfo() {
          if(!this.orgId) return;
           let vm = this;
           let request = {orgId: this.orgId};
            this.$store.dispatch("orgDetail", request).then((orgInfo) => {
              if(orgInfo){
                vm.orgInfo = orgInfo;
                this.org = true
              }
            })
        }

      },

      created() {
        this.requestNewsList();
        this.requestOrgInfo();
      }
    }
</script>

<style scoped>
  ul,li{ padding:0;list-style:none; margin: 0}

  .org{
    color: #fff;
    font-weight: 400;
    font-size: 15px;
    position: absolute;
    line-height: 23px;
    text-shadow: 2px 2px 10px black;
    left:16px;
    top: 44px;
    display: flex;
    align-items: center;
  }

  .icon{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 5px;
  }

</style>
