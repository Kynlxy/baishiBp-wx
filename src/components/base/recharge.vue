<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <div class="main-center-top">
        暂无开通线上充值功能,请到银行服务网点转账以下账户
      </div>
      <div class="main-center-center">
        <p>户名:&nbsp;<span v-cloak>{{BankInfo.zhongxinAccountName}}</span></p>
        <p>中信账号:&nbsp;<span v-cloak>{{BankInfo.zhongxinAccount}}</span></p>
        <p>开户行:&nbsp;<span v-cloak>{{BankInfo.zhongxinBank}}</span></p>
      </div>
      <div class="last-p">
        <p>备注:充值后,请联系客户经理申请还款</p>
      </div>
    </div>
    <!--<goSubmit :submitMsg="submitMsg" @onSubmit="goComplete()"></goSubmit>-->
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
//  import goSubmit from '../common/goSubmit.vue'

  export default({
    name:"Recharge",
    data(){
      return{
        parentMsg:"充值",
//        submitMsg:"完成"
        BankInfo: ""
      }
    },
    components: {
      goBack:goBack,
//      goSubmit:goSubmit
    },
    methods:{
//      goComplete: function (){
//        this.$router.push({name:'index'})
//      }
      getInfo(){
        var that = this;
        this.$http.get("/api/ws/bp/h5/uinfo").then(function(res){
          that.BankInfo = res.body.rows[0];

        },function (res){

        })
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.getInfo();
    }
  })
</script>
<style scoped>
  .main-warp{
    margin-top: 2.25rem;
  }
  .main-center-top{
    width: 100%;
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: .53rem;
    text-align: center;
    color: #646464;
  }
  .main-center-center{
    width: 96%;
    padding-left: 4%;
    padding-top: .8rem;
    height: 4.2rem;
    background: #ffffff;
    font-size: .65rem;
    color: #646464;
  }
  .main-center-center p {
    margin-bottom: .8rem;
  }
  .last-p{
    font-size: .65rem;
    color: #03A9F4;
    margin-top: .5rem;
    margin-left: 4%;
  }
</style>
