// 兼容语句
import "@babel/polyfill";

// 主体入口
import Vue from "vue";
import App from "./App.vue";
import "./assets/global.css";
import router from "./router";
import store from "./store";
import "./assets/plugins/swiper";
import "./assets/plugins/element";
import common from "./js/common.js";
Vue.config.productionTip = false;
import {
  PUBLICURL,
  HOMEURL,
  PUBLICDOWNLOAD,
  PUBLICAXIOS
} from "./js/publicPath";
Vue.prototype.$publicUrl = PUBLICURL;
Vue.prototype.$homeUrl = HOMEURL;
Vue.prototype.$publicDownload = PUBLICDOWNLOAD;
Vue.prototype.$publicAxios = PUBLICAXIOS;
Vue.prototype.$common = common;
// 窗口尺寸变化时，自动刷新页面适应窗口
// common.autoResize();
// 模拟切换页面时,跳转到页面顶部
router.afterEach(() => {
  window.scrollTo(0, 0);
});

// 加入百度统计
// 这里要注意一下，如果安装的有ESLint代码校验的话，_hmt变量上面要加 // eslint-disable-next-line 让ESLint不检测这一行代码，因为现在的变量命名是不建议有_的，所以ESLint认为是不符合语法的，就一直报错，因为这个变量是百度的，里面的api都是通过这个变量调用的，我们不能更改，所以只能不让ESLint校验这个变量
// eslint-disable-next-line
// const _hmt = _hmt || [];
// eslint-disable-next-line
// window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
// (function() {
//   const hm = document.createElement("script");
//   hm.src = "https://hm.baidu.com/hm.js?6f2212ee8e3fd2f83702bd023606f48e";
//   const s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(hm, s);
// })();

// 路由切换时将路径发给baidu
router.beforeEach((to, from, next) => {
  if (to.path) {
    if (window._hmt) {
      // 如果路由mode是history， _hmt.push(['_trackPageview', to.fullPath])，但是如果是hash的话，后面的路径要修改一下
      window._hmt.push(["_trackPageview", "/#" + to.fullPath]);
    }
  }
  next();
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
