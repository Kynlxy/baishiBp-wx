<template>
  <div>
    <goBack :message="parentsMsg"></goBack>
    <div class="main-warp">
      <div class="main-center">
        <div class="top-div">
          <!--<p>2017年1月</p>-->
          <div class="relative-dateTime">
            {{dateTime}}
            <span class="relative-div" id="demo2" data-lcalendar="2000-01-11,2020-12-29" @click="showDateTime()"
                  readOnly="readOnly">
              </span>
            <input class="relative-div" id="demo1" data-lcalendar="2000-01-11,2020-12-29" v-model="dateTime"
                   readOnly="readOnly" style="display: none">
          </div>

          <!--</input>-->
        </div>
          <div class="center-div">
            <p class="top-p">消费总额(元)</p>
            <p class="center-p" v-cloak>{{priceFormat(costTotalNum)}}</p>
            <p class="last-p">消费笔数{{costTotalCount}}笔</p>
          </div>
        <template v-if="mainData.length > 0">
        <template v-for="(item,index) in mainData">
            <div class="border-bottom-div">
              <div class="top-div car-detail">
                <div class="div-border"></div>
                <p v-cloak style="margin-left: 5%;">{{item.day}}日</p>
                <div class="right-div" @click="changeShowIf(index)">
                  <p v-cloak style="text-align: right;margin-right: 10%">总消费{{priceFormat(item.dayCostTotalNum)}}元
                    <img style="transform: rotate(90deg);right: 0;position: absolute;" src="../../assets/images/up.png" alt="" v-if="item.showIf == 0">
                    <img style="transform: rotate(180deg);right: 0;position: absolute;" src="../../assets/images/up.png" alt="" v-else>
                  </p>
                </div>
              </div>
              <!--模板-->
              <div v-show="item.showIf == 1">
                <template v-for="items in item.rows">
                  <div class="template-main" @click="goRouteDetail(items)">
                    <div class="template-center" style="position: relative">
                      <p v-cloak>[ETC]{{items.cardNum}}<span
                        style="position: absolute;left: 22%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 43%;">{{items.chargingIn}}|{{items.chargingOut}}</span>
                      </p>
                      <!--<p>2017/10/21  <span>07:10:12</span></p>-->
                      <p v-cloak>{{items.costTime}}</p>
                      <div class="right-div template-right-div" v-cloak>
                        {{priceFormat(items.costNum)}}
                        <img src="../../assets/images/white-png.png" alt="">
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </template>
      </div>
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
  import css from '../../assets/css/calendar.css'
  export default({
    name: "consumptionDetails",
    data(){
      return {
        parentsMsg: "消费明细",
        mainData: "",        //总数据存放处
        costTotalNum: "",   //  总额
        costTotalCount: "",  // 笔数
//        dayCostTotalNum: "", //单日金额
        id: "",
        dateTime: "",
        pageIndex: 1,    //页码
        pageSize: 10     //条数
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.id = this.$route.query.id;
//      this.dateTime = this.$main.curentTime().substring(0, 7);
      this.dateTime = this.$main.getCookies("searchCarTime")? this.$main.getCookies("searchCarTime") : this.$main.curentTime().substring(0,7);

      this.getInfo();
      var calendar = new lCalendar();
      calendar.init({
        'trigger': 'demo1',
        'type': 'month'
      });
    },
    methods: {
      priceFormat: function (_num) {
        return this.$main.priceFormat(_num);
      },
      goRouteDetail(item){
        this.$router.push({
          name: 'consumptionDetailSecond',
          query: {
            id: encodeURIComponent(JSON.stringify(item))
          }
        })
      },
      showDateTime(){
        document.getElementById("demo1").click();
      },
      changeShowIf(index){
        if (this.mainData[index].showIf == 0){
          this.mainData[index].showIf = 1
        }else{
          this.mainData[index].showIf = 0
        }
      },
      getInfo(){
        var that = this;
        var data = {};
        data.collectBillDate = this.dateTime;
        data.id = that.id;
        data.page = that.pageIndex;
        data.size = that.pageSize;
        this.$http.post('/api/ws/bp/h5/getEtcCardBillList', data, {emulateJSON: true}).then(function (res) {
          if (res.body.code == 1) {
            var arrs = [];
            for (var i = 0, $length = res.body.data.days.length; i < $length; i++) {
              res.body.data.days[i].showIf = 0;
              arrs.push(res.body.data.days[i]);
            }
            that.mainData = arrs;
            that.costTotalNum = res.body.costTotalNum;
            that.costTotalCount = res.body.costTotalCount;
            this.$main.setCookies('searchCarTime',that.dateTime);
            if (res.body.data.days && res.body.data.days.length > 0){
              that.parentsMsg = res.body.data.days[0].rows[0].carPlateNumber + "消费明细";
            }
            setTimeout(function () {
              that.$layer.close()
            }, 2000);
          } else {
            this.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: res.body.message,
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }
        }, function (res) {
        });
      }
    },

    components: {
      goBack,
      loadingNot,
      paper
    },
    watch: {
      dateTime(val, oldVal){
        if (val != oldVal && oldVal != "") {
          this.getInfo();
          this.$layer.loading("正在搜索中")
        }
      }
    }
  })
</script>
<style scoped>
  .main-warp {
    margin-top: 2.5rem;
  }

  .main-center {
    width: 100%;
  }

  .top-div {
    position: relative;
    width: 96%;
    padding-left: 4%;
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: .65rem;
    color: #646464;
  }

  .relative-dateTime {
    position: relative;
    width: 100%;
    height: 2.25rem;
  }

  .relative-div {
    position: absolute;
    top: .5rem;
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

  .center-div {
    width: 92%;
    padding: 0 4%;
    padding: .75rem;
    height: 4rem;
    background: #ffffff;
  }

  .center-div p {
    margin-bottom: .5rem;
  }

  .top-p {
    font-size: .7rem;
    color: #8d8c8c;
  }

  .center-p {
    font-size: .9rem;
    color: #ec723c;
  }

  .last-p {
    font-size: .8rem;
    color: #333333;
    margin-top: .7rem;
  }

  .car-detail p {
    margin-left: 10%;
    font-size: .65rem;
    text-align: left;
  }

  .div-border {
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
    background: #48a9ed;
    position: absolute;
    top: .9rem;
  }

  .right-div {
    position: absolute;
    right: 4%;
    width: 96%;
    height: 2.25rem;
    top: 0;
    text-align: right;
    font-size: .65rem;
  }

  .right-div img {
    width: .8rem;
    margin-top: .9rem;
  }

  .template-main {
    width: 100%;
    height: 3rem;
    position: relative;
    background: #fff;
  }

  .template-center {
    position: relative;
    width: 96%;
    margin-left: 4%;
    padding-top: .3rem;
    height: 2.66rem;
    border-bottom: 1px solid #efeff4;
  }

  .template-center p {
    font-size: .55rem;
    margin-top: .3rem;
    color: #8d8c8c;
  }

  .template-center p span {
    margin-left: 10%;
  }

  .template-right-div {
    line-height: 2.8rem;
    font-size: .7rem;
    color: #8d8c8c;
  }

  .template-right-div img {
    height: .65rem;
    width: .5rem;
    margin-top: 1.05rem;
  }

  .month {
    width: 14rem;
    padding-left: .5rem;
    height: 100%;
    background: #ffffff;
    outline: none;
    border-radius: 5px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="month"] {
    -moz-appearance: textfield;
  }

  input::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 2rem;
    z-index: 11111111;
  }
  .border-bottom-div{
    border-bottom: 1px solid #ece1cd;
  }


</style>
