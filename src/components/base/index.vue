<template>
  <div>
    <carrousel></carrousel>
    <div class="main-warp">
      <div class="top-div">
        <router-link to="/basicData">
          <div class="first-p" v-cloak>
            {{dataInfo.companyName}}
          </div>
        </router-link>

        <div class="center-p">
          <p>账户余额(元)</p>
          <p><span class="span-p" v-cloak>{{this.$main.priceFormat(mainData.balance)}}</span></p>
        </div>
        <div class="line"></div>
        <div class="last-div">
          <ul>
            <li class="right-border">
              <router-link to="/withdrawals">
                <img src="../../assets/images/tixan.png" alt="">
                提现
              </router-link>
            </li>
            <li>
              <router-link to="/recharge">
                <img src="../../assets/images/chongzhi.png" alt="">
                充值
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="center-div">
        <div class="center-div-top">
          <div class="center-first-p">
            <p>待还总额(元)</p>
            <p><span class="span-p" v-cloak>{{this.$main.priceFormat(mainData.carDaiHuanTotalNum + mainData.factorDaiHuanTotalNum)}}</span></p>
          </div>
          <router-link to="/bill">
            <div class="absolute-right">
              <p>查账还款 <img src="../../assets/images/rightBack.png" alt=""> </p>
            </div>
          </router-link>
        </div>
        <div class="center-div-bottom">
          <ul>
            <li class="right-border">
              <p>车辆业务负债(元)</p>
              <p class="little-big" v-cloak>{{this.$main.priceFormat(mainData.carDaiHuanTotalNum)}}</p>
            </li>
            <li>
              <p style="margin-left: 12%">保理业务负债(元)</p>
              <p class="little-big" style="margin-left: 12%" v-cloak>{{this.$main.priceFormat(mainData.factorDaiHuanTotalNum)}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-last-div">
        <ul>
          <li class="right-border bottom-border">
            <router-link to="/accountFlow">
              <div class="last-common-div">
                <p><img src="../../assets/images/xianjin.png" alt=""> <span class="first-span">账户流水</span> </p>
                <p class="second-p">查询账户流水记录</p>
              </div>
            </router-link>
          </li>
          <li class="bottom-border right-li">
            <router-link to="/carList">
              <div class="last-common-div">
                <p><img src="../../assets/images/chelia.png" alt=""> <span class="first-span">车辆列表</span> </p>
                <p class="second-p" v-cloak>车辆数{{mainData.carListSize}}</p>
              </div>
            </router-link>

          </li>
          <li class="right-border ">
            <router-link to="messageNotification">
              <div class="last-common-div">
                <p><img src="../../assets/images/xiaoxi.png" alt=""> <span class="first-span">消息通知</span> </p>
                <p class="second-p"v-cloak>{{mainData.smsNoReaderCon}}条未读</p>
              </div>
            </router-link>
          </li>
          <li class="right-li">
            <a href="tel:0571-88888888">
              <div class="last-common-div">
                <p><img src="../../assets/images/kefu11.png" alt=""> <span class="first-span">专属客服</span> </p>
                <p class="second-p">在线咨询</p>
              </div>
            </a>

          </li>
        </ul>
      </div>

    </div>

  </div>
</template>
<script>
  import carrousel from '../common/swiper.vue'
  export default({
    name:"index",
    data(){
      return{
        mainData:"",
        dataInfo:""    //uInfo 数据
      }
    },
    mounted(){
      this.$main.checkLogin();
      var that = this;
//      console.log(this.$store.state.isLogin)       //console一下获取的登陆状态
      this.$http.get('/api/ws/bp/h5/getMainPage').then(function(res){
        if (res.body.code == 1 ){
          that.mainData = res.body.data;
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
      this.$http.get('/api/ws/bp/h5/uinfo').then(function(res){
        if (res.body.code == 1 ){
          that.dataInfo = res.body.rows[0];
        }else{

        }
      },function(res){
      });
    },
    components:{
      carrousel
    }
  })
</script>
<style scoped>
  p{
    color: #646464;

  }
  .top-div{
    width: 100%;
    height: 7.25rem;
    background: #ffffff;
  }
  .first-p{
    width: 100%;
    height: 2.25rem;
    font-size: .7rem;
    text-align: center;
    line-height: 2.25rem;
  }
  .center-p{
    width: 100%;
    height: 2.5rem;
    font-size: .7rem;
    text-align: center;
  }
  .span-p{
    font-size: .9rem;
    color: #ec723c;
  }
  .center-p p {
    margin-top: .5rem;
  }
  .last-div{
    width: 100%;
    height: 1.5rem;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #efeff4;
  }
  .last-div ul{
    overflow: hidden;
  }
  .last-div ul li {
    width: 49.5%;
    float: left;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: .7rem;
    text-align: center;
    margin-top: .2rem;
    cursor: pointer;
    color: #646464;
  }
  .last-div ul li img{
    width: .75rem;
    height: .75rem;
    margin-top: .4rem;
  }
  .right-border{
    border-right: 1px solid #efeff4;
  }
  .center-div{
    width: 100%;
    height: 6.5rem;
    background: #ffffff;
    margin-top: .5rem;
  }
  .center-div-top{
    position: relative;
    width: 92%;
    padding: 0 4%;
    height: 3.2rem;
    margin: 0 auto;
    border-bottom: 1px solid #efeff4;

  }
  .center-first-p{
    padding-top: .1rem;
    font-size: .6rem;
    color: #646464;
  }
  .center-first-p p {
    margin-top: .5rem;
  }
  .absolute-right{
    position: absolute;
    right: 4%;
    top: .8rem;
    font-size: .65rem;
    cursor: pointer;
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .absolute-right p {
    color: #72acf0;

  }
  .absolute-right img{
    width: .5rem;
    height: .65rem;
    margin-top: .45rem;
  }
  .center-div-bottom{
    width: 92%;
    padding: 0 4%;
    height: 3rem;
  }
  .center-div-bottom ul li {
    width: 49.5%;
    height: 2.1rem;
    float: left;
    padding-top: 0.8rem;
    font-size: .6rem;
    padding-bottom: 0.2rem;
  }
  .center-div-bottom p {
    margin-bottom: .4rem;
    margin-left: 2%;
  }
  .main-last-div{
    width: 96%;
    height: 6.5rem;
    padding-left: 4%;
    margin-top: .5rem;
    background: #ffffff;
  }
  .main-last-div ul li{
    float: left;
    width: 47.5%;
    height: 3.2rem;
  }
  .bottom-border{
    border-bottom: 1px solid #efeff4;
  }
  .last-common-div{
    width: 90%;
    height: 2.25rem;
    margin: .7rem auto 0 auto;
    cursor: pointer;
  }
  .last-common-div img{
    width: .7rem;
    height: .7rem;
  }
  .first-span{
    font-size: .7rem;
    margin-left: 1%;
    color: #333333;
  }
  .second-p{
    font-size: .65rem;
    margin-top: .5rem;
    padding-left: 1rem;
  }
  .right-li{
    padding-left: 4%;
  }
  .little-big{
    font-size: .72rem;
  }
</style>
