<template>
  <div>
    <goBack :message="parentMsg"></goBack>
    <div class="main-warp">
      <a class="main-center"  href="tel:0571-88888888">
        联系客服
      </a>
    </div>
  </div>
</template>
<script>
  import goBack from '../common/goBack.vue'
  export  default({
    name:"customerService",
    data(){
      return {
          parentMsg:"联系客服"
      }
    },
    mounted(){

    },
    components:{
      goBack
    }
  })

</script>
<style scoped>
  .main-warp{
    margin-top: 2.35rem;
  }
  .main-center{
    width: 7rem;
    height: 2.5rem;
    background: #03A9F4;
    margin: 6rem auto;
    display: block;
    text-align: center;
    line-height: 2.5rem;
    font-size: .7rem;
    color: #ffffff;
    border-radius: 5px;
  }

</style>
