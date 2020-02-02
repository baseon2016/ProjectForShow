<template>
  <div class="main-bg">
    <div class="learn-banner">
      <img src="../assets/images/learnDetail-banner.png" alt="在线培训" />
    </div>
    <div v-if="technologyDetail" class="container">
      <div class="learn-detail-top df">
        <div class="df">
          <img :src="$publicUrl + technologyDetail.ImgPath" alt="工艺图" />
          <div class="learn-detail-top-text">
            <h3>{{ technologyDetail.CategoryName }}</h3>
          </div>
        </div>
        <div class="learn-detail-end">
          <div class="timer">
            <i class="el-icon-timer"></i>
            <span>学习时间：{{ timer }}秒</span>
          </div>
          <p class="include">
            <span>离心泵单元</span>
            <span>换热器单元</span>
            <span>精馏塔单元</span>
            <span>离心压缩机单元</span>
          </p>
        </div>
      </div>
      <div class="learn-detail-content" v-html="technologyDetail.Remark"></div>
    </div>
    <HomeBottom />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import HomeBottom from "./HomeBottom";
export default {
  name: "learn-detail",
  data() {
    return {
      timer: 0
    };
  },
  components: {
    HomeBottom
  },
  computed: {
    ...mapState({
      technologyDetail: state => state.technology.technologyDetail
    })
  },
  methods: {
    ...mapMutations(["assignTechnology", "assignTechnologyDetail"]),
    async learnTechs(id) {
      const getTechs = await this.$store.dispatch("getTechnology");
      if (getTechs.data.Result) {
        this.assignTechnology(getTechs.data.Data);
        // 下面设置详情页信息
        const detail = getTechs.data.Data.find(item => item.CategoryId === id);
        this.assignTechnologyDetail(detail);
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    this.learnTechs(id);
    const time = setInterval(() => {
      this.timer = this.timer + 1;
    }, 1000);
  }
};
</script>

<style>
.learn-detail-top {
  margin: 10px 0;
  padding: 10px 15px;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
}
.learn-detail-top .learn-detail-top-text {
  margin: 10px 15px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.learn-detail-top .include {
  margin-top: 10px;
}
.learn-detail-top .include span {
  display: block;
  color: #c5c5c5;
  font-size: 12px;
}
.learn-detail-end {
  align-self: flex-end;
}
.timer {
  background-color: #5272c6;
  padding: 5px 10px;
  color: #fff;
  border: 1px solid #5272c6;
  border-radius: 3px;
}
.learn-detail-content {
  background-color: #fff;
  padding: 15px;
}
</style>
