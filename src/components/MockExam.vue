<template>
  <div class="main-bg">
    <div class="learn-banner">
      <img src="../assets/images/mock-banner.png" alt="在线模拟" />
    </div>
    <DownloadSoftware
      :downloadHref="`${$publicDownload}/BH.App.Output.rar`"
      downloadName="在线练习软件下载"
      baiduTrackId="practice"
    />
    <div class="container">
      <div class="tab-common df">
        <div class="tech-aside">
          <div class="courses">
            <CourseMockList
              v-for="item in showMockData"
              :key="item.id"
              :data="item.content"
              :subCategory="item.text"
              class="course-mock-list"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import CourseMockList from "./common/CourseMockList";
import DownloadSoftware from "./common/DownloadSoftware";
export default {
  name: "mock-exam",
  data() {
    return {
      UserId: null
    };
  },
  components: {
    CourseMockList,
    DownloadSoftware
  },
  computed: {
    ...mapState({
      technology: state => state.technology.technology,
      active: state => state.technology.active,
      activeId: state => state.technology.activeId
    }),
    ...mapGetters(["showMockData"])
  },
  methods: {
    ...mapActions(["getMockExam", "getMockExamFile"]),
    ...mapMutations(["getActive", "changeTab"]),
    selectCategory(item) {
      if (item.CategoryId !== this.activeId) {
        this.getActive(item);
        this.getMockExamFile(this.UserId);
      }
    },

    clickConfirm(text, title, type) {
      this.$confirm(text, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
        center: true
      })
        .then(() => {
          this.changeTab("login");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$router.back();
        });
    }
  },
  created() {
    let UserId = localStorage.getItem("UserId");
    if (!UserId) {
      UserId = sessionStorage.getItem("UserId");
      if (!UserId) {
        this.clickConfirm("用户未登录，请先登录", "警告", "warning");
      }
    }
    this.UserId = UserId;
    this.getMockExam(UserId);
  }
};
</script>

<style>
.course-mock-list + .course-mock-list {
  margin-top: 20px;
}
</style>
