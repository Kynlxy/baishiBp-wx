<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <template v-if = "mainData">
        <div class="yes">
          <div class="main-second-div">
            <router-link to="/allBills">
              <div class="second-top-div">
                <p>账单月份</p>
                <div class="right-div">
                  <span v-cloak>{{mainData.billPeriodMonth}}月账单</span>
                  <img src="../../assets/images/rightBack.png" alt="">
                </div>
              </div>
            </router-link>
            <div class="main-bottom-div">
              <p>剩余还款金额(元)</p>
              <p class="big-font" v-cloak>{{this.$main.priceFormat(mainData.daihuanNum+ mainData.billInterest+ mainData.overdueInterest)}} 元</p>
              <p v-cloak>账单日期{{dateTime}}
                <span class="margin-span" v-cloak>还款日{{mainData.billHuankuanDate}}</span>
              </p>
            </div>
          </div>
          <div class="main-third-div">
            <!-- 模板开始 -->
            <div class="main-third-template" v-for = "item in mainArr">
              <p v-cloak>金额:{{priceFormat(item.collectBillNum)}} <span class="margin-span">利息:{{priceFormat(item.collectBillInterest)}}</span> </p>
              <p v-cloak>{{item.collectBillDate}}</p>
              <div class="right-div">
                <span v-cloak>{{priceFormat(item.collectBillNum)}}</span>
                <!--<img src="../../assets/images/rightBack.png" alt="">-->
              </div>
            </div>

          </div>
        </div>
      </template>
      <template v-else>
        <loadingNot></loadingNot>
      </template>
    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import loadingNot from '../common/loadingNot.vue'
  export default({
    name:"overdueBill",
    data(){
      return{
        parentMsg:"逾期还款账单",
        mainData:"",
        mainArr:"",
        dateTime:""
      }
    },
    mounted(){
      this.$main.checkLogin();
      var that = this;
      var data = {};
      data.isOverdue = 1;
      data.isFinished = 1;

//          if (finsh){
//            data.isFinished = finsh
//          }else{
//            data.isFinished = 0;
//          }
      this.$http.post('/api/ws/bp/h5/getCarrierMonthBill',data,{emulateJSON:true}).then( function (res){
        if (res.body.code ==1){
          that.mainData = res.body.rows[0];
          that.mainArr = res.body.rows[0].carrierCarBills;
          that.dateTime = res.body.rows[0].billStartDate.substr(5,8) + '—'+ res.body.rows[0].billEndDate.substr(5,8)
        }else{

        }
      },function (res) {
      })
    },
    components:{
      goBack,
      loadingNot
    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      }
    }
  })
</script>
<style scoped>
  .main-warp{
    margin-top: 2.35rem;
    color:#646464 ;
  }
  .main-center-div{
    width: 100%;
    height: 2.2rem;
  }
  .main-center-div ul li{
    width: 50%;
    height: 2.2rem;
    float: left;
    line-height: 2.2rem;
    font-size: .7rem;
    background: #ffffff;
    text-align: center;
  }
  .main-center-div .active{
    color: #03A9F4;
    border-bottom: 1px solid #03A9F4 ;
  }
  .main-second-div{
    width: 92%;
    height: 7rem;
    padding: 0 4%;
    margin-top: .5rem;
    background: #ffffff;
    margin-bottom: .5rem;
  }
  .second-top-div{
    position: relative;
    width: 100%;
    height: 2.2rem;
    font-size: .7rem;
    line-height: 2.2rem;
    border-bottom:1px solid #efeff4;
  }
  .right-div{
    position: absolute;
    right: 4%;
    width: 96%;
    height: 2.2rem;
    top: 0;
    line-height: 2.5rem;
    text-align: right;
    font-size: .65rem;
    cursor: pointer;
  }
  .right-div img{
    height: .6rem;
    width: .5rem;
    margin-top: .95rem;
  }
  .main-bottom-div{
    width: 92%;
    padding: 4% 4% 4% 0;
    height: 3.75rem;
  }
  .main-bottom-div p {
    font-size: .6rem;
    margin-bottom: .7rem;
  }
  .main-bottom-div .big-font{
    font-size: .8rem;
    color: #ec723c;
  }
  .margin-span{
    margin-left: 10%;
  }
  .main-third-div{
    position: relative;
    width: 92%;
    height: auto ;
    padding:0 4%;
    background: #ffffff;
  }
  .main-third-template{
    position: relative;
    height: 2.2rem;
    width: 100%;
    /*margin-left: 4%;*/
    padding-top: .7rem;
    border-bottom: 1px solid #efeff4;
    font-size: .6rem;
  }
  .main-third-template p {
    margin-bottom: .6rem;
  }
  .yes{
  }
  .no .main-bottom-div{
    width:92%;
    padding: 0 4%;
    height: 2.5rem;
    padding: .5rem;
    background: #ffffff;
  }
  .no .main-second-div{
    height:3.7rem;
  }
</style>
