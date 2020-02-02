import axios from "axios";
import common from "../../js/common.js";
import { PUBLICAXIOS } from "../../js/publicPath";
const practice = {
  state: {
    coursePractice: []
  },
  mutations: {
    // 右侧练习数据赋值本地
    assignPractice(state, payload) {
      state.coursePractice = payload;
    },
    // 赋值科目3的单元
    assignCategory3(state, payload) {
      state.category3 = payload;
    },
    // 赋值科目4的单元
    assignCategory4(state, payload) {
      state.category4 = payload;
    },
    // 清空练习本地数据
    clearPractice(state) {
      state.coursePractice = [];
    }
  },

  actions: {
    getPracticeFile({ commit, rootState }, payload) {
      setTimeout(() => {
        // 获取科目三科目四等内容
        const CategoryId = rootState.technology.activeId;
        const UserId = payload;
        axios
          .get(
            `${PUBLICAXIOS}/api/coursemeans/index?UserId=${UserId}&CategoryId=${CategoryId}`
          )
          .then(res => {
            commit("assignPractice", res.data.Data);
          });
      }, 300);
    },
    // 数据和左侧标签栏获取后台，async await解决回调地狱
    async getPractice({ commit, dispatch }, payload) {
      // 获取左侧选项卡数据并设置好激活项
      const stepTechs = await dispatch("getTechnology");
      if (stepTechs.data.Result) {
        commit("assignTechnology", stepTechs.data.Data);
        // 默认当前激活选项卡为获取数据的第一项
        commit("getActive", stepTechs.data.Data[0]);
        dispatch("getPracticeFile", payload);
      }
    },
    softWare(context, payload) {
      axios
        .get(
          `${PUBLICAXIOS}/api/index/getstart?userId=${payload.UserId}&pid=${payload.CourseId}&type=${payload.type}`
        )
        .then(res => {
          window.open(res.data.Data);
          setTimeout(() => {
            axios
              .get(
                `${PUBLICAXIOS}/api/home/getApiLogInfo?UserId=${payload.UserId}&ProductId=${payload.CourseId}&LogType=${payload.type}`
              )
              .then(rst => {
                // console.log(rst);
              });
          }, 3000);
        });
    }
  },
  getters: {
    showPracticeData(state) {
      let showPractice = common.styledData(state.coursePractice);
      return showPractice;
    }
  }
};
export default practice;
