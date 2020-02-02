import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const technology = {
  state: {
    technology: [],
    technologyDetail: null,
    active: "",
    activeId: ""
  },
  mutations: {
    // 工艺列表数据赋值本地
    assignTechnology(state, payload) {
      state.technology = payload;
    },
    // 工艺详情赋值本地
    assignTechnologyDetail(state, payload) {
      state.technologyDetail = payload;
    },
    // 当前激活工艺
    getActive(state, payload) {
      state.active = payload.CategoryName;
      state.activeId = payload.CategoryId;
    }
  },
  actions: {
    // 工艺列表数据获取后台
    getTechnology() {
      return axios.get(`${PUBLICAXIOS}/api/index/getResCategorylist`);
    }
  }
};
export default technology;
