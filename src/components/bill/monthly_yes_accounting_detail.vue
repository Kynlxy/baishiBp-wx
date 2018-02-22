<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <template v-if = "mainArr.length > 0">
      <div class="main-warp">
        <div class="main-total-font">
          记账金额不包含利息
        </div>
        <div class="main-center-top">
          <p><img src="../../assets/images/zan.png" alt="">本月账单已还清!</p>
        </div>
        <div class="main-center-div">
          <div class="span-div">
            <span class="left-span">本月还款金额</span> <span class="right-span">还款时间</span>
          </div>
          <div class="span-div">
            <span class="left-span big-font" v-cloak>{{this.$main.priceFormat(mainData.yihuanNum)}}</span>  <span class="right-span" v-cloak>{{mainData.billHuankuanDate}}</span>
          </div>
        </div>
        <!--模板开始-->
        <div class="template-div" v-for =" item in mainArr">
          <div class="template-main-show" @click="goDetail(item.etcCardId,item.collectBillDate)">
            <p v-cloak>消费:{{priceFormat(item.costNum)}}</p>
            <p v-cloak>{{item.collectBillDate}}</p>
            <div class="right-div">
              <span class="red" v-cloak>{{priceFormat(item.collectBillInterest)}}</span>
              <img src="../../assets/images/rightBack.png" alt="">
            </div>
          </div>
        </div>
        <paper :getMsg="paperMsg" @getMore="getMore()"></paper>
      </div>
    </template>
    <template v-if = "mainArr.length == 0">
      <loadingNot></loadingNot>
    </template>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import loadingNot from '../common/loadingNot.vue'
  import paper from '../common/page.vue'

  export default({
    name:"monthlyYesAccountingDetail",
    data(){
      return {
        parentMsg:"已还账单",
        mainData:"",
        mainArr:[],
        id:"",
        paperMsg:"获取更多",
        pageIndex:1,   //页码
        pageSize:10   //数据条数
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.id = this.$route.query.id;


      this.getInfo();

    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      getInfo(){
        var data = {};
        data.monthBillId = this.id;
//        data.monthBillId = 5;
        data.page = this.pageIndex;
        data.size = this.pageSize;
        var that = this;
        this.$http.post('/api/ws/bp/h5/getCarrierMonthBill',data,{emulateJSON:true}).then(function(res){
          if (res.body.code == 1 ){
            this.parentMsg = res.body.rows[0].billPeriodYear + "年" + res.body.rows[0].billPeriodMonth + '账单详情';
            this.mainData = res.body.rows[0];
            this.mainArr = this.mainArr.concat(res.body.rows[0].carrierCarBills)
            if(this.pageIndex * this.pageSize > res.body.total){
              this.paperMsg = "已全部加载";
              that.$layer.toast({
                icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
                content: '已全部加载',
                time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
              });
            }
          }else{
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: res.body.message,
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }
        },function(res){
        });
      },
      goDetail(id,date){
        this.$router.push({
          name:'dayAccountDetail',
          query: {
            id:id,
            date:date
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
    margin-top: 2.25rem;
  }
  .main-total-font{
    width: 100%;
    height:1.5rem;
    background: #da3030;
    margin-bottom: .5rem;
    line-height: 1.5rem;
    text-align: center;
    color: #ffffff;
    font-size: .6rem;
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
    height: .65rem;
    width: .5rem;
    margin-top: .95rem;
  }
</style>
