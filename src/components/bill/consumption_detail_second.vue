<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <div class="main-center">
        <p> <span class="left-span">车牌号</span> <span class="right-span" style="font-size: .75rem" v-cloak>{{mainData.carPlateNumber}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">业务类型</span>
          <span class="right-span" v-if="mainData.type == 1">快递(共建)</span>
          <span class="right-span" v-if="mainData.type == 2">快递(非共建)</span>
          <span class="right-span" v-if="mainData.type == 3">快运(共建)</span>
          <span class="right-span" v-if="mainData.type == 4">快运(非共建)</span>
          <span class="right-span" v-if="mainData.type == 5">供应链</span>
          <span class="right-span" v-if="mainData.type == 6">智能运力</span>
        </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">消费对象</span> <span class="right-span" v-cloak>[ETC卡]{{mainData.cardNum}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">出入口</span> <span class="right-span" v-cloak>{{mainData.chargingIn}}-{{mainData.chargingOut}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">消费时间</span> <span class="right-span" v-cloak>{{mainData.costTime}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">消费金额(元)</span> <span class="right-span"v-cloak >{{mainData.costNum}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">记账日期</span> <span class="right-span" v-cloak>{{mainData.collectBillDate}}</span> </p>
      </div>
    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  export default({
    name:"consumptionDetailSecond",
    data(){
      return {
        parentMsg:"详情",
        mainData:""
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.mainData = JSON.parse(decodeURIComponent(this.$route.query.id));
    },
    components:{
      goBack
    }
  })

</script>
<style scoped>
  .main-warp{
    margin-top: 2.25rem;
  }
  .main-center{
    width: 94%;
    height: 2rem;
    padding: 0 3%;
    background: #ffffff;
    border-top:1px solid #dbdbdb ;
  }
  .left-span{
    float: left;
    color: #646464;
  }
  .right-span{
    float: right;
    color: #6A6A6A;
  }
  .main-center{
    line-height: 2rem;
    font-size: .65rem;
  }

</style>
