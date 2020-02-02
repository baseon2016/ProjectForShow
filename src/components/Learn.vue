<template>
  <div class="main-bg">
    <div class="learn-banner">
      <img src="../assets/images/learn-banner.png" alt="在线培训" />
    </div>
    <div class="container">
      <div class="tab-common df">
        <div class="tech-aside">
          <div class="technology-list df">
            <div
              v-for="item in technology"
              :key="item.Id"
              class="technology-item"
            >
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="$publicUrl + item.ImgPath" class="image" />
                <div style="padding: 10px;">
                  <span>{{ item.CategoryName }}</span>
                  <div class="bottom df">
                    <span class="technology-count"
                      >学习次数：{{ item.CategoryType }}</span
                    >
                    <el-button
                      type="primary"
                      class="button"
                      @click="goLearnId(item.CategoryId)"
                      >学习详情</el-button
                    >
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "learn",

  computed: {
    ...mapState({
      technology: state => state.technology.technology
    })
  },
  methods: {
    ...mapMutations(["assignTechnology"]),
    goLearnId(id) {
      const url = this.$router.resolve({
        path: `/learn/${id}`
      });
      window.open(url.href, "_blank");
    },
    async learnTechs() {
      const getTechs = await this.$store.dispatch("getTechnology");
      if (getTechs.data.Result) {
        this.assignTechnology(getTechs.data.Data);
      }
    }
  },
  created() {
    this.learnTechs();
    // .then(res => {
    //     if (payload) {
    //       const detail = res.data.Data.find(
    //         item => item.CategoryId === payload
    //       );
    //       commit("assignTechnologyDetail", detail);
    //     }
    //   });
  }
};
</script>

<style>
.tab-common {
  padding-top: 40px;
  padding-bottom: 20px;
  align-items: flex-start;
  min-height: 77vh;
  line-height: 1.8;
}
.learn-banner img {
  display: block;
  width: 100%;
}
.tech-aside {
  flex-grow: 1;
  /* max-width: 960px; */
}
.technology-list {
  justify-content: flex-start;
  flex-wrap: wrap;
}
.technology-item {
  padding: 15px 10px;
}
.technology-count {
  font-size: 13px;
  color: #999;
}
.technology-item .bottom {
  line-height: 12px;
  justify-content: space-between;
  align-items: center;
}
.technology-item .button {
  padding: 5px;
  font-size: 12px;
}
</style>
