<template>
  <div>
    <div v-for="(item , index) in arr" :key="index">
      <div v-if="item.comCode == 'SEARCH'" >搜索{{item.comCode}}</div>
      <div v-if="item.comCode == 'EXPERTS'" >精选专家{{item.comCode}}</div>
      <div class="mian_box">
        <health-service-item v-if="item.comCode == 'HEALTHSERVICE'" v-for="(items , index) in serviceList" :key="index" :healthServiceItem="items"></health-service-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import HealthServiceItem from "../shop/HealthServiceItem.vue";
export default {

  data() {
    return {
      serviceList:[],
      orgId:'1087171373522001920',
      arr: [],
      page: 1
    };
  },
  props:{
    pageId: ''
  },

  components: {
    healthServiceItem: HealthServiceItem,
  },


  computed: {
    ...mapGetters(["loginData"]),
  },



  methods: {
    //健康服务--套餐列表
    getPackagesList(sourceIds) {
      this.$indicator.open();
      let vm = this;
      const request = {
        pageParam:{
          pageSize: 10,
          pageNum: this.page,
        },
        packProdGroupId: sourceIds
      };
      this.$store
        .dispatch("groupPackagesList", request)
        .then(data => {
          if (data.data) {
            this.serviceList = data.data.list;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    //初始化组件
    getOrgShow() {
      let vm = this;
      const request = {
        pageId: this.pageId
      };
      vm.$store
        .dispatch("orgShow", request)
        .then(data => {
          if (data.data) {
            vm.arr = data.data.detailsList;
            for(let i = 0; i < data.data.detailsList.length; i++){
              let comCode = data.data.detailsList[i].comCode;
              let sourceIds = data.data.detailsList[i].sourceIds[0].value;
              switch (comCode) {
                case "SEARCH": //搜索

                  break;
                case "EXPERTS": //精选专家

                  break;
                case "HEALTHSERVICE": //商城列表
                  vm.getPackagesList(sourceIds); //健康服务
                  break;
              }
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        })
    },

  },

  created() {
    this.getOrgShow();
    if(this.orgId){
      localStorage.setItem('orgId',this.orgId);
    }
    console.log(this.pageId,'==home-pageId');
  },

};
</script>

<style scoped>
  .mian_box{
    overflow: hidden;
    margin-left: -4%;
    padding: 16px;
  }
</style>
