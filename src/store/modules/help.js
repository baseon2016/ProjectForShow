import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const help = {
  state: {
    // 帮助页选项卡配置
    helpCard: []
  },
  mutations: {
    // 右侧帮助数据赋值本地
    assignHelp(state, payload) {
      state.helpCard = payload;
    },
    // 清空帮助页信息
    clearHelp(state) {
      state.helpCard = [];
    }
  },
  actions: {
    // 右侧帮助数据获取后台
    getHelp({ commit }) {
      axios.get(`${PUBLICAXIOS}/api/index/getInforMationlist`).then(res => {
        if (res.data.Result) {
          // 筛选数据为帮助
          let help = res.data.Data.filter(item => item.CategoryType === "3");
          let newUserGuide = help.find(item => item.Title === "网站使用");
          newUserGuide = {
            ...newUserGuide,
            CategoryId: newUserGuide.AbId,
            CategoryName: newUserGuide.Title
          };
          // help = help.map(item => {
          //   return {
          //     ...item,
          //     CategoryId: item.AbId,
          //     CategoryName: item.Title
          //   };
          // });
          // 左侧选项卡手动配置
          commit("assignTechs", [newUserGuide]);
          // 默认当前激活选项卡第一项
          commit("getCurrent", [newUserGuide][0]);
          //全部帮助文章赋值本地
          commit("assignHelp", [newUserGuide]);
        }
      });
    }
  },
  getters: {
    showHelp(state, getters) {
      const name = getters.currentCategoryName;
      return state.helpCard.find(item => item.CategoryName === name);
    }
  }
};
export default help;
