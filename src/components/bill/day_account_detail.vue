<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <template v- if = "mainData.length > 0 ">
      <div class="main-warp">
        <!--模板开始-->
        <template v-for = "(item,index) in mainData ">
          <div class="template-main" @click="goDetail(index)">
            <div class="template-center" style="position: relative">
              <p v-cloak>{{item.cardNum}}  <span style="position: absolute;left: 28%;">{{item.chargingIn}}|{{item.chargingOut}}</span></p>
              <p v-cloak> {{item.collectBillDate}}</p>
              <div class="right-div template-right-div">
                {{priceFormat(item.costNum)}}
                <img src="../../assets/images/rightBack.png" alt="">
              </div>
            </div>
          </div>
        </template>

      </div>
    </template>
    <template v-if = "mainData.length == 0">
      <loadingNot></loadingNot>
    </template>

  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import loadingNot from '../common/loadingNot.vue'
  export default({
    name:"dayAccountDetail",
    data(){
      return {
        parentMsg:"记账详情",
        mainData:""
      }
    },
    mounted(){
      this.$main.checkLogin();
      var data = {};
//      data.etcCardId = this.$route.query.id;
      data.collectBillDate = this.$route.query.date;
      this.getInfo(data);
    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      getInfo(data){
        var that = this;
        this.$http.post('/api/ws/bp/h5/getEtcCardBill',data,{emulateJSON:true}).then(function(res){
          if (res.body.code == 1 ){
            this.mainData = res.body.rows;
            setTimeout( function (){
              that.$layer.close()
            },2000);
          }else{
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: res.body.message,
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }
        },function(res){
        });
      },
      goDetail(index){
        this.$router.push({
          name:'consumptionDetailSecond',
          query: {
            id:encodeURIComponent(JSON.stringify(this.mainData[index]))
          }
        })
      }
    },
    components:{
      goBack,
      loadingNot
    }
  })
</script>
<style scoped>
   .main-warp{
     margin-top: 2.35rem;
   }
   .template-main{
     width: 100%;
     height: 3rem;
     position: relative;
     background: #fff;
   }
   .template-center{
     position: relative;
     width: 96%;
     margin-left: 4%;
     padding-top: .3rem;
     height: 2.66rem;
     border-bottom: 1px solid #efeff4;
   }
   .template-center p{
     font-size: .6rem;
     margin-top: .3rem;
     color: #8d8c8c;
   }
   .template-center p span{
     margin-left: 10%;
   }
   .template-right-div{
     line-height: 2.8rem;
     font-size: .7rem;
     color: #8d8c8c;
   }
   .template-right-div img{
     height: 1rem;
     width: .6rem;
   }
   .right-div{
     position: absolute;
     right: 4%;
     width: 96%;
     height: 2.25rem;
     top: 0;
     text-align: right;
     font-size: .65rem;
   }
   .right-div img {
     width: .5rem;
     height: .65rem;
     margin-top: 1.05rem;
   }

</style>
