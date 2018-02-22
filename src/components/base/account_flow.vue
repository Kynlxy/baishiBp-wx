<template>
  <div>
    <goBack :message="parentsMsg"></goBack>

    <div class="main-warp" >
      <div class="top-div">
        <!--<p>2017年1月</p>-->
        <div class="relative-dateTime">
          {{dateTime}}
          <span class="relative-div" id="demo2" data-lcalendar="2000-01-11,2020-12-29" @click="showDateTime()" readOnly =  "readOnly">
              </span>
          <input class="relative-div" id="demo1" data-lcalendar="2000-01-11,2020-12-29" v-model="dateTime" readOnly =  "readOnly" style="display: none">
        </div>
        <!--</input>-->
      </div>
      <div class="top-show">
        <p class="firstP"><span class="left-span" v-cloak style="color: #ec723c;">+{{priceFormat(SerialI)}}</span>  <span class="right-span" style="    color: rgb(95, 160, 236);" v-cloak>-{{priceFormat(SerialO)}}</span></p>
        <p classs="bottomP">
          <span class="left-span">收入</span>  <span class="right-span">支出</span>
        </p>
      </div>
      <div class="main-center" v-if="dataMain.length > 0">
        <!--模板开始-->

        <template v-for = "(item,index) in dataMain">

          <div class="main-total" @click="goRouter(item.fid)">

            <!--<p class="total-p" v-cloak v-if= " item.direction == 'I' ">收入</p>-->
            <!--<p class="total-p" v-cloak v-else>支出</p>-->
            <p class="total-p" v-cloak >{{item.content}}</p>

            <p class="second-p" v-cloak>{{item.timeH}}</p>

            <div class="right-total-span" v-cloak v-if=" item.direction == I ">
              + {{priceFormat(item.money)}}
            </div>
            <div class="right-total-span" v-cloak v-else >
              - {{priceFormat(item.money)}}
            </div>
          </div>
        </template>
        <template v-if="total > 5">
          <paper :getMsg="paperMsg" @getMore="getMore()"></paper>
        </template>
      </div>
      <div v-else>
        <loadingNot></loadingNot>
      </div>
    </div>

  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import paper from '../common/page.vue'
  import loadingNot from '../common/loadingNot.vue'
  import css from '../../assets/css/calendar.css'

  export default({
    name:"accountFlow",
    data(){
      return {
        paperMsg:"获取更多",
        parentsMsg:"账户流水记录",
        dataMain:[],
        itemData:"",
        I:"I",
        dateTime:"",
        pageIndex:1,
        pageSize:5,
        SerialI:0,
        SerialO:0,
        total:0
      }
    },
    components: {
      goBack,
      paper,
      loadingNot
    },
    mounted: function (){
      this.$main.checkLogin();
      this.dateTime = this.$main.getCookies("searchTime")? this.$main.getCookies("searchTime") : this.$main.curentTime().substring(0,7);
//      this.dateTime = this.$main.curentTime().substring(0,7);
      this.getInfo();
      this.searchDate();
      var calendar = new lCalendar();
      calendar.init({
        'trigger': 'demo1',
        'type': 'month'
      });
    },
    methods:{
      priceFormat:function (_num) {
        return this.$main.priceFormat(_num);
      },
      searchDate(){
        this.$http.get("/api/ws/bp/h5//user/money/serial/IO?timeHlike="+ this.dateTime).then( function (res){
          if (res.body.code == 1){
            this.SerialI =  res.body.SerialI;
            this.SerialO = res.body.SerialO;
          }
        },function (res){

        });
      },
      showDateTime(){
        document.getElementById("demo1").click();
      },
      getInfo(){
        var data = {};
        var that = this;
        data.page = that.pageIndex;
        data.size = that.pageSize;
        this.$http.get("/api/ws/bp/h5/user/money/serial/list?page="+ that.pageIndex + "&size=" + that.pageSize +"&timeHlike="+ that.dateTime ).then( function (res){
          if (res.body.code == 1){
            this.paperMsg = "获取更多";
            this.dataMain = this.dataMain.concat(res.body.rows);
            this.$main.setCookies('searchTime',that.dateTime);
            this.total = res.body.total;
            if(this.pageIndex * this.pageSize > res.body.total){
              this.paperMsg = "已全部加载";
              that.$layer.toast({
                icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
                content: '已全部加载',
                time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
              });
            }
          }
        },function (res){

        })
      },
      getMore(){
        this.pageIndex ++;
        this.getInfo()
      },
      goRouter(id){
        var that = this;
//        this.itemData = encodeURIComponent(JSON.stringify(item))
//        encodeURIComponent(JSON.stringify(this.dataMain[index]));

        this.$router.push({
          name:'accountFlowDetail',
          query: {
           id:id
           }
        })
      }
    },
    watch:{
      dateTime(val,oldVal){
        if (val != oldVal && oldVal != ""){
          this.searchDate();
          this.dataMain = [];
          this.getInfo();

        }
      }
    }
  })

</script>
<style scoped>
.main-warp{
  margin-top: 2.25rem;
}
  .main-center{
    width: 100%;
    padding-top: .3rem;
  }
  .top-div{
    position: relative;
    width: 96%;
    padding-left: 4%;
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: .65rem;
    color: #646464;
  }
  .absolute-div{
    position: absolute;
    right: 5%;
    top:.5rem;
    width: 1.1rem;
    height: 1.1rem;
    cursor: pointer;
    background: url(../../assets/images/data.png) no-repeat;
    background-size: contain;
  }
  .main-center-div{
    width: 100%;
    height: auto;
    background: #ffffff;
  }
  .main-total{
    position: relative;
    width: 90%;
    background: #ffffff;
    padding:0 5%;
    height: 3rem;
    border-bottom: 1px solid #dbdbdb;
    cursor: pointer;
  }
  .main-center-first{
    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: .75rem;
  }
  .red{
    color: #f44336;
    float: left;
  }
  .blue{
    color: #03A9F4;
    float: right;
  }
  .main-center-last span{
    font-size: .6rem;
    color: #646464;
  }
  .left-span{
    float: left;
  }
  .right-span{
    float: right;
  }
  .total-p{
    padding-top: .6rem;
    font-size: .7rem;
    font-weight: bold;
    margin-bottom: .5rem;
  }
  .second-p{
    font-size: .6rem;
    color:#646464 ;
  }
  .right-total-span{
    position: absolute;
    top: 0;
    right: 5%;
    width: 40%;
    height: 3rem;
    line-height: 3rem;
    font-size: .65rem;
    text-align: right;
  }
.relative-dateTime{
  position: relative;
  width: 100%;
  height: 2.25rem;
}
.relative-div{
  position: absolute;
  top:.5rem;
  right: 1%;
  width: 0rem;
  height: 1.1rem;
  cursor: pointer;
  background: url(../../assets/images/data.png) no-repeat;
  background-size: contain;
  left: 88%;
  padding-left: 1.1rem;
  overflow: hidden;
  font-size: 10rem;
}
  .date_roll>div:nth-child(1) {
    -webkit-box-flex: 2!important;
  }
  .top-show{
    width: 92%;
    padding: 0 4%;
    height: 3rem;
    background: #ffffff;
  }
  .top-show .firstP{
    padding-top: .4rem;
    font-size: .75rem;
    overflow: hidden;
    margin-bottom: .65rem;
  }
  .top-show .bottomP{
    overflow: hidden;
    color: #bcbcbc;
    font-size: .7rem;
  }

</style>
