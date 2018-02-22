<template>
<div>
  <goBack :message="parentMsg"></goBack>
  <div class="main-warp">
    <div class="main-center-div">
      <p>待还总额(元)</p>
      <p class="big-font" v-cloak>{{this.$main.priceFormat(mainData.carDaihuanTotalNum + mainData.factorDaiHuanTotalNum)}}</p>
    </div>
    <div class="main-div">
      <p><span class="blue"></span> 车辆账单</p>
    </div>
    <div class="main-second-div">
      <p>剩余还款金额(元)</p>
      <p class="second-p" v-cloak>{{this.$main.priceFormat(mainData.carDaihuanTotalNum)}}</p>
    </div>
    <div class="main-third-div">
      <ul>
        <li class="border-right">
          <p>本月剩余还款金额(元)</p>
          <p v-cloak>{{this.$main.priceFormat(mainData.carMonthDaiHuanTotalNum)}} </p>
          <p>账单日 {{mainData.billDate}}号</p>
        </li>
        <li>
          <p>逾期账单金额(元)</p>
          <p v-cloak>{{this.$main.priceFormat(mainData.carOverdueNum)}}</p>
          <p>逾期账单数 <span class="red-font" v-cloak>{{mainData.carOverdueCount}}</span>笔</p>
        </li>
      </ul>
    </div>
    <div class="main-four-div">
      <ul>
          <li class="border-right" @click="goRouter(1)">
            本月还款
          </li>
          <li @click="goRouter(2)">
            逾期还款
          </li>
      </ul>
    </div>
    <div class="main-div">
      <p><span class="blue"></span>保理账单</p>
    </div>
    <div class="main-five-div">
      <p>剩余还款金额(元)</p>
      <p class="second-p" v-cloak>{{this.$main.priceFormat(mainData.factorDaiHuanTotalNum)}}</p>
      <div class="main-five-span">
        <div class="left-div" v-cloak>
          保理业务笔数 {{mainData.factorCount}}
        </div>
        <div class="right-div">
          逾期笔数 <span class="red-font" v-cloak>{{mainData.factorOverdueCount}}</span>
        </div>
      </div>
    </div>
    <router-link to="/factoringAccount">
      <div class="main-six-div">
        查账还款
      </div>
    </router-link>
  </div>
</div>
</template>
<script>
  import goBack from '../common/goBack.vue'
export default ({
  name:"bill",
  data(){
    return{
      parentMsg:"账单",
      mainData:""
    }
  },
  mounted(){
    this.$main.checkLogin();
    var that = this;
    this.$http.post('/api/ws/bp/h5/getBillDetail').then(function(res){
      if (res.body.code == 1 ){
        that.mainData = res.body.data;
        setInterval( function (){
          that.$layer.close()
        },2000)
      }else{
        this.$layer.toast({
          icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
          content: res.body.message,
          time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
        });
      }
    },function(res){
    });
  },
  methods:{
    goRouter(index){
      if (index == 1){
        this.$router.push(
          {
            path: '/vehicleBill',
            query:{
              id:index
            }
          })
      }else{
        this.$router.push({path:'/overdueBill'})

      }

    }
  },
  components:{
    goBack
  }
})
</script>
<style scoped>
  .main-warp{
    margin-top: 2.35rem;
  }
  .main-center-div{
    width: 92%;
    padding: 0 4%;
    padding-top: .5rem;
    height: 2.75rem;
    background: #ffffff;
    font-size: .6rem;
    color: #646464;
  }
  .main-center-div p {
    margin-bottom: .5rem;
  }
  .main-center-div .big-font{
    font-size: .8rem;
    color: #ed723c;
  }
  .main-div{
    width: 92%;
    padding: 0 4%;
    height: 2rem;
    line-height: 2rem;
    font-size: .7rem;
    color: #646464;
  }

  .blue{
    margin-right:2%;
    padding: .15rem;
    background: #03A9F4;
  }
  .main-second-div{
    width: 92%;
    padding: 0 4%;
    padding-top: .5rem;
    height: 2.5rem;
    background: #ffffff;
    font-size: .6rem;
    color: #646464;
    border-bottom: 1px solid #efeff4;
  }
  .main-second-div p {
    margin-bottom: .5rem;
  }
  .second-p{
    font-size: .8rem;
  }
  .main-third-div{
    width: 92%;
    padding: 0 4%;
    height: 4.5rem;
    background: #ffffff;
    border-bottom: 1px solid #efeff4;

  }
  .main-third-div ul{
    height: 4.45rem;
    width: 100%;
  }
  .main-third-div ul li {
    padding-top: .5rem;
    width: 49%;
    float: left;
    height: 3.9rem;
  }
  .main-third-div p{
    font-size: .6rem;
    color: #646464;
    margin-left: 3%;
    margin-bottom: .6rem;
  }
   .red-font{
    color: #dd4f47;
  }
  .border-right{
    border-right: 1px solid #efeff4;
  }
  .main-four-div{
    width: 92%;
    padding: 0 4%;
    height: 2.2rem;
    background: #ffffff;
  }
  .main-four-div ul {
    height: 2.2rem;
    width: 100%;
  }
  .main-four-div ul li{
    float: left;
    width: 49%;
    height: 100%;
    font-size: .8rem;
    color: #03A9F4;
    line-height: 2.2rem;
    text-align: center;
    cursor: pointer;
  }
  .main-five-div{
    width: 92%;
    padding: 0 4%;
    height: 4rem;
    padding-top: .5rem;
    font-size: .65rem;
    color:#646464 ;
    background: #ffffff;
  }
  .main-five-div p{
    margin-bottom: .65rem;
  }
  .main-five-span{
    width: 100%;
    height: 1.25rem;
  }
  .left-div{
    float: left;
    width: 50%;
    height:100%;
  }
  .right-div{
    float: left;
    width: 50%;
    height:100%;
  }
  .main-six-div{
    width: 100%;
    height: 2.2rem;
    color:#03A9F4 ;
    line-height: 2.2rem;
    text-align: center;
    font-size: .8rem;
    cursor: pointer;
    background: #ffffff;
    border-top:1px solid #efeff4;
  }
</style>
