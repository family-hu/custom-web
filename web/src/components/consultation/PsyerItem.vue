<template>
  <div style="background:#fff">
    <div class="cell flex-b">
      <div>
        <img class="usericon" :src="psyerImg">
      </div>
      <div class="cellL">
        <div >
          <div style="display: inline-block;">
            <span class="namecs">{{ psyerItem.nameCn }}</span>
          </div>

          <div style="margin-top: 4px;">
            <span class="hos">{{ psyerItem.certification }}</span>
          </div>
          <div class="maxLine" style="margin-top: 4px;">
            <span class="personLab1">{{ despSpecialTxt }}</span>
          </div>

          <div class="bottomV">
            <span class="money">{{ psyerPrice}}</span>
          </div>
        </div>
      </div>
    </div>

    <hr class="full-line" align= center size="1 ">

  </div>

</template>

<script>
  import imgMap from "../../../static/js/imgmap";
  export default {
    props: ['psyerItem'],
    computed: {
      //头像
      psyerImg() {
        if(this.psyerItem.photoUrl) return this.psyerItem.photoUrl;
        return imgMap.consultationSmallImg;
      },
      //描述
      despSpecialTxt(){
        let txt='';
        if(this.psyerItem.despSpecial){
          this.psyerItem.despSpecial.forEach(item => {
            txt += item + "、";
          })
        }
        if(txt.length > 0){
          txt = txt.substring(0,txt.length-1);
        }
        return txt;
      },
      //价格
      psyerPrice() {
        if(this.psyerItem.mealSetPrice1 == null) return '';
        if(this.psyerItem.mealSetPrice2 == null){
          return '¥' + this.psyerItem.mealSetPrice1.value;
        }else{
          return '¥' + this.psyerItem.mealSetPrice1.value + "～" +this.psyerItem.mealSetPrice2.value;
        }
      },



    }
  }
</script>

<style scoped>

  .cell{
    padding: 20px 16px;
  }

  .namecs{
    font-size:16px;
    font-weight:500;
    color:#000;
  }

  .titlecs1{
    font-size:12px;
    font-weight:400;
    color:#7A8093;
    margin-left: 2px;
  }

  .lab1{
    padding: 3px 6px;
    text-align: center;
    font-size:12px;
    color: #0093FF;
    border: 1px solid #0093FF;
    border-radius: 4px;
    margin-right: 10px;
  }
  .lab2{
    padding: 3px 6px;
    text-align: center;
    font-size:12px;
    color: #16D332;
    border: 1px #16D332 solid;
    border-radius: 4px;
    margin-right: 10px;
  }
  .lab3{
    padding: 3px 6px;
    text-align: center;
    font-size:12px;
    color: #FF5B5B;
    border: 1px #FF5B5B solid;
    border-radius: 4px;
  }
  .cellL{
    width: 80%;
    background-color: white;
    margin-left: 20px;
  }
  .hos{
    font-size:10px;
    font-weight:400;
    color:#000;
  }
  .personLab{
    color: #A1A1A1;
    font-size: 13px;
  }
  .personLab1{
    color:#7A8093;
    font-size: 12px;
    font-weight: 400;
  }
  .red{
    color: #FF5B5B;
    font-size: 13px;
  }
  .jibing{
    color:#7A8093;
    font-size: 12px;
    font-weight: 400;
  }
  .usericon{
    width: 80px;
    height: 80px;
    border-radius: 4%;
  }
  .maxLine{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bottomV{
    margin-top: 5px
  }
  .money{
    color: #FF0000;
    font-size: 14px;
  }
  .yuyue{
    background-color:#FFBD00;
    color: white;
    width: 55px;
    line-height: 23px;
    position: absolute;
    left: 10px;
    top: 52px;
    float:right ;
    font-size: 12px;
    font-weight: 300;
    text-align: center;
    border-radius: 12px;
  }
</style>
