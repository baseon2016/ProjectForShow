<template>
  <div class="welcome"></div>
</template>

<script>
export default {
  name: "welcome",

  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        slidesPerView: 1,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: true,
          disableOnInteraction: true
        },
        loop: false,
        pagination: {
          el: ".swiper-pagination-welcome",
          clickable: true
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper1.swiper;
    }
  }
};
</script>

<style>
.welcome {
  width: 100%;
  /* width: 100vw;
  height: 100vh; */
  /* background-image: url("../assets/images/welcome-bg.png");
  background-size: 19.2rem, 10.8rem;
  background-position: center;
  background-repeat: no-repeat; */
}

.welcome .btn-push {
  /* display: block; */
  align-items: center;
  /* width: 2.25rem; */
  padding: 0 0.5rem;
  border-radius: 0.09rem;
  text-align: center;
  font-size: 0.26rem;
  line-height: 0.77rem;
  font-weight: bold;
  color: #fff;
  background-color: #13317e;
  top: 10%;
  right: 10%;
  box-shadow: 1px 1px 16px #000;
}
#img-push {
  /* display: block; */
  width: 22px;
  margin-left: 10px;
}
</style>
