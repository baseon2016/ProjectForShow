<template>
  <div id="app" v-cloak>
    <transition mode="out-in" name="route">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      UserId: null,
      beginTime: 0, //开始时间
      differTime: 0 //时间差
    };
  },
  methods: {
    ...mapActions(["baiduApi"]),
    beforeunloadHandler() {
      this.beginTime = new Date().getTime();
    },
    unloadHandler() {
      this.differTime = new Date().getTime() - this.beginTime;
      if (this.differTime <= 5) {
        if (this.UserId) {
          $.ajax({
            url: `${this.$publicAxios}/api/user/userloginout`,
            type: "get",
            data: { userId: this.UserId },
            async: false, //或false,是否异步
            // 以下关闭页面后的执行结果测试
            success: res => {},
            error: res => {}
          });
        }
      }
    }
  },
  // {"expires_in":2592000,"refresh_token":"22.23607f6d508a804360e5d44865cc2fd8.315360000.1888966022.1443708768-17751399","access_token":"21.8f9a743981a364b4302c1efc22023434.2592000.1576198022.1443708768-17751399","session_secret":"","session_key":"","scope":"basic"}
  created() {
    // this.baiduApi();

    const UserId = localStorage.getItem("UserId");
    if (UserId) {
      this.UserId = UserId;
    } else {
      const UserId = sessionStorage.getItem("UserId");
      if (UserId) {
        this.UserId = UserId;
      }
    }
  },
  mounted() {
    window.addEventListener("unload", e => this.unloadHandler(e));
    window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
  },
  destroyed() {
    window.removeEventListener("unload", e => this.unloadHandler(e));
    window.removeEventListener("beforeunload", e => this.unloadHandler(e));
  }
};
</script>

<style>
#app {
  width: 100%;
  font-size: 14px;
}
.route-enter {
  opacity: 0;
}
.route-enter-active {
  transition: all 1s ease;
}
.route-enter-to {
  opacity: 1;
}
.route-leave {
  opacity: 1;
}
.route-leave-active {
  transition: all 0.2s ease;
}
.route-leave-to {
  opacity: 0;
}
</style>
