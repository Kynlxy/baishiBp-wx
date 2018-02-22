<template>
  <div>
    <div class="main-top">
      <div class="goBack" @click="goBack()">

      </div>
      <p>保理账单</p>
      <router-link to="/historyBill">
        <span class="right">历史账单</span>
      </router-link>
    </div>
    <template v-if = "mainData.length > 0">
      <div class="main-warp">
        <div class="main-center">
          <p>剩余还款金额(元)</p>
          <p class="big-font big" v-cloak>{{this.$main.priceFormat(money)}}</p>
          <div class="center-div">
            <ul>
              <li>
                <p>保理业务笔数 <span v-cloak>{{factorCount}}</span>笔</p>
              </li>
              <li>
                <p>逾期笔数 <span class="rad-font" v-cloak>{{num}}</span>笔</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-third">
          <!-- 模板开始 -->

          <div class="template-main"  v-for = "item in mainData">
            <div class="template-center">
              <p v-cloak>{{item.contractId}}<span v-cloak> {{item.lastDate}}</span></p>
              <p v-cloak style="color: #605e5e;">本息:￥<font style="font-size: .65rem;color: #ec723c;">{{priceFormat(item.overdueInterest + item.daihuanNum + item.factorBillInterest)}}</font><span>计息天数: <fongt style="color: red"> {{item.interestDay}}</fongt>天</span></p>
            </div>
            <input type="checkbox" class="left-input" @click="addMoney($event,item.overdueInterest + item.daihuanNum + item.factorBillInterest)">
            <div class="right-img" @click="goDetail(item.factorBillId)">
              <img src="../../assets/images/rightBack.png" alt="">
            </div>
          </div>
          <paper :getMsg="paperMsg" @getMore="getMore()"></paper>

        </div>
      </div>
      <div class="main-bottom">
        <ul>
          <li id="left-li">
            <input id="left-span" type="checkbox" class="left-input" @click="addTotal($event)">
          </li>
          <li>
            总计:￥ <span class="rad-font" v-cloak>{{priceFormat(totalMoney)}}</span>
            <button class="right-button" @click="repayment()">还款</button>
          </li>
        </ul>
      </div>
    </template>
    <template v-if = "mainData.length == 0 ">
      <loadingNot></loadingNot>
    </template>
  </div>
