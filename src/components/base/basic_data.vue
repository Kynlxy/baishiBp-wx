<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <div class="main-center">
        <p> <span class="left-span">名称</span> <span class="right-span" style="font-size: .75rem" v-cloak>{{dataInfo.companyName}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">营业执照</span> <span class="right-span"  v-cloak>{{dataInfo.organizationCodeCertificate}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">公司电话</span> <span class="right-span" v-cloak>{{dataInfo.companyTel}}</span> </p>
      </div>
      <div class="main-center" style="margin-bottom: .5rem">
        <p> <span class="left-span">绑定手机</span> <span class="right-span" v-cloak>{{dataInfo.mobile}}</span> </p>
      </div>
      <template v-for = "item in person">
        <div class="main-center" >
          <p v-if="item.personType == 0">
            <span class="left-span">法人</span> <span class="right-span" v-cloak> {{item.trueName}} </span>
          </p>
          <p v-if=" item.personType == 1">
            <span class="left-span">实际控制人</span> <span class="right-span"v-cloak >{{item.trueName}}</span>
          </p>
          <p v-if = "item.personType == 2">
            <span class="left-span">联系人</span> <span class="right-span" v-cloak>{{item.trueName}}</span>
          </p>
        </div>
      </template>

      <!--<div class="main-center">-->
        <!--<p> </p>-->
      <!--</div>-->
      <!--<div class="main-center">-->
        <!--<p> </p>-->
      <!--</div>-->
      <div class="main-center" style="margin-top: .5rem">
        <p> <span class="left-span">银行账户</span> <span class="right-span" v-cloak>{{dataInfo.zhongxinAccount}}</span> </p>
      </div>
      <div class="main-center">
        <p> <span class="left-span">开户行</span> <span class="right-span" v-cloak>{{dataInfo.zhongxinBank}}</span> </p>
      </div>
    </div>
    <goSubmit :submitMsg="submitMsg" @onSubmit="onSubmit"></goSubmit>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  import goSubmit from '../common/goSubmit.vue'
  export default({
    name:"basicData",
    data(){
      return {
        parentMsg:"基本资料",
        dataInfo:"",
        person:"",
        submitMsg:"退出"
      }
    },
    methods:{
      onSubmit(){
        var that = this;
        this.$http.post('/api/wns/app/loginout').then(function(res){
          if (res.body.code == 1 ){
            this.$layer.loading('退出中...');
            setTimeout( function (){
              that.$router.push({ path: '/login'});
            },2000)
          }else{
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: res.body.message,
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }
        },function(res){
        });
      }
    },
    mounted(){
      this.$main.checkLogin();
      var that = this;
      this.$http.get('/api/ws/bp/h5/uinfo').then(function(res){
        if (res.body.code == 1 ){
          that.dataInfo = res.body.rows[0];
        }else{
          that.$layer.toast({
            icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
            content: res.body.message,
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          });
        }
      },function(res){
      });
      this.$http.get('/api/ws/bp/h5/uinfo/person').then(function(res){
        if (res.body.code == 1 ){
          that.person = res.body.data;
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
    components:{
      goBack,
      goSubmit
    },
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
</style>
