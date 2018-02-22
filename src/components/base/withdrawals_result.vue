<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <div class="main-center">
        <div class="left-img">
          <img src="../../assets/images/left.png" alt="">
        </div>
        <div class="right-div">
          <p class="total-p">
            提现申请已提交,等待处理
          </p>
          <p v-cloak>{{mainData.zhongxinBank}}({{mainData.zhongxinAccount}})</p>
          <p v-cloak>提现:{{mainData.money}},手续费2.00元</p>
          <p v-cloak>预计到账{{mainData.money - 2}}元</p>
          <p>创建时间:{{mainData.timeH}}</p>

          <p class="last-p">预计3个工作日内到账</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  export default({
    name:"withdrawalsResult",
    data(){
      return{
        parentMsg:'提现结果',
        mainData:""
      }
    },
    mounted(){
      this.$main.checkLogin();
      this.getInfo(this.$route.query.id);

    },
    methods:{
      getInfo(id){
        var that = this;
        this.$http.get("/api/ws/bp/h5/charge/borrower/detail?applyId=" + id).then(function(res){
          if(res.body.code == 1){
            that.mainData = res.body.data;
            setTimeout( function (){
              that.$layer.close()
            },2000)
          }else{
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: res.body.message,
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }
        },function (res){

        })
      }
    },
    components: {
      goBack:goBack
    }

  })
</script>
<style scoped>
  .main-warp{
    margin-top: 2.9rem;
  }
  .main-center{
    width: 96%;
    padding-left: 4%;
    padding-top: .8rem;
    height: 7.7rem;
    background: #ffffff;
  }
  .left-img{
    width: 1rem;
    height: 7rem;
    float: left;
  }
  .left-img img{
    width: 100%;
  }
  .right-div{
    width: 13rem;
    height: 7.5rem;
    float: left;
    padding-left: 5%;
  }
  .right-div .total-p{
    font-size: .7rem;
    color: #2196F3;
  }
  .right-div p{
    margin-bottom: .35rem;
    font-size: .65rem;
    color: #646464;
  }
  .right-div .last-p{
    margin-top: .75rem;
    font-size: .7rem;
    color: #333333;
  }
</style>
