<template>
  <div >
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <div class="backInfo" v-if="isGet">
        <div class="left-info">
          <img src="../../assets/images/zhongxin.png" alt="">
        </div>
        <div class="right-info" >
          <div class="main-right-p">
            <!--<p v-cloak>{{BankInfo.zhongxinBank}}</p>-->
            <p>中信银行</p>
            <p v-cloak>{{BankNum}}</p>
          </div>
        </div>
      </div>
      <div class="main-div">
        <div class="main-top-div">
          <div class="p-font-div">
            <p>提现金额</p>
            <p><span class="bold-span">￥</span><input type="number" placeholder="请输入金额" class="money" v-model="money"></p>
          </div>
        </div>
        <div class="main-bottom-div">
          <p v-cloak>可用余额{{this.$main.priceFormat(BankInfo.accountBalance)}}元</p>
        </div>
        <div class="absolute-right" @click="submitAll()">
          全部提现
        </div>
      </div>
      <p class="bottom-p">扣除<span class="red">2</span>元手续费后,实际到账金额为
        <span class="red" v-cloak v-if="money >= 2">{{money - 2}}</span>
        <span class="red" v-cloak v-else>0</span>
        元</p>
    </div>
    <goSubmit :submitMsg="submitMsg" @onSubmit="onSubmit"></goSubmit>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import goSubmit from '../common/goSubmit.vue'
  export default({
    name:"Withdrawals",
    data(){
      return {
        parentMsg:'提现',
        submitMsg:'提交提现申请',
        BankInfo:"",
        money:"",
        isGet:false,
        BankNum:""
      }
    },
    mounted(){
      this.$main.checkLogin();
      var that = this;
      this.$http.get("/api/ws/bp/h5/uinfo").then(function(res){
        that.BankInfo = res.body.rows[0];
        if (that.BankInfo.appBidBankList && that.BankInfo.appBidBankList.length > 0 ){
          for (var i = 0, $length = that.BankInfo.appBidBankList.length; i < $length; i++) {
            if (that.BankInfo.appBidBankList[i].isRec == 1){
              that.isGet = true;
              that.BankNum = that.BankInfo.appBidBankList[i].cardNum
            }
          }
        }
      },function (res){

      })
    },
    components: {
      goBack:goBack,
      goSubmit:goSubmit
    },
    methods:{
      onSubmit: function (){
        var that = this;
        var data = {};
        if (that.isGet == true){
          if (that.money >= 4){
            data.money = that.money
          }else{
            this.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: "提现金额必须大于等于4元",
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
            return false;
          }
          data.aptype = 7;
          this.$http.post("/api/ws/bp/h5/borrower/apply",data,{emulateJSON:true}).then(function(res){
            if(res.body.code == 1){
              that.$layer.loading('正在提交');
              that.$router.push({
                name:'withdrawalsResult',
                query:{
                  id:res.body.applyid
                }
              })
            }else{
              that.$layer.toast({
                icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
                content: res.body.message,
                time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
              });
            }
          },function (res){

          })
        }else{
          this.$layer.toast({
            icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
            content: "你还没添加提现账户信息，请联系客服添加",
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          });
          return false;
        }
      },
      submitAll(){
        this.money = this.BankInfo.accountBalance
      }
    },
    beforeDestroy: function () {

    },
    watch:{
      money(val,oldVal){
        if (val > 0){
          document.querySelector(".money").style.fontSize = "0.85rem";
          if (val.length > 8){
            this.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: "提现金额不得大于8位数",
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
            this.money = "";
            document.querySelector(".money").style.fontSize = "0.85rem";
          }else{
//          this.$main.priceFormat(val)
          }
        }else{
//          document.querySelector(".money").style.fontSize = "0.65rem";
        }

      }
    }
  })
</script>
<style scoped>
  .main-warp{
    margin-top: 2.75rem;
  }
  .backInfo{
    width: 92%;
    height: 3.87rem;
    padding: 0 4%;
    background: #ffffff;
    margin-top: .5rem;
  }
  .left-info{
    width: 14%;
    height: 100%;
    float: left;
  }
  .right-info{
    width: 86%;
    height: 100%;
    float: right;
  }
  .left-info img{
    width: 100%;
    margin-top: .8rem;
  }
  .right-info p{
    margin-top: .4rem;
    color: #646464;
  }
  .main-right-p{
    height: 2.8rem;
    margin-top: 1rem;
    font-size: .65rem;
    margin-left: 8%;
  }
  .main-div{
    position: relative;
    width: 100%;
    height: 4.75rem;
    margin-top: .5rem;
    background: #ffffff;
    border-top: 1px solid #dedee3;
  }
  .main-top-div{
    width: 96%;
    height: 2.5rem;
    padding-top: .5rem;
    margin-left: 4%;
    border-bottom: 1px solid #dedee3;
  }
  .main-bottom-div{
    width: 96%;
    margin-left: 4%;
    margin-top: .4rem;
    font-size: .65rem;
    color: #646464;
  }
  .p-font-div{
  }
  .main-top-div p{
    font-size: .65rem;
    margin-bottom: 0.5rem;
  }
  .bold-span{
    font-size: .75rem;
    /* font-weight: 700; */
    line-height: 1rem;
    display: block;
    float: left;
  }
  .money{
    color: #646464;
    font-size: .8rem;
    background: #ffffff;
  }
  .absolute-right{
    position: absolute;
    top: 1rem;
    right: 5%;
    font-size: .65rem;
    color: #03A9F4;
    cursor: pointer;
  }
  .red {
    color: #dd5d58;
  }
  .bottom-p{
    font-size: .65rem;
    margin-top: .5rem;
    margin-left: 3%;
  }
</style>
