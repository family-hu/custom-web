<template>
  <div>
    <div class="title">
      <div class="h3"><span></span>咨询师</div>
      <a @click="goMore" class="more">更多<img src="/static/img/more.png" alt=""></a>
    </div>
    <div class="upFooterView">
      <ul class="psy-home">
        <psyer-item v-for="(item,index) in psyerList" :key="index" :psyerItem="item" @click.native="toDetail(item)"></psyer-item>
      </ul>
    </div>
  </div>
</template>

<script>
import PsyerItem from "./PsyerItem.vue";
import { mapGetters, mapMutations } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      // sortBy: this.$route.query.sortBy, //排序
      psyerList: [],
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : localStorage.getItem("orgId"), //'1079654019066011648',
      navName: localStorage.getItem("navName"), //导航首页名字
      pageUrl: localStorage.getItem("pageUrl") //首页地址-返回微页面
    };
  },
  props: {
    initGroupKey: null
  },

  components: {
    psyerItem: PsyerItem
  },

  computed: {
    psyerEmpty() {
      return imgMap.psyerEmpty;
    }
  },

  methods: {
    initData(cosGroupKeys) {
      let method = "psyerQuery";
      let request = {
        orgId: this.orgId,
        cosGroupKeys: cosGroupKeys,
        pageNum: 1,
        pageSize: 4
      };
      this.$store
        .dispatch(method, request)
        .then(data => {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              this.psyerList.push(data[i]);
            }
          }
        })
    },
    goMore() {
      //更多咨询师
      window.location.href =
        "http://gzh.1010psy.com/psyer?initOrgId=" +
        this.orgId +
        "&timestampCustomServe=true" +
        "&orgNames=" +
        this.navName +
        "&pageUrl=" +
        this.pageUrl;
    },
    toDetail(item) {
      window.location.href =
        "http://gzh.1010psy.com/psyerDetail?pevalId=" +
        item.psyerId.value +
        "&timestampCustomServe=true" +
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
ul,
li {
  padding: 0;
  list-style: none;
  margin: 0;
}

.psy-home {
  background-color: #fff;
}
.empty {
  padding: 20px 40px;
  text-align: center;
}

.empty-div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
}

.btn {
  font-size: 20px;
  font-weight: 600;
  color: floralwhite;
  background-color: rgb(0, 182, 108);
  height: 44px;
  border-radius: 22px;
  margin-top: 30px;
  width: 70%;
  border-width: 0; /* 边框宽度 */
  outline: none; /* 不显示轮廓线 */
}

.up-down {
  width: 100%;
  height: 44px;
  background: rgb(255, 255, 255);
  position: relative;
  display: flex;
}
.title {
  font-size: 14px;
  color: rgb(102, 102, 102);
  padding-left: 20px;
}
.up-down ul {
  display: flex;
  align-content: center;
  margin-left: 8px;
}
.up-down ul li {
  color: rgb(0, 0, 0);
  font-size: 16px;
  padding: 10px;
}
.up-down ul li.on {
  color: rgb(0, 182, 108);
}
.open_down {
  width: 40px;
  height: 40px;
  line-height: 54px;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  z-index: 1000;
  transition: transform 0.3s;
}
.open_down img {
  width: 20px;
  height: 20px;
}
.open_down.on {
  transform: rotateZ(180deg);
}
.up-down2 {
  overflow: hidden;
  background: rgb(255, 255, 255);
  border-top: 1px solid rgb(238, 238, 238);
  padding-top: 15px;
  border-bottom: rgb(204, 204, 204) solid 1px;
}
.up-down2 li {
  float: left;
  padding: 5px 10px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 17px;
  margin-left: 14px;
  margin-bottom: 15px;
  color: rgb(0, 0, 0);
  font-size: 14px;
}
.up-down2 li.on {
  color: rgb(255, 255, 255);
  background: rgb(0, 182, 108);
  border-color: rgb(0, 182, 108);
}
</style>
