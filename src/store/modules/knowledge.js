import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const knowledge = {
  state: {
    knowledgePoints: {}
  },
  mutations: {
    //保存知识点
    assignKnowledgePoints(state, payload) {
      state.knowledgePoints = payload;
    }
  },
  actions: {
    //获取知识点
    getKnowledgePoints() {
      return axios.get(`${PUBLICAXIOS}/api/index/getKnowledgePoints`);
    },
    // 获取所有试卷
    getAllPaper() {
      return axios.get(`${PUBLICAXIOS}/api/index/getallpaper`);
    },
    // 获取试卷
    getPaper(context, payload) {
      return axios.get(
        `${PUBLICAXIOS}/api/index/getpaperlist?PaperId=${payload}`
      );
    },
    // 记录考试成绩记录
    recording(context, payload) {
      axios
        .post(`${PUBLICAXIOS}/api/index/storerecords`, payload)
        .then(res => {});
    }
  },
  getters: {}
};
export default knowledge;
