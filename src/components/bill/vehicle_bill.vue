<template>
  <div>
    <goBack :message="parentMsg">
    </goBack>
    <div class="main-warp">
      <div class="main-center-div">
        <ul>
          <li :class="{ active: showIf == 1 }" @click="changeShow(1)">已出账单</li>
          <li :class="{ active: showIf == 2 }" @click="changeShow(2)">未出账单</li>
        </ul>
      </div>
      <!-- 已出账单 -->
        <div class="yes" v-show="showIf == 1">
          <template v-if ="showType == 1">

          <div class="main-second-div">
            <router-link to="/allBills">
              <div class="second-top-div" >
                <p>账单月份</p>
                <div class="right-div">
                  <span v-cloak>{{mainData.billPeriodMonth}}月账单</span>
                  <img src="../../assets/images/rightBack.png" alt="">
                </div>
              </div>
            </router-link>
            <div class="main-bottom-div">
              <p>剩余还款金额(元)</p>
              <p class="big-font" v-cloak>{{this.$main.priceFormat(mainData.daihuanNum+ mainData.billInterest+ mainData.overdueInterest)}}</p>
              <p v-cloak>账单日期{{dateTime}}
                <span class="margin-span" v-cloak>还款日{{mainData.billHuankuanDate}}</span>
              </p>
            </div>
          </div>
          <div class="main-third-div">
            <!-- 模板开始 -->
            <div class="main-third-template" v-for = "item in mainArr" style="position: relative">
              <p v-cloak>金额:{{priceFormat(item.collectBillNum)}} <span class="margin-span" style="position: absolute;left: 28%">利息:{{priceFormat(item.collectBillInterest)}}</span> </p>
              <p v-cloak>{{item.collectBillDate}}</p>
              <div class="right-div">
                <span v-cloak>{{priceFormat(item.collectBillNum)}}</span>
                <!--<img src="../../assets/images/rightBack.png" alt="">-->
              </div>
            </div>
          </div>
            <goSubmit :submitMsg="submitMsg" @onSubmit="repayment()"></goSubmit>

          </template>
          <template v-else>
            <loadingNot></loadingNot>
          </template>
        </div>


      <!-- 未出账单 -->
        <div class="no" v-show = "showIf == 2" style="display: none">
          <template v-if = "showType == 2">
          <div class="main-second-div">
            <div class="main-bottom-div">
              <p>剩余还款金额(元)</p>
              <p class="big-font" v-cloak>{{this.$main.priceFormat(mainData.daihuanNum+ mainData.billInterest+ mainData.overdueInterest)}} </p>
            </div>
          </div>
          <div class="main-third-div">
            <!-- 模板开始 -->
            <div class="main-third-template" v-for = "item in mainArr" style="position: relative">
              <p v-cloak>金额:{{priceFormat(item.collectBillNum)}}<span class="margin-span" style="position: absolute;left: 28%">利息:{{priceFormat(item.collectBillInterest)}}</span> </p>
              <p v-cloak>{{item.collectBillDate}}</p>
              <div class="right-div">
                <span v-cloak>{{priceFormat(item.collectBillNum)}}</span>
                <!--<img src="../../assets/images/rightBack.png" alt="">-->
              </div>
            </div>
          </div>
            <goSubmit :submitMsg="submitMsg" @onSubmit="repayment()"></goSubmit>
          </template>
          <template v-else>
            <loadingNot></loadingNot>

          </template>
        </div>


    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import goSubmit from '../common/goSubmit.vue'
  import loadingNot from '../common/loadingNot.vue'
  export default({
    name:"vehicleBill",
    data(){
      return {
        showIf:1,
        showType:0,
        parentMsg:"车辆账单",
        submitMsg:"还款",
        mainData:"",
        mainArr:"",    //数组
        dateTime:"",
        queryId :""
      }
    },
    mounted(){
      this.$main.checkLogin();
      var that = this;
      that.queryId = that.$route.query.id;
      that.getInfo(1)
    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      getInfo(finsh){
        var that = this;
        var data = {};
          if (finsh == 2 ){
            data.isFinished = 0
          }else{
            data.isFinished = 1;
          }
          that.$http.post('/api/ws/bp/h5/getCarrierMonthBill',data,{emulateJSON:true}).then( function (res){
            if (res.body.code ==1){
              that.showType = finsh;
              that.mainData = res.body.rows[0];
              that.mainArr = res.body.rows[0].carrierCarBills;
              that.dateTime = res.body.rows[0].billStartDate.substr(5,8) + '—'+ res.body.rows[0].billEndDate.substr(5,8)
            }else{

            }
          },function (res) {

          })
      },
      changeShow(index){
        if (index == 2){
          this.showIf = 2;
          this.getInfo(2)
        }else{
          this.showIf = 1;
          this.getInfo(1)
        }
      },
      repayment(){
        this.$router.push({
          name:'repaymentInstruction'
        })
      }
    },
    components:{
      goBack,
      goSubmit,
      loadingNot
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
  .right-div img {
    height: .65rem;
    width: .45rem;
    margin-top: .9rem;
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
    width: 100%;
    height: auto;
    /* padding: 0 4%; */
    background: #ffffff;
  }
  .main-third-template{
    position: relative;
    height: 2.2rem;
    width: 96%;
    margin-left: 4%;
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
