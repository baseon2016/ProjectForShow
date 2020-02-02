import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const techs = {
  state: {
    current: "",
    currentId: "",
    techs: []
  },
  mutations: {
    // 当前激活选项卡
    getCurrent(state, payload) {
      state.current = payload.CategoryName;
      state.currentId = payload.CategoryId;
    },
    // 侧边选项卡数据赋值本地
    assignTechs(state, payload) {
      state.techs = payload;
    },
    // 侧边选项卡数据清空
    clearTechs(state) {
      state.current = "";
      state.currentId = "";
      state.techs = [];
    },
    clearCurrent(state) {
      state.current = "";
      state.currentId = "";
    }
  },
  actions: {
    // 侧边选项卡数据获取后台
    getTechs({ commit }) {
      commit("clearTechs");
      return axios.get(`${PUBLICAXIOS}/api/index/getResCategorylist`);
    }
  },
  getters: {
    currentCategoryName(state) {
      return state.current;
    },
    currentCategoryInfo(state) {
      return state.techs.find(item => item.CategoryId === state.currentId);
    }
  }
};
export default techs;
