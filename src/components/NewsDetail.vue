<template>
  <div class="main-bg">
    <div class="container">
      <div class="tab-common df">
        <Techs />
        <div class="tech-aside">
          <Current nav="新闻公告详情" />
          <div class="courses">
            <div class="news-detail mg-t-14" v-if="newsDetail">
              <div class="news-detail-title">{{newsDetail.title}}</div>
              <div class="news-detail-text">{{newsDetail.remark}}</div>
            </div>
            <div v-else class="no-data">
              <img src="../assets/images/no-msg.png" />
              <p>未找到文章</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Techs from "./common/Techs";
import Current from "./common/Current";
export default {
  name: "news-detail",
  components: {
    Techs,
    Current
  },
  computed: {
    ...mapState({
      current: state => state.techs.current,
      newsDetail: state => state.news.newsDetailData
    })
  },
  methods: {
    ...mapActions(["getNewsDetail"])
  },
  created() {
    this.getNewsDetail({ id: this.$route.params.id, $router: this.$router });
  }
};
</script>

<style>
.news-detail {
  background: #fff;
  padding: 20px 30px;
  font-size: 16px;
}
</style>