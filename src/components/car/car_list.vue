<template>
  <div>
    <goBack :message="parentMsg"></goBack>
      <div class="main-warp">
        <div class="main-search">
          <input type="text" placeholder="输入车牌号或ETC卡号查询" v-model="searchVal" @keyup="show($event)">
          <span class="absolute-x" v-if = "searchVal.length > 0" @click="resetVal()"></span>
          <img src="../../assets/images/search.png" alt="" @click="searchCar()">
        </div>
        <template v-if ="mainData.length > 0">
        <!--模板开始-->
        <div class="main-center-div" v-for ="item in mainData">
          <div class="main-center-total" v-cloak>
            {{item.carNo}}
          </div>
          <ul class="main-ul">
            <li>
              <span class="left-sapn">ETC卡</span>
              <span class="right-span" v-cloak>
              {{item.etcCardNo}}
            </span>
            </li>

            <li>
              <span class="left-sapn">业务类型</span>
              <span class="right-span" v-if="item.carBusinessType == 1">快递(共建)</span>
              <span class="right-span" v-if="item.carBusinessType == 2">快递(非共建)</span>
              <span class="right-span" v-if="item.carBusinessType == 3">快运(共建)</span>
              <span class="right-span" v-if="item.carBusinessType == 4">快运(非共建)</span>
              <span class="right-span" v-if="item.carBusinessType == 5">供应链</span>
              <span class="right-span" v-if="item.carBusinessType == 6">智能运力</span>
            </li>
            <li>
              <span class="left-sapn">消费总额(元)</span>
              <span class="right-span" v-cloak>{{priceFormat(item.costTotalNum)}}</span>
            </li>
            <li>
              <span class="left-sapn">记账总额(元)</span>
              <span class="right-span" v-cloak>{{priceFormat(item.collectTotalNum)}}</span>
            </li>
            <li>
              <span class="left-sapn">本月记账总额(元)</span>
              <span class="right-span" v-cloak>{{priceFormat(item.monthCollectTotalNum)}}</span>
            </li>
            <li>
              <span class="left-sapn">还款日</span>
              <span class="right-span" v-cloak>{{item.huanKuanDate}}</span>
            </li>

          </ul>
          <div class="main-center-last">
            <ul>
              <li @click="goConsumptionDetail(item.etcCardId)">消费明细</li>
              <li @click="goAccountingDetails(item.etcCardId)">记账明细</li>
            </ul>
          </div>
        </div>
        <paper :getMsg="paperMsg" @getMore="getMore()"></paper>
        </template>
      </div>
    <template v-if="mainData.length == 0">
      <loadingNot></loadingNot>
    </template>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import loadingNot from '../common/loadingNot.vue'
  import paper from '../common/page.vue'
  export default ({
    name:"carList",
    data(){
      return {
        parentMsg:"车辆列表",
        mainData:[],
        paperMsg:"获取更多",
        pageIndex:1,   //页码
        pageSize:10,   //数据条数
        searchVal:""
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.getInfo();
    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      show: function (ev) {
        if(ev.keyCode == 13){
          this.searchCar()
        }
      },
      getInfo(){
        var that = this;
        var data = {};
        data.page = that.pageIndex;
        data.size = that.pageSize;
        data.colValue = that.searchVal;
        this.$http.post('/api/ws/bp/h5/getCarBillList',data,{emulateJSON:true}).then(function(res){
//          setTimeout( function(){
//            that.$layer.close();
//          },2000);
          if (res.body.code == 1 ){
            this.mainData = this.mainData.concat(res.body.rows);
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
      resetVal(){
        this.searchVal = "";
      },
      goConsumptionDetail(index){
        this.$router.push({
          name:'consumptionDetails',
          query: {
            id:index
          }
        })
      },
      goAccountingDetails(index){
        this.$router.push({
          name:'accountingDetails',
          query: {
            id:index
          }
        })
      },
      getMore(){
        this.pageIndex ++;
        this.getInfo()
      },
      searchCar(){
        var that = this;
        this.pageIndex = 1;
        this.mainData = [];
//        this.$layer.loading("搜索中",setTimeout(function (){
//          that.$layer.close();
//        },2000));
        this.getInfo();
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
    margin-top: 2.35rem;
  }
  .main-search{
    position: relative;
    width: 94%;
    padding: 0 3%;
    padding-top: .25rem;
    height:1.95rem;
    background: #ffffff;
  }
  .main-search input{
    width: 75%;
    height: 1.7rem;
    background: #efeff4;
    margin: 0 auto;
    display: block;
    border-radius: 1rem;
    padding-left: 5%;
    font-size: .6rem;
    line-height: .7rem;
    color: #9E9E9E;
  }
  .absolute-x{
    position: absolute;
    display: block;
    width: .8rem;
    height: .8rem;
    top: .7rem;
    right: 4%;
    cursor: pointer;
    background: url("../../assets/images/cuo.png") no-repeat;
    background-size: cover;
  }
  .main-search img {
    position: absolute;
    display: block;
    width: .8rem;
    height: .8rem;
    top: .7rem;
    right: 17%;
    cursor: pointer;
  }
  .main-center-div{
    position: relative;
    width: 92%;
    height: 12.5rem;
    padding:0 4%;
    background: #ffffff;
    margin-top: .4rem;
  }
  .main-center-total{
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #efeff4;
    font-size: .65rem;
    color: #8d8c8c;
    line-height: 2rem;
  }
  .main-ul{
    width: 100%;
    height: 7.5rem;
    margin: .3rem auto;
    color: #8d8c8c;
    border-bottom: 1px solid #efeff4;
  }
  .main-ul li{
    width: 100%;
    height: 1.2rem;
    overflow: hidden;
    line-height: 1.2rem;
  }
  .left-sapn{
    font-size: .65rem;
    float: left;
  }
  .right-span{
    font-size: .6rem;
    float: right;
  }
  .main-center-last{
    width: 100%;
    height: 2rem;
    font-size: .8rem;
    line-height: 2rem;
    color: #5d95e5;
  }
  .main-center-last ul li{
    width: 50%;
    height: 100%;
    float: left;
    text-align: center;
    cursor: pointer;
  }

</style>
