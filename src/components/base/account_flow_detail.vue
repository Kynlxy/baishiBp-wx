<template>
  <div>
    <goBack :message="parentsMsg"></goBack>
    <div class="main-warp">
      <div class="main-center">
        <p> <span class="left-span">金额</span> <span class="right-span" style="font-size: .75rem" v-cloak>{{this.$main.priceFormat(mainData.money)}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">类型</span>
          <span class="right-span" v-if = "mainData.direction == 'I'">收入</span>
          <span class="right-span" v-else>支出</span>
        </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">时间</span> <span class="right-span" v-cloak>{{mainData.timeH}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">交易单号</span> <span class="right-span" v-cloak>{{mainData.flowid}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">账户余额(元)</span> <span class="right-span" v-cloak>{{mainData.balanceAfter}}</span> </p>
      </div>
      <div class="main-center" id="last-div">
        <div class="left-div">
          <p>备注</p>
        </div>
        <div class="right-div">
          {{mainData.note}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  export default({
    name:"accountFlowDetail",
    data(){
      return{
        parentsMsg:"账户流水记录",
        mainData:""
      }
    },
    methods:{
      getInfo(id){
        var data = {};
        data.fid = id;
        this.$http.get("/api/ws/bp/h5/user/money/serial/list?fid=" + data.fid).then( function (res){
          if (res.body.code == 1){
            this.mainData = res.body.rows[0]
          }
        },function (res){
        })
      }
    },
    mounted: function (){
      this.$main.checkLogin();

      console.log(this.$route.query.id);
      this.getInfo(this.$route.query.id)
    },
    components:{
      goBack : goBack
    }
  })

</script>
<style scoped>
.main-warp{
  margin-top: 2.25rem;
}
.main-center{
  width: 94%;
  height: 2rem;
  padding: 0 3%;
  background: #ffffff;
  border-top:1px solid #dbdbdb ;
}
  .left-span{
    float: left;
    color: #646464;
  }
  .right-span{
    float: right;
    color: #6A6A6A;
  }
  .main-center{
    line-height: 2rem;
    font-size: .65rem;
  }
  #last-div{
    margin-top: .5rem;
    width: 94%;
    padding: 0 3%;
    height: 4rem;
    line-height: .7rem;
    font-size: .65rem;
  }
  .left-div{
    width: 20%;
    float: left;
    height: 4rem;
    line-height: 4rem;
  }
  .right-div{
    padding: .5rem 0;
    width: 80%;
    float: left;
    height: 3rem;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
