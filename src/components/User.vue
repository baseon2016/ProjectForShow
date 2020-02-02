<template>
  <div class="main-bg">
    <div class="container">
      <div class="tab-common df">
        <Techs techsName="个人中心" />
        <div class="tech-aside">
          <Current nav="个人中心" :userScoreTab="userScoreTab" />
          <div class="courses">
            <transition name="route" mode="out-in">
              <UserInfo v-if="current === '基本信息'" :UserId="UserId" />
              <UserToken
                v-if="current === '修改密码'"
                :UserId="UserId"
                :UserName="UserName"
              />
              <UserScore v-if="current === '分数信息'" :UserId="UserId" />
              <UserMsgs v-if="current === '用户消息'" :UserId="UserId" />
              <Paypal v-if="current === '购买积分'" :UserId="UserId" />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserInfo from "./UserInfo";
import UserToken from "./UserToken";
import UserScore from "./UserScore";
import UserMsgs from "./UserMsgs";
import Paypal from "./Paypal";
import Techs from "./common/Techs";
import Current from "./common/Current";
export default {
  name: "user",
  data() {
    return {
      UserId: null,
      UserName: null
    };
  },
  components: {
    Techs,
    Current,
    UserInfo,
    UserToken,
    UserScore,
    UserMsgs,
    Paypal
  },
  computed: {
    ...mapState({
      current: state => state.techs.current,
      userScoreTab: state => state.user.userScoreTab
    })
  },
  methods: {
    ...mapActions(["getUser"]),

    clickConfirm(text, title, type) {
      this.$confirm(text, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
        center: true
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          this.$router.back();
        });
    }
  },
  created() {
    const UserId = localStorage.getItem("UserId");
    const UserName = localStorage.getItem("UserName");
    if (!UserId || !UserName) {
      const UserId = sessionStorage.getItem("UserId");
      const UserName = sessionStorage.getItem("UserName");
      if (!UserId || !UserName) {
        this.clickConfirm("用户未登录，请先登录", "警告", "warning");
      }
    }
    if (UserId && UserName) {
      this.UserId = UserId;
      this.UserName = UserName;
      this.getUser(UserId);
    }
  }
};
</script>

<style></style>
