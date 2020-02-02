<template>
  <div class="main po-r">
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper1">
        <!-- slides -->
        <swiper-slide>
          <div>
            <img
              src="../assets/images/welcome/1.jpg"
              alt="危化品特种作业安全技术实操培训考试一体化平台"
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div><img src="../assets/images/welcome/2.jpg" alt="平台特点" /></div>
        </swiper-slide>
        <swiper-slide>
          <div><img src="../assets/images/welcome/3.jpg" alt="适用人群" /></div>
        </swiper-slide>
        <swiper-slide>
          <div><img src="../assets/images/welcome/4.jpg" alt="开发说明" /></div>
        </swiper-slide>
      </swiper>
      <!-- Optional controls -->
      <div class="swiper-pagination swiper-pagination-main"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
    <div class="news po-a" v-if="showMask">
      <p class="close el-icon-close" @click="doShowMask(false)"></p>
      <SubNews
        v-loading="!subNewsData.news.content.length"
        :title="subNewsData.news.category"
        :content="subNewsData.news.content"
      />
      <SubNews
        v-loading="!subNewsData.notice.content.length"
        :title="subNewsData.notice.category"
        :content="subNewsData.notice.content"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import SubNews from "./common/SubNews";
export default {
  name: "main-section",
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
        loop: true,
        pagination: {
          el: ".swiper-pagination-main",
          clickable: true
        }
      }
    };
  },
  components: {
    SubNews
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapState({
      subNewsData: state => state.main.subNewsData,
      showMask: state => state.main.showMask
    })
  },
  methods: {
    ...mapMutations(["doShowMask"]),
    ...mapActions(["loadInfo"])
  },
  created() {
    this.loadInfo(this.$loading);
    this.doShowMask(true);
  }
};
</script>

<style>
.main {
  width: 100%;
  min-height: 77vh;
}
.main .swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  margin: 0 10px;
  outline: 0;
  opacity: 0.5;
  background: #fff;
}
.main .swiper-pagination-bullet-active {
  opacity: 1;
}
.main .swiper-pagination-main {
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
}
.main .swiper .swiper-slide img {
  display: block;
  width: 100%;
}
.main .swiper .swiper-button-next:hover {
  background-image: url("../assets/images/welcome/箭头-右-hover.png");
}
.main .swiper .swiper-button-prev:hover {
  background-image: url("../assets/images/welcome/箭头-左-hover.png");
}
.main .swiper .swiper-button-next {
  right: 2%;
}
.main .swiper .swiper-button-prev {
  left: 2%;
}
.main .swiper .swiper-button-next,
.main .swiper .swiper-button-prev {
  width: 50px;
  height: 100px;
  background: rgba(0, 0, 0, 0.3);
  outline: 0;
}
.main .swiper .swiper-button-prev {
  background-image: url("../assets/images/welcome/箭头-左.png");
  background-repeat: no-repeat;
  background-position: center;
}
.main .swiper .swiper-button-next {
  background-image: url("../assets/images/welcome/箭头-右.png");
  background-repeat: no-repeat;
  background-position: center;
}
.main .swiper {
  width: 100%;
  position: relative;
  font-size: 14px;
}
.main .news {
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 700px;
  background-color: #fff;
  padding: 20px 35px 0px 30px;
  border-radius: 5px;
}
.news .close {
  font-size: 24px;
  font-weight: bold;
  color: #999;
  margin-bottom: 15px;
  cursor: pointer;
  text-align: right;
  position: relative;
  left: 610px;
}
</style>
