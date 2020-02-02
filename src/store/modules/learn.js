import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const learn = {
  state: {
    learnTab: "0",
    docs: [],
    videos: []
  },
  mutations: {
    // 右侧培训数据赋值本地
    assignLearn(state, payload) {
      state.docs = payload.docs;
      state.videos = payload.videos;
    },
    // 清空本地培训数据
    clearLearn(state) {
      state.docs = [];
      state.videos = [];
    },
    // 培训页切换Tab
    switchLearnTab(state, payload) {
      state.learnTab = payload;
    }
  },
  actions: {
    getLearnFile({ commit, rootState }) {
      commit("clearLearn");
      const id = rootState.techs.currentId;

      axios
        .get(`${PUBLICAXIOS}/api/index/getonlinetrainlist?id=${id}`)
        .then(res => {
          setTimeout(() => {
            if (res.data.Result) {
              const docsArray = res.data.Data.filter(
                item => item.OnTrainType === "1"
              );
              const videosArray = res.data.Data.filter(
                item => item.OnTrainType === "2"
              );
              function reducer(accumulator, currentValue) {
                let oldType = accumulator.find(
                  item => item.SourceType === currentValue.SourceType
                );
                if (oldType) {
                  oldType.content = [...oldType.content, currentValue];
                  return accumulator;
                } else {
                  let newType = {};
                  newType.id = currentValue.OnTrainId;
                  newType.text =
                    currentValue.SourceType === "1"
                      ? "公共文档"
                      : currentValue.SourceType === "2"
                      ? "专用文档"
                      : currentValue.SourceType === "3"
                      ? "科三文档"
                      : currentValue.SourceType === "4"
                      ? "科四文档"
                      : currentValue.SourceType === "5"
                      ? "公共视频"
                      : currentValue.SourceType === "6"
                      ? "专用视频"
                      : currentValue.SourceType === "7"
                      ? "科三视频"
                      : currentValue.SourceType === "8"
                      ? "科四视频"
                      : "未知类型";
                  newType.SourceType = currentValue.SourceType;
                  newType.content = [currentValue];
                  return [...accumulator, newType];
                }
              }
              let docs = docsArray.reduce(reducer, []);
              let videos = videosArray.reduce(reducer, []);
              docs.sort((a, b) => {
                return a.SourceType - b.SourceType;
              });
              videos.sort((a, b) => {
                return a.SourceType - b.SourceType;
              });
              commit("assignLearn", { docs, videos });
            }
          }, 300);
        });
    },
    // 培训数据和左侧标签栏获取后台，async await解决回调地狱
    async getLearn({ commit, rootState, dispatch }) {
      // 获取左侧选项卡数据并设置好激活项
      const stepTechs = await dispatch("getTechs");
      if (stepTechs.data.Result) {
        commit("assignTechs", stepTechs.data.Data);
        // 首页轮播导航点击事件进入到learn
        if (rootState.main.tab) {
          const activeCard = {
            CategoryName: rootState.main.tab.CategoryName,
            CategoryId: rootState.main.tab.CategoryId
          };
          commit("getCurrent", activeCard);
          commit("transToTab", "");
        } else {
          // 默认当前激活选项卡为获取数据的第一项
          commit("getCurrent", stepTechs.data.Data[0]);
        }
        dispatch("getLearnFile");
      }
    }
  }
};
export default learn;
