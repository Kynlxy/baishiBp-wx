<template>
<div>
  <goBack :message="parentMsg"></goBack>
  <template v-if = "mainData.length > 0">
    <div class="main-warp">
      <div class="main-center">
        <p>剩余还款金额(元)</p>
        <p class="big-font big" v-cloak>{{this.$main.priceFormat(money)}}</p>
        <div class="center-div">
          <ul>
            <li>
              <p>已还款保理业务 <span v-cloak>{{factorCount}}</span>笔</p>
            </li>
            <li>
              <p>已还款逾期 <span v-cloak>{{num}}</span>笔</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-third">
        <!-- 模板开始 -->

        <div class="template-main"  v-for = "item in mainData">
          <div class="template-center" @click="goDetail(item.factorBillId)">
            <p v-cloak> {{item.contractId}} <span>{{item.buildAt}}</span></p>
            <p v-cloak>￥{{item.overdueInterest + item.daihuanNum  + item.factorBillInterest }}   <span>已还清</span></p>
          </div>
        </div>
        <paper :getMsg="paperMsg" @getMore="getMore()"></paper>
      </div>
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
  import paper from '../common/page.vue'
  export default({
    name:"historyBill",
    data(){
      return {
        parentMsg:"历史账单",
        paperMsg:"获取更多",
        mainData:[],
        pageIndex:1,   //页码
        pageSize:10,    //数据条数
        money:"",      //还款金额
        factorCount:""  ,      //保理业务笔数
        num:""        //逾期笔数
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.getInfo()
    },
    methods:{
      getInfo(){
        var that = this;
        var data = {};
        data.backStatus = 1;
        data.page = that.pageIndex;
        data.size = that.pageSize;
        this.$http.post('/api/ws/bp/h5/getCarrierFactorBill',data,{emulateJSON:true}).then(function(res){
          if (res.body.code == 1 ){
            this.mainData = this.mainData.concat(res.body.rows);
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
      goDetail(id){
        this.$router.push({
          name:'detail',
          query: {
            id:id
          }
        })
      },
      getMore(){
        this.pageIndex ++;
        this.getInfo()
      }
    },
    components:{
      goBack,
      loadingNot,
      paper
    }
  })
</script>
<style scoped>
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
    font-size: .57rem;
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
  .template-main{
    width: 100%;
    height: 3rem;
    position: relative;
    background: #fff;
  }
  .template-center{
    position: relative;
    width: 92%;
    padding:0 4%;
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
</style>
