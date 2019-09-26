<template>
    <div>
      <img width="100%" height="122px" :src="orgPubImg" v-if="org">
      <div class="org">
        <img class="icon" :src="orgImg" v-if="orgId">
        <p v-if="orgId">{{ orgInfo.orgNames }}</p>
      </div>
      <div v-if="newsList.length > 0">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <news-item v-for="item in newsList" :key="item.newsId.value" :newsItem="item" @click.native="toDetail(item)" ></news-item>
        </ul>
      </div>
      <div class="empty" v-if="empty">
        <img :src="consultationEmpty" width="144px" height="136px">
        <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无相关结果</div>
      </div>
    </div>
</template>

<script>
  import NewsItem from './NewsItem.vue';
  import imgMap from '../../../static/js/imgmap.js';
  import * as types from '../../constant/ConstantConfig.js';
    export default {
      data() {
        return {
          orgId: this.$route.query.orgId ? this.$route.query.orgId : localStorage.getItem("orgId"),
          classifyId: this.$route.query.classifyId,
          orgInfo: {},
          org: false,
          newsList: [],
          empty: false,
          loading: false,
          page: 1,
          loaded: false,   //是否加载完成
          navName: localStorage.getItem("navName"), //导航首页名字
          pageUrl: localStorage.getItem("pageUrl") //首页地址-返回微页面
        }
      },

      computed: {
        consultationEmpty() {
          return imgMap.consultationEmpty;
        },
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
            item.newsId +
            "&timestampCustomServe=true" +
            "&orgNames=" +
            this.navName +
            "&pageUrl=" +
            this.pageUrl +
            '&customOrgId=' + this.orgId;
        },

        loadMore() {
          if(!this.loaded) {
            this.page++;
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
          this.$store.dispatch("newsList", request).then((data) => {
            if(data.newsList.length > 0) {
              for(let i = 0; i < data.newsList.length; i++) {
                vm.newsList.push(data.newsList[i]);
              }
              vm.loaded = vm.newsList.length >= data.total;
              vm.loading = false;
            } else {
              vm.loaded = true;
              vm.empty = true;
            }
          }).catch(error => {
            vm.loading = false;
            vm.loaded = true;
            vm.empty = true;
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
  .empty {
    padding: 50px 40px;
    text-align: center;
  }

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
