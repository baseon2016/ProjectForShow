import common from "../../js/common.js";
import { PUBLICAXIOS } from "../../js/publicPath";
const onlineExam = {
  state: {
    courseSingle: {
      id: "1",
      title: "科目一",
      content: {
        id: "1",
        name: "科目一单元"
      }
    },
    courseOnline: []
  },
  mutations: {
    // 右侧考试数据赋值本地
    assignOnlineExam(state, payload) {
      state.courseOnline = payload;
    }
  },
  actions: {
    getOnlineExamFile({ commit, rootState }, payload) {
      setTimeout(() => {
        // 获取科目三科目四等内容
        const CategoryId = rootState.techs.currentId;
        const UserId = payload;
        const Url = `${PUBLICAXIOS}/api/coursemeans/paperorder`;
        const mainType = { mainTypeName: "SubType", nameValue1: "3", nameValue2: "4" };
        const subType = "UnitType";
        const constructor = { id: "CourseId", text: "UnitType" };
        const assignState = "assignOnlineExam";
        common.getFile({
          CategoryId,
          UserId,
          Url,
          mainType,
          subType,
          constructor,
          assignState,
          commit
        });
      }, 300);
    },
    // 数据和左侧标签栏获取后台，async await解决回调地狱
    async getOnlineExam({ commit, dispatch }) {
      // 获取左侧选项卡数据并设置好激活项
      const stepTechs = await dispatch("getTechs");
      if (stepTechs.data.Result) {
        commit("assignTechs", stepTechs.data.Data);
        // 默认当前激活选项卡为获取数据的第一项
        commit("getCurrent", stepTechs.data.Data[0]);
        // dispatch("getOnlineExamFile", payload);
      }
    }
  },
  getters: {
    showOnlineData(state) {
      const showOnline = common.styledData(state.courseOnline);
      return showOnline;
    }
  }
};
export default onlineExam;
