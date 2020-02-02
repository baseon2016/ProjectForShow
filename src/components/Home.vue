<template>
  <div :class="{ home: true, fixed: showMask }">
    <HomeTop />
    <transition name="route" mode="out-in">
      <router-view v-cloak></router-view>
    </transition>
    <HomeBottom />
    <div class="mask" v-if="showMask"></div>
  </div>
</template>

<script>
import HomeTop from "./HomeTop";
import HomeBottom from "./HomeBottom";
import { mapState } from "vuex";
export default {
  name: "home",
  components: {
    HomeTop,
    HomeBottom
  },
  computed: {
    ...mapState({
      showMask: state => state.main.showMask
    })
  }
};
</script>

<style>
.home {
  width: 100%;
  min-height: 80vh;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.home.fixed {
  position: fixed;
  top: 0;
  height: 100%;
  overflow: hidden;
}
</style>
