<template>
  <div class="home-top-wrap">
    <div class="nav-user">
      <div class="container df">
        <h1 class="logo df">
          <router-link :to="$homeUrl">
            <img
              class="sub-logo"
              src="../assets/images/sub-logo.png"
              alt="危化品特种作业安全技术实操培训考试一体化平台"
            />
          </router-link>
        </h1>
        <div class="to-login df">
          <div v-if="!UserInfo.UserId" class="df">
            <router-link to="/login" @click.native="changeTab('login')"
              >登录</router-link
            >
            <router-link to="/login" @click.native="changeTab('register')"
              >注册</router-link
            >
          </div>
          <div v-else class="user-logged df">
            <span>欢迎您,</span>
            <router-link :to="$homeUrl + 'user'">{{
              UserInfo.UserName
            }}</router-link>
            <a class="logout" @click="logout">退出</a>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-site">
      <div class="container home-top">
        <div class="nav">
          <ul class="df">
            <li>
              <router-link :to="$homeUrl" exact active-class="active"
                >首页</router-link
              >
            </li>
            <li>
              <router-link :to="$homeUrl + 'learn'" active-class="active"
                >工艺列表</router-link
              >
            </li>
            <li>
              <router-link :to="$homeUrl + 'practice'" active-class="active"
                >在线练习</router-link
              >
            </li>
            <li>
              <router-link :to="$homeUrl + 'mock-exam'" active-class="active"
                >模拟考试</router-link
              >
            </li>
            <li>
              <router-link :to="$homeUrl + 'knowledge'" active-class="active"
                >理论知识</router-link
              >
            </li>

            <li>
              <router-link
                :to="$homeUrl + 'user'"
                active-class="active"
                class="po-r"
                >个人中心
                <span
                  v-if="newMsgs.length"
                  class="new-msgs"
                  @click="topNavTo"
                  >{{ newMsgs.length }}</span
                >
              </router-link>
            </li>
            <li>
              <router-link :to="$homeUrl + 'aboutus'" active-class="active"
                >关于我们</router-link
              >
            </li>
            <li>
              <router-link
                :to="$homeUrl + 'help'"
                active-class="active"
                class="new-guide"
                >操作指南</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "home-top",
  data() {
    return {
      UserInfo: {
        UserName: null,
        UserId: null
      }
    };
  },
  computed: {
    ...mapGetters(["newMsgs"])
  },
  methods: {
    ...mapMutations(["changeTab", "getCurrent", "setTopNav"]),
    ...mapActions(["getUserMsgs", "logoutAxios"]),
    logout() {
      this.$confirm("请确认注销已登录账号", "退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          const request = await this.$store.dispatch(
            "logoutAxios",
            this.UserInfo.UserId
          );
          if (request.data.Result) {
            sessionStorage.removeItem("UserName");
            sessionStorage.removeItem("UserId");
            localStorage.removeItem("UserName");
            localStorage.removeItem("UserId");
            this.UserInfo.UserName = null;
            this.UserInfo.UserId = null;
            if (this.$route.fullPath !== this.$homeUrl) {
              this.$router.push(this.$homeUrl);
            }
          }
        })
        .catch(() => {});
    },
    topNavTo() {
      this.getCurrent({ CategoryId: "04", CategoryName: "用户消息" });
      this.setTopNav(true);
    }
  },
  created() {
    const UserId = localStorage.getItem("UserId");
    const UserName = localStorage.getItem("UserName");

    if (UserId && UserName) {
      this.UserInfo.UserName = UserName;
      this.UserInfo.UserId = UserId;
    } else {
      const UserId = sessionStorage.getItem("UserId");
      const UserName = sessionStorage.getItem("UserName");
      this.UserInfo.UserName = UserName;
      this.UserInfo.UserId = UserId;
    }
    if (UserId && UserName) {
      this.getUserMsgs(UserId);
    }
  }
};
</script>

<style>
.home-top-wrap {
  width: 100%;
}
.nav-user {
  background-color: #13317e;
}
.nav-user > div.container {
  height: 86px;
  align-items: center;
}
.nav-site {
  background-color: #2a4793;
}
.to-login {
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  line-height: 36px;
}
.to-login p {
  font-size: 14px;
}
.to-login a,
.to-login span {
  color: #fff;
  font-size: 12px;
}
.to-login p,
.to-login a {
  user-select: none;
  cursor: pointer;
}
.to-login p.msgs {
  align-items: center;
}

.to-login a + a {
  margin-left: 30px;
}
.to-login span + a {
  margin-left: 15px;
}
.home-top.container {
  height: 58px;
  justify-content: space-between;
  align-items: center;
}
h1.logo {
  align-items: flex-end;
  flex-shrink: 0;
}
h1.logo img {
  display: block;
}

.nav ul {
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
}
.nav ul li + li {
  margin-left: 39px;
}
.nav ul li:first-child a {
  padding: 0 13px;
}
.nav ul li a {
  display: block;
  line-height: 56px;
  font-size: 16px;
  font-weight: bold;
  /* padding: 0 13px; */
  color: #d2d8e6;
  border-bottom: 2px solid transparent;
}
.nav ul li a.new-guide {
  color: #ffcd1f;
}
.nav ul li a.active,
.nav ul li a:hover {
  color: #fff;
  border-color: #fff;
}
.nav ul li a.new-guide.active,
.nav ul li a.new-guide:hover {
  color: #ffcd1f;
  border-color: #ffcd1f;
}
span.new-msgs {
  position: absolute;
  z-index: 1;
  top: 12px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  background-color: #eb0000;
}
</style>
