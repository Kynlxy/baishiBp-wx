<template>
  <div class="main-warp">
    <div class="login-logo">
    </div>
    <div class="input-div input-one">
      <input type="text" id="input-phone" placeholder="请输入手机号" v-model="phoneNum" maxlength="11">
    </div>
    <template v-if ="showIf == 1">
      <div class="input-div">
        <input id="code-img" type="text" placeholder="请输入图片验证码" v-model="imgCode">
        <img id="img" :src= "imgUrl" alt="" @click="changeImg">
      </div>
      <div class="input-div">
        <input id="code-input" type="text" placeholder="请输入验证码"  v-model="phoneCode">
        <button id="get-Code" v-cloak @click="checkCode()">{{codeVal}}</button>
      </div>
      <!---->
    </template>
    <template v-if = "showIf == 3">
      <div class="input-div ">
        <input type="password" placeholder="请输入密码" v-model="phonePwd">
      </div>
    </template>
    <!--<template v-if = "showIf == 0">-->
      <!--<div class="go-login" @click="next()">-->
        <!--下一步-->
      <!--</div>-->
    <!--</template>-->
    <template v-if = " showIf == 1 || showIf == 3">
      <div class="go-login" @click="goLogin()">
        登录
      </div>
    </template>
    <router-link to="/forgetPwd"><a class="forget-pwd">忘记密码</a></router-link>
  </div>
</template>
<script>
  import md5 from 'js-md5'      // md5引入
  export default{
    name:"login",
    data(){
      return {
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
    mounted (){
      var that = this;
      this.$layer.close();
      this.phoneNum = this.$main.getCookies("phone");
      this.phonePwd = this.$main.getCookies("pass");
      this.$http.post('/api/wns/app/checklogin').then(function(res) {
        if (res.body.code == 1){
            that.$router.push({ path: '/index'});
        }
      },function (res){

      });
    },
    methods:{
      goSetPwd: function (){
        this.$router.push({ path: '/setpwd' })
      },
      checkCode(){
        var that = this;
        var data = {};
        if (that.codeVal == "获取验证码"){
          if (this.imgCode == ""){
            this.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: '请输入图片验证码',
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
          }else{
            data.mobile = this.phoneNum;
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
      /*倒计时*/
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
      imgUrlGet(){
        var that = this;
        that.$http.get('/api/wns/app/mobile/check/captach').then(function(res){
          if (res.body.code == 1 ){

          }
        },function(res){
        });
      },
      /**
       * 登录
       */
      goLogin(){
        var that = this;
        var data = {};
        //短信验证码登陆
        if (that.showIf == 1){
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
                that.$router.push({ path: '/index'});
                that.$layer.loading('登录中...')
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
        //账号密码登陆的情况
        if (that.showIf == 3 ){
          if (that.$main.isMobile(that.phoneNum)){
              data.userName = that.phoneNum
          }else{
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: '请输入正确的手机号',
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
            return false;
          }
          if (that.phonePwd == ""){
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: '请输入密码',
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
            return false;
          }else{
            data.pass = that.phonePwd;
            data.personType = "person" ;
          }
          that.$http.post('/api/wns/app/login',data,{emulateJSON:true}).then(function(res){
              if (res.body.code == 1 ){
//                getCookies("SESSION",res.body.sid);
//                this.$store.commit('addLogin');
                that.$main.setCookies("phone",that.phoneNum);
                that.$main.setCookies("pass",that.phonePwd);
                that.$router.push({ path: '/index'});
                that.$layer.loading('登录中...')
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
//        console.log(this.$store.state.isLogin)        //console一下获取的登陆状态
//        this.$store.commit('addLogin');              //执行vuex绑定的 成功登陆的方法 让isLogin状态变为true
//        this.$router.push({ path: '/index'})
      },
      //判断是否第一次登陆
//      next(){
//        if (this.$main.isMobile(this.phoneNum)){
//          that.$http.post('/api/wns/app/login',data,{emulateJSON:true}).then(function(res){
//            if (res.body.code == 1 ){
//
//            }else{
//              this.$layer.toast({
//                icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
//                content: res.body.message,
//                time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
//              });
//            }
//          },function(res){
//          });
//        }
//      }
    },
    watch:{
      //测试手机号
      phoneNum(val,oldVal){
        var that = this;
        if (val && val.length == 11){
          if (this.$main.isMobile(val)){
            document.getElementById("input-phone").blur();
            that.$http.get('/api/wns/app/mobile/check?mobile=' + that.phoneNum).then(function(res){
              if (res.body.code == 1 ){
                //已经登陆过
                if (res.body.isActive == 1){
                  that.showIf = 3
                }
                //未登陆过
                if (res.body.isActive == 2){
                  that.showIf = 1;
                  that.imgUrlGet();
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

          }else{
            that.$layer.toast({
              icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
              content: "请输入正确的手机号",
              time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
            });
            that.showIf = 0
          }
        }else{
          that.showIf = 0
        }
      }
    }
  }
</script>
<style scoped>
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
