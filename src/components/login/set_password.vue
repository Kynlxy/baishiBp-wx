<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-center">
        <div class="input-div">
            <input class="input-password" v-model="passwordVal" placeholder="请输入您的密码" type="password">
          <div class="right-img" @click="changeType()">
            <template v-if = "showImg == 1">
              <img src="../../assets/images/close.png" alt="">
            </template>
            <template v-if = "showImg == 2">
              <img src="../../assets/images/open.png" alt="">
            </template>
          </div>
        </div>
      <div class="go-login" @click="goLogin()">
        修改密码
      </div>
    </div>
  </div>

</template>
<script>
  import goBack from '../common/goBack.vue'
  export default{
    name:"setPassword",
    data(){
      return{
        parentMsg:'设置密码',
        typeName:"password",
        passwordVal:"",
        showImg:1
      }
    },
    components: {
      goBack:goBack
    },
    mounted (){
      document.body.style.backgroundColor = "#efeff4"
    },
    methods:{
      changeType: function (){
          if (this.showImg == 2){
            document.querySelector(".input-password").setAttribute("type","password");
            this.showImg = 1;
          }else{
            document.querySelector(".input-password").setAttribute("type","text");
            this.showImg = 2;
          }
      },
      goLogin(){
        var that = this;
        var data = {};
        //短信验证码登陆
        if (that.passwordVal.length <= 6){
          that.$layer.toast({
            icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中
            content: '请输入大于6位数的密码',
            time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒
          });
          return false;
        }else{
          data.password = that.passwordVal;
          that.$http.post('/api/ws/bp/h5/move/update/password',data,{emulateJSON:true}).then(function(res){
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
    }
  }
</script>
<style scoped>
  .main-center{
    margin-top: 3.25rem;
  }
  .input-div{
    width: 93%;
    height: 2.25rem;
    margin: .4rem auto 0 auto;
    position: relative;
  }
  .input-div input {
    width: 96%;
    padding-left: 4%;
    height: 2rem;
    margin: 0 auto;
    background: #ffffff;
    font-size: .7rem;
    border-radius: 5px;
    color: #b3b3b3;
  }
  .right-img{
    position: absolute;
    top: .7rem;
    right: 3%;
    width: 1rem;
    height:.5rem;
    background-size: contain;
    cursor: pointer;
  }
  .right-img img {
    width: 100%;
    height: 100%;
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
</style>
