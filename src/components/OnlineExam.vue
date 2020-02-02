<template>
  <div class="main-bg">
    <div class="container">
      <div class="tab-common df">
        <Techs @clickTab="getOnlineExamFile(UserId)" techsName="工艺类别" />
        <div class="tech-aside">
          <Current :current="current" nav="在线考试" />
          <div class="courses">
            <BlockSingle
              :sourceData="courseSingle"
              btnText="开始考试"
              class="mg-t-14"
            />
            <Block
              v-for="item in showOnlineData"
              :key="item.id"
              :sourceData="item"
              btnText="开始考试"
              blockType="exam"
              class="mg-t-14"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Techs from "./common/Techs";
import Current from "./common/Current";
import Block from "./common/Block";
import BlockSingle from "./common/BlockSingle";
export default {
  name: "online-exam",
  data() {
    return {
      UserId: null
    };
  },
  components: {
    Techs,
    Current,
    Block,
    BlockSingle
  },
  computed: {
    ...mapState({
      current: state => state.techs.current,
      courseSingle: state => state.onlineExam.courseSingle
    }),
    ...mapGetters(["showOnlineData"])
  },
  methods: {
    ...mapActions(["getOnlineExam", "getOnlineExamFile"]),
    ...mapMutations(["changeTab"]),
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
    this.getOnlineExam(UserId);
  }
};
</script>

<style></style>
