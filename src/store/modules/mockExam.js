import { PUBLICAXIOS } from "../../js/publicPath";
import axios from "axios";
const mockExam = {
  state: {
    courseMock: []
  },
  mutations: {
    // 右侧模拟数据赋值本地
    assignMockExam(state, payload) {
      state.courseMock = payload;
    },
    // // 赋值科目3的单元
    // assignCategory3(state, payload) {
    //   state.category3 = payload;
    // },
    // // 赋值科目4的单元
    // assignCategory4(state, payload) {
    //   state.category4 = payload;
    // },
    // 清空模拟考试本地数据
    clearMockExam(state) {
      state.courseMock = [];
    }
  },
  actions: {
    getMockExamFile({ commit, rootState }, payload) {
      setTimeout(() => {
        // 获取科目三科目四等内容
        const CategoryId = rootState.technology.activeId;
        const UserId = payload;
        axios
          .get(
            `${PUBLICAXIOS}/api/coursemeans/index?UserId=${UserId}&CategoryId=${CategoryId}`
          )
          .then(res => {
            commit("assignMockExam", res.data.Data);
          });
      }, 300);
    },

    // 数据和左侧标签栏获取后台，async await解决回调地狱
    async getMockExam({ commit, dispatch }, payload) {
      // 获取左侧选项卡数据并设置好激活项
      const stepTechs = await dispatch("getTechnology");
      if (stepTechs.data.Result) {
        commit("assignTechnology", stepTechs.data.Data);
        // 默认当前激活选项卡为获取数据的第一项
        commit("getActive", stepTechs.data.Data[0]);
        dispatch("getMockExamFile", payload);
      }
    }
  },
  getters: {
    showMockData(state) {
      // 数组科目三和四
      let SubType3 = state.courseMock.filter(item => item.SubType === "3");
      let SubType4 = state.courseMock.filter(item => item.SubType === "4");
      let showMock = [
        { id: "1", text: "科目三", content: SubType3 },
        { id: "2", text: "科目四", content: SubType4 }
      ];

      if (itemUnitType1.length > 1) {
        showMock = showMock.map(item => {
          // 数组通用单元和特定单元
          let itemUnitType1 = item.content.filter(ele => ele.UnitType === "1");
          let itemUnitType2 = item.content.filter(ele => ele.UnitType === "2");
          // 科目中的单元，抽取
          const randomInd1 = Math.floor(Math.random() * itemUnitType1.length);
          let randomInd2 = Math.floor(Math.random() * itemUnitType1.length);
          while (randomInd1 === randomInd2) {
            randomInd2 = Math.floor(Math.random() * itemUnitType1.length);
          }
          // 随机抽取普通单元赋值结果
          itemUnitType1 = itemUnitType1.filter(
            (each, index) => index === randomInd1 || index === randomInd2
          );

          const randomInd3 = Math.floor(Math.random() * itemUnitType2.length);
          // 随机抽取特定单元赋值结果
          itemUnitType2 = itemUnitType2.filter(
            (each, index) => index === randomInd3
          );

          return { ...item, content: [...itemUnitType1, ...itemUnitType2] };
        });
      }

      return showMock;
    }
  }
};

export default mockExam;
