<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <div class="main-center">
        <p>自助还款功能暂未开通</p>
        <p>如需还款,请充值需还款金额后联系客户经理</p>
        <router-link to="/Recharge">
          <button class="goRecharge">去充值</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  export default({
    name:"repaymentInstruction",
    data(){
      return {
        parentMsg:"还款说明"
      }
    },
    mounted(){
      this.$main.checkLogin();
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
    padding-top:3rem ;
    width: 100%;
    height: auto;
    font-size: .7rem;
    color: #646464;
    text-align: center;
  }
  .main-center p {
    margin-bottom: .7rem;
  }
  .goRecharge{
    margin-top: 1rem;
    width: 35%;
    height: 2rem;
    line-height: 2rem;
    color: #ffffff;
    background: #03A9F4;
    -webkit-border-radius:;
    -moz-border-radius:;
    border-radius: 5px;
    font-size: .7rem;
  }
</style>
