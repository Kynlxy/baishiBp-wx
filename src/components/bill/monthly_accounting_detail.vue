<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <!-- 已还 -->
    <div class="main-warp" style="display: none">
      <div class="main-center-top">
        <p><img src="../../assets/images/zan.png" alt="">本月账单已还清!</p>
      </div>
      <div class="main-center-div">
        <div class="span-div">
          <span class="left-span">本月还款金额</span> <span class="right-span">还款时间</span>
        </div>
        <div class="span-div">
          <span class="left-span big-font">121,203.00</span>  <span class="right-span">2016/12/30</span>
        </div>
      </div>
      <!--模板开始-->
      <div class="template-div">
        <div class="template-main-show">
          <p>消费:1100000元</p>
          <p>2017/09/22</p>
          <div class="right-div">
            <span class="red">12300</span>
            <img src="../../assets/images/rightBack.png" alt="">
          </div>
        </div>
      </div>

      <div class="template-div">
        <div class="template-main-show" @click="goDetail(1)">
          <p>消费:1100000元</p>
          <p>2017/09/22</p>
          <div class="right-div">
            <span class="red">12300</span>
            <img src="../../assets/images/rightBack.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 未还 -->
    <div class="main-warp-no">
      <div class="main-no-center">
        <p>剩余还款金额(元)</p>
        <p class="big-font big">923,340,00</p>
        <div class="no-center-div">
          <ul>
            <li>
              <p>逾期天数 <span class="rad-font">3</span>天</p>
            </li>
            <li>
              <p>逾期利息 <span class="rad-font">100</span>元</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-no-second">
        <p>
          <span class="left-span">本月还款金额(元)</span>
          <span class="right-span">还款时间</span>
        </p>
        <p>
          <span class="left-span big">121,221,121</span>
          <span class="right-span">--</span>
        </p>
      </div>
      <div class="main-no-third">

        <!-- 模板开始 -->
        <div class="template-main">
          <div class="template-center">
            <p>[ETC]2902817231  <span>浙江杭州</span></p>
            <p>2017/10/21  <span>07:10:12</span></p>
            <div class="right-div template-right-div">
              1200元
              <img src="../../assets/images/rightBack.png" alt="">
            </div>
          </div>
        </div>

        <div class="template-main" >
          <div class="template-center">
            <p>[ETC]2902817231  <span>浙江杭州</span></p>
            <p>2017/10/21  <span>07:10:12</span></p>
            <div class="right-div template-right-div">
              1200元
              <img src="../../assets/images/rightBack.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <goSubmit :submitMsg="submitMsg" @onSubmit="onSubmit"></goSubmit>
  </div>

</template>
<script>
  import goBack from '../common/goBack.vue'
  import goSubmit from '../common/goSubmit.vue'
  export default({
    name:"monthlyAccountingDetail",
    data(){
      return{
        parentMsg:"账单详情",
        submitMsg:"还款"
      }
    },
    methods:{
      onSubmit(){
        console.log(1)
      }
    },
    components:{
      goBack,
      goSubmit
    }
  })
</script>
<style scoped>
  .main-warp{
    margin-top: 2.55rem;
  }
  .main-center-top{
    width: 92%;
    padding: 0 4%;
    height: 2.5rem;
    background: #ffffff;
    line-height: 2.5rem;
    text-align: center;
    font-size: .7rem;
  }
  .main-center-top img {
    width: 1rem;
    height: 1rem;
    margin-top: .7rem;
    margin-right: 2%;
  }
  .main-center-div{
    width: 92%;
    height: 2.5rem;
    padding: 0 4%;
    margin-top: .5rem;
    background: #ffffff;
    margin-bottom: .5rem;
  }
  .span-div{
    width: 100%;
    height: 1.15rem;
    line-height: 1.15rem;
    color: #646464;
    font-size: .6rem;
  }
  .left-span{
    float: left;
  }
  .right-span{
    float: right;
  }
  .span-div .big-font{
    font-size: .8rem;
    color: #ed723c;
  }
  .template-div{
    position: relative;
    width: 100%;
    height: 2.5rem;
    background: #ffffff;
  }
  .template-main-show{
    width: 96%;
    margin-left: 4%;
    padding-top: .5rem;
    height: 1.97rem;
    color: #8d8c8c;
    border-bottom: 1px solid #efeff4;
  }
  .template-main-show p{
    font-size: .65rem;
    margin-bottom: .3rem;
  }
  .right-div{
    position: absolute;
    right: 4%;
    width: 96%;
    height: 2.25rem;
    top: 0;
    line-height: 2.5rem;
    text-align: right;
    font-size: .65rem;
    cursor: pointer;
  }
  .right-div img{
    height: .8rem;
    width: .6rem;
    margin-top: .9rem;
    margin-left: 1%;
  }
  .main-warp-no{
    margin-top: 2.7rem;
  }
  .main-no-center{
    width: 92%;
    padding: 0 4%;
    padding-top: .8rem;
    height: 3.7rem;
    background: #ffffff;
  }
  .main-no-center p{
    margin-bottom: .6rem;
  }
  .rad-font{
    margin-left: 2%;
    color: #ec723c;
  }
  .big{
    font-size: .8rem;
    color: #ec723c;
  }
  .no-center-div{
    width: 100%;
    height: 1rem;
  }
  .no-center-div ul {
    height: 1rem;
  }
  .no-center-div ul li {
    width: 50%;
    height: 100%;
    float: left;
  }
  .main-no-second{
    width: 92%;
    padding: 0 4%;
    height: 2.5rem;
    padding-top: .5rem;
    background: #ffffff;
    margin-top: .5rem;
    color:#8d8c8c ;
    margin-bottom: .5rem;
  }
  .main-no-second p {
    display: block;
    width: 100%;
    height: 1rem;
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
    height: .9rem;
    margin-top: 1rem;
    margin-left: 1%;
  }

</style>
