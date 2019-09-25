<template>
  <div>
    <div v-if="consultationItem" class="list">
      <div class="img_box">
        <img class="image" v-lazy.container="consultationImg" :src="consultationImg"/>
        <div v-if="!showCount" class="icon">{{consultationItem.cosTypeTxt}}</div>
        <div v-if="showCount" class="num">{{ consultationItem.orderCount.value }}人已测</div>
      </div>

      <div class="text_box">
        <div class="namecs">{{name}}</div>
        <div class="people">{{ description }}</div>
      </div>
      <div class="flex-b">
        <div class="money">{{consultationPrice}}</div>
        <div class="moneyold" v-if="consultationPriceOld > 0">{{consultationPriceOld}}</div>
      </div>
    </div>
  </div>

</template>

<script>
import imgMap from "../../../static/js/imgmap";
export default {
  props: ["consultationItem", "ifcos"],
  computed: {
    //title
    name() {
      if (this.ifcos) {
        return this.consultationItem.name;
      } else {
        return this.consultationItem.title;
      }
    },
    // 描述
    description() {
      if (this.ifcos) {
        if (this.consultationItem.ifcolumn.value == "1") {
          return "更新至第" + this.consultationItem.cosCount.value + "期";
        }
        return "";
      } else {
        let txt = this.consultationItem.introduce;
        txt = txt.replace(/<.*?>/g, "");
        return txt;
      }
    },
    //健康课程 - 咨询师 -心理咨询，不同页面显示不同
    showCount() {
      if (this.ifcos) {
        return false;
      }
      return true;
    },
    //图片
    consultationImg() {
      if (this.consultationItem.pic) {
        return this.consultationItem.pic;
      }
      if (this.consultationItem.picWide) {
        return this.consultationItem.picWide;
      }
      return imgMap.consultationSmallImg;
    },
    //现价
    consultationPrice() {
      if (this.ifcos) {
        let ifPay = this.consultationItem.ifPay.value;
        if (ifPay == "0") return "免费";
        return "¥" + this.consultationItem.sellPrice.value;
      } else {
        let ifPay = this.consultationItem.ifPay.value;
        if (ifPay == "0") return "免费";
        return "¥" + this.consultationItem.price.value;
      }
    },
    //原价
    consultationPriceOld() {
      if (this.ifcos) {
        if (this.consultationItem.originalPrice)
          return this.consultationItem.originalPrice.value;
        return "";
      } else {
        if (this.consultationItem.price1)
          return this.consultationItem.price1.value;
        return "";
      }
    }
  }
};
</script>
<style>
.list .image[lazy="loading"] {
  width: 40px;
  height: 122px;
  margin: 0 auto;
  color: #333;
}
</style>
<style scoped>
.box {
  width: 44%;
  min-height: 122px;
}
.list {
  float: left;
  width: 44%;
  margin-left: 5%;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}
.img_box {
  width: 100%;
  height: 122px;
  position: relative;
  margin-bottom: 5px;
}
.list img {
  border-radius: 4px;
  width: 100%;
  height: 122px;
}
.text_box {
  height: 44px;
}
.namecs {
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #222222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.icon {
  font-size: 12px;
  color: #fff;
  width: 34px;
  height: 17px;
  line-height: 17px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 9px;
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.money {
  font-size: 13px;
  font-weight: 500;
  color: #ff0000;
}

.moneyold {
  padding-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #7a8093;
  text-decoration: line-through;
}
.people {
  width: 100%;
  font-size: 11px;
  font-weight: 400;
  color: #7a8093;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.num {
  position: absolute;
  color: rgb(255, 255, 255);
  font-size: 13px;
  font-weight: 500;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>

