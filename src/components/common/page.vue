<template>
  <div class="pager" @click="getMore">
    {{getMsg}}
  </div>
</template>
<script>
  export default{
    name: "paper",
    props: {
      getMsg: String  //定义传值的类型<br>
    },
    data(){
      return {

      }
    },
    methods:{
      getMore: function (){
        this.$emit('getMore')
      }
    }
  }
</script>
<style scoped>
  .pager {
    width: 80%;
    text-align: center;
    margin: 1rem auto;
    font-size: 14px;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #666666;
    border-radius: 50px;
    border: 1px solid #CCCCCC;
    background: #fff;
    cursor: pointer;
  }
</style>
