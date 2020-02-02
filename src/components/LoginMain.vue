<template>
  <div class="login-main mg-0">
    <div class="login-tab df">
      <div class="log">
        <span @click="changeTab('login')" :class="{'active-tab':tab==='login'}">登陆</span>
      </div>
      <div class="register">
        <span @click="changeTab('register')" :class="{'active-tab':tab==='register'}">注册</span>
      </div>
    </div>
    <div class="login-content">
      <transition name="route" mode="out-in">
        <Log v-if="tab==='login'" />
        <Register v-else />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Log from "./Log";
import Register from "./Register";
export default {
  name: "login-main",
  components: {
    Log,
    Register
  },
  computed: {
    ...mapState({
      tab: state => state.login.tab
    })
  },
  methods: {
    ...mapMutations(["changeTab"])
  }
};
</script>

<style>
.login-main {
  width: 370px;
}
.login-tab {
  font-size: 14px;
  font-weight: bold;
  color: #959595;
  line-height: 65px;
  border-bottom: 1px solid #f5f5f5;
}
.login-tab div + div {
  margin-left: 120px;
}
.login-tab span {
  display: block;
  width: 30x;
  text-align: left;
  cursor: pointer;
  user-select: none;
}
.login-tab span.active-tab {
  color: #333;
  border-bottom: 2px solid #2a4793;
}
</style>