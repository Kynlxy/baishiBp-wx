<template>
    <div class="goSubmit" @click="goFunction">
      {{submitMsg}}
    </div>
</template>
<script>
  export default{
    name: "goSubmit",
    props: {
      submitMsg: String  //定义传值的类型<br>
    },
    data(){
      return {}
    },
    methods:{
      goFunction: function (){
        this.$emit('onSubmit')
      }
    }
  }
</script>
<style scoped>
.goSubmit{
  position: fixed;
  height: 2.25rem;
  width: 100%;
  background: #5d95e5;
  line-height: 2.25rem;
  font-size: .7rem;
  color: #ffffff;
  text-align: center;
  bottom: 0;
  z-index: 111111;
  cursor: pointer;
}
.goSubmit:active{
  background: #4972E5;
}
</style>
