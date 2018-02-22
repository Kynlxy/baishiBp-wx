<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <template v-if = "mainShowData.length > 0">
      <div class="main-warp">
        <div class="main-template-begin" v-for = "item in mainData">
          <div class="main-center" v-cloak>
            {{item.year}}
          </div>
          <div class="main-template" v-for =" items in item.data">
            <div class="main-center-show" @click="goDetail(items.isFinished,items.etcCardId,items.billYear,items.billMonth)">
              <p v-cloak>{{items.billMonth}}月记账</p>
              <p v-cloak>￥{{priceFormat(items.billNum)}}</p>
              <div class="right-div">
                <span class="blue" v-if = "items.isFinished == 1">已还清</span>
                <span class="red" v-if = "items.isFinished == 0">未还清</span>
                <img src="../../assets/images/white-png.png" alt="">
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
    <template v-if = "mainShowData.length == 0">
      <loadingNot></loadingNot>
    </template>
  </div>

</template>
<script>
  import goBack from '../common/goBack.vue'
  import loadingNot from '../common/loadingNot.vue'
  export default({
  name:"accountingDetails",
  data(){
    return{
      parentMsg:"记账明细",
      id:"",
      mainData:"",  //数据存放处
      mainShowData:""
    }
  },
  methods:{
    priceFormat:function (_num) {
      return this.$main.priceFormat(_num);
    },
    getInfo(){
      var that = this;
      var data = {};
      data.id = that.id;
      this.$http.post('/api/ws/bp/h5/getCarAllCollectBills',data,{emulateJSON:true}).then(function(res){
        if (res.body.code == 1 ){
          this.mainData = res.body.data;
          this.mainShowData = res.body.data[0].data;
          console.log(this.mainShowData);
          setTimeout( function (){
            that.$layer.close()
          },2000);
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
    goDetail(index,id,year,month){
      if (index == 0){
        this.$router.push({
          name:'monthlyNoAccountingDetail',
          query: {
            id:id,
            year:year,
            month:month
          }
        })
      }else{
        this.$router.push({
          name:'monthlyYesAccountingDetail',
          query: {
            id:id,
            year:year,
            month:month
          }
        })
      }
    }
  },
  mounted(){
    this.$main.checkLogin();
    this.id = this.$route.query.id;
    this.getInfo()
  },
  components:{
    goBack,
    loadingNot
  }
})
</script>
<style scoped>
  .main-warp{
    margin-top: 2.25rem;
  }
  .main-center{
    width: 92%;
    height: 2.25rem;
    padding: 0 4%;
    line-height: 2.25rem;
    font-size: .65rem;
  }
  .main-template{
    position: relative;
    width: 100%;
    height: 2.51rem;
    background: #ffffff;
    color: #8d8c8c;
  }
  .main-center-show{
    width: 96%;
    height: 1.96rem;
    padding: 0 0 0 4%;
    padding-top: .5rem;
    font-size: .65rem;
    background: #ffffff;
    border-bottom: 1px solid #efeff4;
  }
  .main-center-show p{
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
  .red{
    color: #da3030;
  }
  .blue{
    color: #03A9F4;
  }

</style>
