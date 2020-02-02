import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const aboutUs = {
  state: {
    // 帮助页选项卡配置
    aboutUs: [
      { CategoryId: "01", CategoryName: "危化品安全协会" },
      { CategoryId: "02", CategoryName: "博赫科技有限公司" },
      { CategoryId: "03", CategoryName: "平台信息技术资料" }
    ],
    aboutCCSA: null,
    aboutBOHE: null,
    aboutWEB: null
  },
  mutations: {
    // 右侧关于我们赋值本地
    assignAboutInfo(state, payload) {
      state[payload.attr] = payload.val;
    },
    // 清空关于我们页信息
    clearAboutUs(state) {
      state.aboutUs = [];
    }
  },
  actions: {
    // 右侧关于我们获取后台
    getAboutUs({ commit, state }) {
      axios.get(`${PUBLICAXIOS}/api/index/getInforMationlist`).then(res => {
        if (res.data.Result) {
          let help = res.data.Data.filter(item => item.CategoryType === "3");
          //CCSA帮助文章赋值本地
          let aboutInfo = help.find(item => item.Title === "危化品安全协会");
          commit("assignAboutInfo", { attr: "aboutCCSA", val: aboutInfo });
          //博赫帮助文章赋值本地
          aboutInfo = help.find(item => item.Title === "博赫科技有限公司");
          commit("assignAboutInfo", { attr: "aboutBOHE", val: aboutInfo });
          //特种作业平台帮助文章赋值本地
          aboutInfo = help.find(item => item.Title === "平台信息技术资料");
          commit("assignAboutInfo", { attr: "aboutWEB", val: aboutInfo });

          // 左侧选项卡手动配置
          commit("assignTechs", state.aboutUs);
          // 默认当前激活选项卡第一项
          commit("getCurrent", state.aboutUs[0]);
        }
      });
    }
  },
  getters: {
    showAboutUs(state, getters) {
      const name = getters.currentCategoryName;
      return state.aboutUs.find(item => item.CategoryName === name);
    }
  }
};
export default aboutUs;
