<template>
  <div class="login">
    <div class="container">
      <h1 class="logo">
        <router-link :to="$homeUrl" class="df">
          <img src="../assets/images/logo.png" alt="中国化学品安全协会" />
          <img
            src="../assets/images/sub-logo.png"
            alt="中国化学品安全协会"
            class="sub-logo"
          />
        </router-link>
      </h1>
      <div class="login-block mg-0">
        <transition name="route" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style>
.login {
  background-image: url("../assets/images/login-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: repeat-y;
  padding-top: 50px;
  padding-bottom: 300px;
  min-height: 100vh;
}
.login h1.logo a {
  align-items: center;
}
.login h1.logo img.sub-logo {
  margin-left: 65px;
}
.login-block {
  margin: 44px auto;
  width: 550px;
  padding: 65px 0;
  background-color: #fff;
}
</style>
