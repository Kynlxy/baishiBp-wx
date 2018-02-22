<template>
  <div id="swiper" v-if ="backgroundImg.length > 0">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide img-Show" v-for =" (item,index) in backgroundImg">
          <a :href="backgroundImg[index].url">
            <img :src="backgroundImg[index].imgUrl" alt="">
          </a>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
  export default({
    name:"swiperImg",
    data(){
      return {
        backgroundImg:[]
      }
    },
    mounted(){
      var that = this;
      this.$http.post('/api/ws/bp/h5/banner/list').then(function(res){
        if (res.body.code == 1 ){
          var arr = [];
          for (var i = 0 , $length = res.body.rows.length ; i < $length ; i ++){
            res.body.rows[i].imgUrl = "/api/wns/file/base/get?fid=" + res.body.rows[i].fid + "&style=origin";
            arr.push(res.body.rows[i])
          }
          that.backgroundImg = arr;
          console.log(that.backgroundImg)
          setTimeout( function (){
            var swiper = new Swiper('.swiper-container', {
              pagination: '.swiper-pagination',
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev',
              paginationClickable: true,
//        spaceBetween: 30,
              centeredSlides: true,
              autoplay: 4000,
              autoplayDisableOnInteraction: false,
//              loop: true,
              observer: true,//修改swiper自己或子元素时，自动初始化swiper
              observeParents: true//修改swiper的父元素时，自动初始化swiper
            });
          })
        }else{

        }
      },function(res){
      });

    },
    methods:{
    }
  })
</script>
<style scoped>
  #swiper{
    width: 100%;
    height: 6.5rem;
    position: relative;
    margin-bottom: .5rem;
  }
  .img-Show{
    width: 100%;
    height: 6.5rem;
  }
  .img-Show img{
    width: 100%;
    height: 100%;
  }
</style>
