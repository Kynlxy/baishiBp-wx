<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <!-- 模板开始-->
      <template v-if ="mainData.length > 0">
        <div v-for ="(item,index) in mainData">
          <div class="line-div" @click="readMsg(item.id,index)">
            <div class="line-main">
              <div class="left-div" v-if = "item.status == 1">
              </div>
              <div class="left-div-2" v-if = "item.status == 2">

              </div>
              <div class="center-div">
                <p v-cloak>{{item.newsTitle}}</p>
              </div>
              <div class="showMsg" style="display: none" v-show="item.showIf == 2">
                {{item.newsContent}}
              </div>
              <div class="right-div">
                <p>
                  <img src="../../assets/images/down.png" alt="" v-show="item.showIf == 1">
                  <img src="../../assets/images/up.png" alt="" v-show="item.showIf == 2">
                </p>
              </div>
            </div>
          </div>
        </div>
        <paper :getMsg="paperMsg" @getMore="getMore()"></paper>
      </template>
      <template v-else>
        <loadingNot></loadingNot>
      </template>
    </div>
  </div>
</template>
<script>
  import goBack from "../common/goBack.vue"
  import loadingNot from "../common/loadingNot.vue"
  import paper from '../common/page.vue'
  export default({
    name:"messageNotification",
    data(){
      return {
        parentMsg:"消息通知",
        mainData:[],
        parentsMsg:"账户流水记录",
        paperMsg:"获取更多",
        pageIndex:1,
        pageSize:5
      }
    },
    components:{
      goBack,
      loadingNot,
      paper
    },
    mounted(){
      this.$main.checkLogin();
      this.getInfo();
    },
    methods:{
      getInfo(){
        var that = this;
        var data = {};
        data.page = that.pageIndex;
        data.size = that.pageSize;
        this.$http.post('/api/ws/bp/h5/smsInside/list',data,{emulateJSON:true}).then(function(res){
          if (res.body.code == 1 ){
            var arr = [];
            for (var i = 0 ,$length = res.body.rows.length; i < $length; i++){
              res.body.rows[i].showIf = 1;
              arr.push(res.body.rows[i])
            }
            that.mainData =that.mainData.concat(arr);
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
      readMsg(id,index){
        var that = this;
        var data = {};
        data.id = id;
        if (that.mainData[index].showIf == 1){
          that.mainData[index].showIf = 2;
        }else{
          that.mainData[index].showIf = 1;
        }
        that.mainData[index].status = 2;
        this.$http.post('/api/ws/bp/h5/smsInside/detail',data,{emulateJSON:true}).then(function(res){
          if (res.body.code == 1 ){
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
      getMore(){
        this.pageIndex ++;
        this.getInfo()
      }
    }
  })

</script>
<style scoped>
  .main-warp{
    margin-top: 2.35rem;
  }
  .line-div{
    width: 100%;
    height: auto;
    background: #ffffff;
  }
  .line-main{
    position: relative;
    width: 94%;
    height: auto;
    margin: 0 auto;
    border-bottom: 1px solid #efeff4;
  }
  .left-div{
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
    background: #48a9ed;
    position: absolute;
    top: .5rem;
  }
  .left-div-2{
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
    background: #efeff4;
    position: absolute;
    top: .5rem;
  }
  .center-div{
    padding-left: 4%;
    padding-top: .3rem;
    font-size: 0.6rem;
    color: #878787;
    line-height: .7rem;
    height: 1.5rem;
  }
  .right-div{
    position: absolute;
    right: 0;
    top: .5rem;
    font-size: .65rem;
    color: #03A9F4;
  }
  .right-div img {
    width: .7rem;
    margin-top: .2rem;
  }
  .showMsg{
    width: 92%;
    padding: .2rem 4%;
    height: 3rem;
    line-height: .7rem;
    font-size: .6rem;
    overflow: hidden;
    overflow-y: scroll;
    border-top: 1px solid #efeff4;
    color: #878787;
  }




</style>
