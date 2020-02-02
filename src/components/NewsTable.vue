<template>
  <div class="main-bg">
    <div class="container">
      <div class="tab-common df">
        <Techs @clickTab="getNewsFile" />
        <div class="tech-aside">
          <Current nav="新闻公告" />
          <div class="courses">
            <div class="news-list mg-t-14">
              <transition name="route" mode="out-in">
                <SubNews
                  :content="newsCurrentData(currentPage,pageSize)"
                  :key="current+currentPage"
                />
              </transition>
              <el-pagination
                class="common-pager"
                background
                layout="prev, pager, next"
                :total="newsTotalNum"
                :page-size="pageSize"
                :page-count="7"
                :hide-on-single-page="false"
                @current-change="pagerChange"
                :current-page="currentPage"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Techs from "./common/Techs";
import Current from "./common/Current";
import SubNews from "./common//SubNews";
export default {
  name: "news-table",
  data() {
    return {
      pageSize: 17,
      currentPage: 1
    };
  },
  components: {
    Techs,
    Current,
    SubNews
  },
  computed: {
    ...mapState({
      current: state => state.techs.current
      // subNewsData: state => state.news.subNewsData
    }),
    ...mapGetters(["newsTotalNum", "newsCurrentData"])
  },
  methods: {
    ...mapActions(["getNewsList"]),
    pagerChange(currentPage) {
      this.currentPage = currentPage;
    },
    getNewsFile() {
      this.currentPage = 1;
    }
  },
  created() {
    // console.log(this.$route.params.newsId);
    this.getNewsList();
  }
};
</script>

<style>
.news-list {
  background: #fff;
  padding: 20px 30px;
}
</style>