</template>
<script>
  import loadingNot from '../common/loadingNot.vue'
  import paper from '../common/page.vue'
  export default({
    name:"factoringAccount",
    data(){
      return {
        mainData:[],
        paperMsg:"获取更多",
        pageIndex:1,   //页码
        pageSize:10,    //数据条数
        money:"",      //还款金额
        factorCount:""  ,      //保理业务笔数
        totalMoney:0,
        num:""        //逾期笔数
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.getInfo()
    },
    methods:{
      addMoney(event,money){
        var that = this;
        var inputs = document.getElementsByTagName("input");//获取所有的input标签对象
        var checkboxArray = [];//初始化空数组，用来存放checkbox对象。
        var checkOk = [];
        for(var i=0;i<inputs.length;i++){
          var obj = inputs[i];
          if(obj.type=='checkbox'){
            checkboxArray.push(obj);
          }
        }
        for(var i = 0 ; i < checkboxArray.length; i ++){
           if (checkboxArray[i].checked){
             checkOk.push(checkboxArray[i])
           }
        }
        var x = checkboxArray.length - checkOk.length;
        if (event.target.checked){
            that.totalMoney = that.totalMoney + money;
          if (x == 1){
            document.getElementById("left-span").checked = true;
          }

        }else{
            that.totalMoney = that.totalMoney - money;
            document.getElementById("left-span").checked = false;
        }
      },
      addTotal(event){
        var that = this;
        var oInput = document.getElementsByTagName('input');
        var len =oInput.length;
        var checkBoxList=[];
        for(var i = 0 ; i < len ; i++){
          if(oInput[i].type == "checkbox"){
            checkBoxList.push(oInput[i]);
          }
        }

        if (event.target.checked){
          var arr = 0;
          for (var i = 0,$length = this.mainData.length; i < $length ; i ++){
              arr = arr + this.mainData[i].overdueInterest + this.mainData[i].daihuanNum + this.mainData[i].factorBillInterest
          }
          that.totalMoney = arr;
          for(var i=0;i<oInput.length;i++){
            oInput[i].checked = true;
          }

        }else{
          that.totalMoney = 0;
          for(var i=0;i<oInput.length;i++){
            oInput[i].checked = false;
          }
        }
      },
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      getInfo(){
        var that = this;
        var data = {};
        data.backStatus = 0;
        data.page = that.pageIndex;
        data.size = that.pageSize;
        this.$http.post('/api/ws/bp/h5/getCarrierFactorBill',data,{emulateJSON:true}).then(function(res){
          if (res.body.code == 1 ){
            this.mainData =this.mainData.concat(res.body.rows);
            this.money = res.body.money;
            this.factorCount = res.body.factorCount;
            this.num = res.body.overdueCount;
            if(this.pageIndex * this.pageSize > res.body.total){
              this.paperMsg = "已全部加载";
              that.$layer.toast({
                icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
                content: '已全部加载',
                time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
              });
            }
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
      goBack: function () {
        this.$router.go(-1)
      },
      goDetail(id){
        this.$router.push({
          name:'detail',
          query: {
            id:id
          }
        })
      },
      repayment(){
        this.$router.push({
          name:'repaymentInstruction'
        })
      },
      getMore(){
        this.pageIndex ++;
        this.getInfo()
      }
    },
    components:{
      loadingNot,
      paper
    }
  })
</script>
<style scoped>
  .main-top{
    position: fixed;
    top:0;
    width: 100%;
    height: 2.25rem;
    background: #ffffff;
    font-size: .75rem;
    text-align: center;
    line-height: 2.25rem;
    z-index: 11111111;
  }
  .goBack{
    position: absolute;
    top: .65rem;
    left: 3%;
    width: .5rem;
    height: 1rem;
    background: url(../../assets/images/goback.png) no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .right{
    position: absolute;
    top: 0;
    right: 5%;
    font-size: .6rem;
  }
  .main-warp{
    margin-top: 2.55rem;
  }

  .main-center{
    width: 92%;
    padding: 0 4%;
    padding-top: .8rem;
    height: 3.7rem;
    background: #ffffff;
    margin-bottom: .5rem;
    font-size: .6rem;
    color: #8d8c8c;
  }
  .main-center p{
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
  .center-div{
    width: 100%;
    height: 1rem;
  }
  .center-div ul {
    height: 1rem;
  }
  .center-div ul li {
    width: 50%;
    height: 100%;
    float: left;
  }
  .main-second{
    width: 92%;
    padding: 0 4%;
    height: 2.5rem;
    padding-top: .5rem;
    background: #ffffff;
    margin-top: .5rem;
    color:#8d8c8c ;
    margin-bottom: .5rem;
  }
  .main-second p {
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
    width: 75%;
    padding-left: 15%;
    padding-right: 10%;
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
    float: right;
    margin-right: 5%;
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
  .left-input{
    display: block;
    position: absolute;
    width: .8rem;
    height: .8rem;
    top:.8rem;
    left: 5%;
    background: #ffffff;
    outline: none;
  }
  .main-bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    /*padding-left: 15%;*/
    height: 2.3rem;
    background: #ffffff;
    z-index: 1111111;
  }
  .main-bottom ul li {
    position: relative;
    float: left;
    width: 70%;
    height: 2.3rem;
    line-height: 2.3rem;
    font-size: .7rem;
  }
  #left-li{
    width: 30%;
  }
  #left-span{
    left: 20%;
  }
  .right-button{
    position: absolute;
    right: 0;
    top:0;
    display: block;
    width: 3rem;
    height: 2.3rem;
    background: #03A9F4;
    font-size: .7rem;
    line-height: 2.3rem;
    color: #ffffff;
  }
  .right-span{
    float: right;
  }
  .left-span{
    float: left;
  }
  .right-img{
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 0;
    top:0;
  }
  .right-img img{
    width: .5rem;
    height: .8rem;
    margin-top: 1rem;
    margin-left: 1.5rem;
  }
</style>
