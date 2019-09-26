<template>
  <div class="page-tabbar">
    <div class="page-wrap" v-if="pageId.length > 0">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home">
          <home :pageId="pageId"></home>
        </mt-tab-container-item>
        <mt-tab-container-item id="shopping">
          <!-- <shopping :pageId="pageId""></shopping> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="group">
          <!-- <group :pageId="pageId""></group> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="msg">
          <!-- <msg :pageId="pageId"></msg> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="mine">
          <!-- <mine :pageId="pageId""></mine> -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <div v-if="arr.length > 0" :style="'flex:' + arr.length" v-for="(item , index) in arr" :key="index">
        <mt-tab-item id="home" v-if="item.navName == '首页'" @click.native="changeTitle(item)">
          <img slot="icon" :src="homeImg">
          首页
        </mt-tab-item>
        <mt-tab-item id="shopping" v-if="item.navName == '商城'">
          <img slot="icon" :src="shoppingImg">
          商城
        </mt-tab-item>
        <mt-tab-item id="group" v-if="item.navName == '小组'">
          <img slot="icon" :src="groupImg">
          小组
        </mt-tab-item>
        <mt-tab-item id="msg" v-if="item.navName == '消息'" @click.native="changeTitle(item)">
          <img slot="icon" :src="msgImg">
          消息
        </mt-tab-item>
        <mt-tab-item id="mine" v-if="item.navName == '我的'">
          <img slot="icon" :src="mineImg">
          我的
        </mt-tab-item>
      </div>
      </mt-tabbar>
    </div>
</template>

<script>
  import Home from '../components/home/Home.vue';
  import imgMap from '../../static/js/imgmap.js';
  import { mapGetters } from 'vuex';

    export default {
        name: 'Main',
        data() {
          return {
            selected: "home",
            orgId: '910361211323850752',//this.$route.query.customOrgId,'1153177779693461504'
            focusEnter: true,//this.$route.query.focusEnter,
            arr: [],
            pageId: ''
          }
        },

      components:{
          home: Home,
      },

      computed: {
        ...mapGetters(['loginData', 'loginUrl']),
          homeImg() {
            if(this.selected == 'home') return imgMap.house_s;
            return imgMap.house_n;
          },
          shoppingImg() {
            if(this.selected == 'shopping') return imgMap.shopping_s;
            return imgMap.shopping_n;
          },
          groupImg() {
            if(this.selected == 'group') return imgMap.group_s;
            return imgMap.group_n;
          },
          msgImg() {
            if(this.selected == 'msg') return imgMap.msg_s;
            return imgMap.msg_n;
          },
          doctorImg() {
            return imgMap.doctor;
          },
          serviceImg() {
            return imgMap.service;
          },
          newsImg() {
            return imgMap.news;
          },
          mineImg() {
            if(this.selected == 'mine') return imgMap.my_s;
            return imgMap.my_n;
          },
      },

      methods: {
        //切换导航
        changeTitle(item) {
          this.pageId = item.pageId;
        },
        //获取导航
        getNavigations() {
          let vm = this;
          const request = {
            orgId: this.orgId
          };
          vm.$store
            .dispatch("navigations", request)
            .then(data => {
              if (data) {
                vm.arr = data.data;
                vm.pageId = data.data[0].pageId;//默认首页
                let navName = data.data[0].navName;
                let pageUrl = data.data[0].pageUrl;
                //页面跳转，返回参数
                localStorage.setItem("navName", navName);
                localStorage.setItem("pageUrl", pageUrl);
              }
            })
            .catch(error => {
              this.$toast(error.message);
            })
        },
      },
      created() {
        this.getNavigations();
        if (this.orgId) {
          localStorage.setItem("orgId", this.orgId);
        }
      },


    }
</script>

<style scoped>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 55px;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }
  .mint-tabbar.is-fixed{
    box-shadow:0px 0px 14px 2px rgba(0,0,0,0.08);
  }
  .mint-tab-item-icon{
    width: 26px;
    height: 26px;
  }
  .mint-tabbar > .mint-tab-item{
    background: #fff;
  }
  .mint-tabbar > .mint-tab-item.is-selected{
    background: #fff;
    color: #0076FF
  }
  .mint-tab-item-label{
    font-size: 10px;
    color:rgba(4,11,28,.7);
  }
</style>
