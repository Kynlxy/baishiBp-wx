<template>
  <div>
    <div class="main-warp">
      <goBack :message="parentMsg">

      </goBack>
      <div class="input-div input-one">
        <input type="text" id="input-phone" placeholder="请输入手机号" v-model="phoneNum" maxlength="11">
      </div>
        <div class="input-div">
          <input id="code-img" type="text" placeholder="请输入图片验证码" v-model="imgCode">
          <img id="img" :src= "imgUrl" alt="" @click="changeImg">
        </div>
        <div class="input-div">
          <input id="code-input" type="text" placeholder="请输入验证码"  v-model="phoneCode">
          <button id="get-Code" v-cloak @click="checkCode()">{{codeVal}}</button>
        </div>
      <div class="go-login" @click="goLogin()">
        下一步
      </div>
    </div>


  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  export default{
    name:"forgetPwd",
    data(){
      return{
        parentMsg:"忘记密码",
        showIf : 0,      //一开始是0  是否是第一次登陆 是的话就去3账号密码登陆   不是第一次登陆的话 去 1 短信验证码登陆
        phoneNum:"",    //手机号
        phonePwd:"",    //手机号密码
        imgCode:"" ,    //图片验证码
        phoneCode:"",   //手机验证码
        codeVal:"获取验证码", //获取验证码 按钮文字存放处,
        isSend:false,     //是否点击获取验验证码
        time:60,
        imgUrl:"/api/wns/app/mobile/check/captach"
      }
    },
    methods:{
      timeLimit(){
        var that = this;
        if(this.time == 0)
        {
          this.time = 60;
//          this.isSend = false;
          this.codeVal = "获取验证码";
        }else{
          this.time--;
          this.isSend = true;
          this.codeVal = "已发送("+this.time+"s)";
          setTimeout(function(){
            that.timeLimit();
          },1000);
        }
      },
      checkCode(){
        var that = this;
        var data = {};
        if (that.$main.isMobile(that.phoneNum)){
          data.mobile = this.phoneNum;
        }else{
          this.$layer.toast({
            icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
            content: '请输入正确的手机号',
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          });
          return false;
        }
        if (that.codeVal == "获取验证码"){
          if (this.imgCode == ""){
            this.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: '请输入图片验证码',
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }else{
            data.captach = this.imgCode;
            //验证短信验证码是否正确
            this.$http.post('/api/wns/app/mobile/check/sendcode',data,{emulateJSON:true}).then(function(res){
              if (res.body.code == 1 ){
                this.$layer.toast({
                  icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
                  content: res.body.message,
                  time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
                });
                that.timeLimit();
              }else{
                this.changeImg();
                this.$layer.toast({
                  icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
                  content: res.body.message,
                  time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
                });
              }
            },function(res){
            });
          }
        }
      },
      changeImg(){
        var that = this;
        that.imgUrl = that.imgUrl + "?=1"
      },
      goLogin(){
        var that = this;
        var data = {};
        //短信验证码登陆
          if (that.isSend == false){
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: '请先获取手机验证码',
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
            return false;
          }
          if (that.phoneCode == ""){
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: '请先输入验证码',
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
            return false;
          }else{
            data.userName = that.phoneNum;
            data.pass = that.phoneCode;
            data.mcl = 1;
            that.$http.post('/api/wns/app/login',data,{emulateJSON:true}).then(function(res){
              if (res.body.code == 1 ){
                that.$router.push({ path: '/setPwd'});
//                that.$layer.loading('登录中...')
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
        }
    },
    components: {
      goBack:goBack
    },
    mounted (){
      document.body.style.backgroundColor = "#efeff4";
    }
//    beforeDestroy: function () {
//      document.body.style.backgroundColor = "#ffffff"
//    },
  }
</script>
<style scoped>
  .main-warp{
    margin-top: 3rem;
  }
  .login-logo{
    width: 6.25rem;
    height:2.5rem ;
    margin: 0 auto;
    margin-top: 6.5rem;
    background: url(../../assets/images/logo.png) no-repeat;
    background-size: contain;
  }
  .input-div{
    width: 93%;
    height: 2.75rem;
    margin: .4rem auto 0 auto;
  }
  .input-div input {
    width: 96%;
    padding-left: 4%;
    height: 2.5rem;
    margin: 0 auto;
    background: #ffffff;
    font-size: .75rem;
    border-radius: 5px;
    color: #918f8f;
  }
  .input-one{
    margin-top: 2.25rem;
  }
  .set-password, .go-login{
    width: 93%;
    height: 2.25rem;
    margin: .5rem auto 0 auto;
    background: #314358;
    font-size: .7rem;
    text-align: center;
    line-height: 2.25rem;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
  }
  .go-login :active{
    background: #446081;

  }
  .set-password:active{
    background: #446081;

  }
  #code-input{
    width: 55%;
  }
  #img-code,#get-Code{
    width: 38%;
    height: 2.5rem;
    border-radius: 5px;
    margin-left: 2%;
    line-height: 2rem;
    font-size: .7rem;
    text-align: center;
    border: 1px solid #5d95e5;
    color: #5d95e5;
    background: #ffffff;
    float: right;
  }
  #code-img{
    width: 55%;
  }
  .forget-pwd{
    float: right;
    margin-right: 8%;
    margin-top: .8rem;
    font-size: .75rem;
    color: #5d95e5;
  }
  #img{
    width: 36%;
    height: 2.5rem;
    margin-left: 3%;
    cursor: pointer;
  }
</style>
