<template>
  <div>
    <goBack :message="parentsMsg"></goBack>
    <div class="main-warp">
      <div class="main-center">
        <p> <span class="left-span">保理合同编号</span> <span class="right-span" style="font-size: .75rem" v-cloak>{{mainData.contractId}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">放款金额(元)</span> <span class="right-span" v-cloak>{{this.$main.priceFormat(mainData.factorBillPrincipal)}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">融资利率</span> <span class="right-span" v-cloak>{{mainData.rate}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">还款总额(元)</span> <span class="right-span" v-cloak>{{this.$main.priceFormat(mainData.daihuanNum + mainData.factorBillInterest + mainData.overdueInterest)}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">还款利息(元)</span> <span class="right-span" v-cloak>{{this.$main.priceFormat(mainData.factorBillInterest)}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">生成日期</span> <span class="right-span" v-cloak>{{mainData.buildAt}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">最后还款日期</span> <span class="right-span" v-cloak>{{mainData.lastDate}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">计息天数</span> <span class="right-span" v-cloak>{{mainData.interestDay}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">逾期天数</span> <span class="right-span" v-cloak>{{mainData.overdueDays}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">预期罚款</span> <span class="right-span" v-cloak>{{this.$main.priceFormat(mainData.overdueInterest)}}</span> </p>
      </div>
    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  export default({
    name:"detail",
    data(){
      return{
        parentsMsg:"详情",
        mainData:""
      }
    },
    mounted: function (){
      this.$main.checkLogin();
      this.getInfo(this.$route.query.id)
    },
    methods:{
      getInfo(id){
        var data = {};
        var that = this;
        data.id = id
        this.$http.post('/api/ws/bp/h5/getCarrierFactorBillDetail',data,{emulateJSON:true}).then(function(res){
          if (res.body.code == 1 ){
            this.mainData = res.body.factorBill;
            setTimeout( function (){
              that.$layer.close()
            },2000);
          }else{
            this.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: res.body.message,
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }
        },function(res){
        });
      }
    },
    components:{
      goBack : goBack
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
