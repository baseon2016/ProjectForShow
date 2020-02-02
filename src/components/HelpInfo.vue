<template>
  <div class="main-bg">
    <div class="container">
      <div class="tab-common df">
        <Techs techsName="操作指南" />
        <div class="tech-aside">
          <Current nav="操作指南" />
          <transition name="slow-in" mode="out-in">
            <div class="courses help-info">
              <HelpText :showData="showHelp" />
              <div class="swiper">
                <swiper :options="swiperOption" ref="mySwiper2">
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
                    <div>
                      <img
                        src="../assets/images/welcome/2.jpg"
                        alt="平台特点"
                      />
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div>
                      <img
                        src="../assets/images/welcome/3.jpg"
                        alt="适用人群"
                      />
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div>
                      <img
                        src="../assets/images/welcome/4.jpg"
                        alt="开发说明"
                      />
                    </div>
                  </swiper-slide>
                </swiper>
                <!-- Optional controls -->
                <div class="swiper-pagination swiper-pagination-main"></div>
                <div class="swiper-button-prev" slot="button-prev">上一步</div>
                <div class="swiper-button-next" slot="button-next">下一步</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import HelpText from "./HelpText";
import Techs from "./common/Techs";
import Current from "./common/Current";
export default {
  name: "help-info",
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        slidesPerView: 1,
        loop: false,
        pagination: {
          el: ".swiper-pagination-main",
          clickable: true
        }
      }
    };
  },
  computed: {
    ...mapGetters(["showHelp"]),
    swiper2() {
      return this.$refs.mySwiper2.swiper;
    }
  },
  components: {
    Techs,
    Current,
    HelpText
  },

  methods: {
    ...mapActions(["getHelp"])
  },
  created() {
    this.getHelp();
  }
};
</script>

<style>
.help-info .swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  margin: 0 10px;
  outline: 0;
  opacity: 0.5;
  background: #fff;
}
.help-info .swiper-pagination-bullet-active {
  opacity: 1;
}
.help-info .swiper-pagination-main {
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
}
.help-info .swiper .swiper-slide img {
  display: block;
  width: 100%;
}
.help-info .swiper .swiper-button-next:hover,
.help-info .swiper .swiper-button-prev:hover {
  background-color: #2a4793;
}
.help-info .swiper .swiper-button-next {
  right: 2%;
}
.help-info .swiper .swiper-button-prev {
  left: 2%;
}
.help-info .swiper .swiper-button-next,
.help-info .swiper .swiper-button-prev {
  width: 100px;
  height: 50px;
  top: 90%;
  background-color: rgba(229, 229, 229, 0.3);
  outline: 0;
  text-align: center;
  line-height: 50px;
  color: #fcfcfc;
  font-size: 18px;
  font-weight: bold;
  background-image: none;
}
.help-info .swiper {
  width: 960px;
  position: relative;
  font-size: 14px;
}
</style>
