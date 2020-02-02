import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const news = {
  state: {
    // 新闻页页选项卡配置
    newsCard: [
      { CategoryId: "01", CategoryName: "更多新闻" },
      { CategoryId: "02", CategoryName: "更多公告" }
    ],
    newsDetailCard: [{ CategoryId: "01", CategoryName: "新闻公告详情" }],
    subNewsData: {
      news: {
        category: "新闻",
        CategoryType: "2",
        content: []
      },
      notice: {
        category: "公告",
        CategoryType: "1",
        content: []
      }
    },
    newsDetailData: {
      title: "测试标题",
      remark: "测试内容测试内容"
    }
  },
  mutations: {
    // 右侧新闻列表赋值本地
    assignNews(state, payload) {
      state.subNewsData.news.content = payload.news;
      state.subNewsData.notice.content = payload.notice;
    },
    assignNewsDetail(state, payload) {
      state.newsDetailData = payload;
    }
  },
  actions: {
    // 右侧新闻数据获取后台
    getNewsList({ state, commit }) {
      // 左侧选项卡手动配置
      commit("assignTechs", state.newsCard);
      // 默认当前激活选项卡第一项
      commit("getCurrent", state.newsCard[0]);

      //公告新闻帮助中心
      const noticeType = state.subNewsData.notice.CategoryType;
      const newsType = state.subNewsData.news.CategoryType;
      axios.get(`${PUBLICAXIOS}/api/index/getInforMationlist`).then(res => {
        // console.log(res);
        // 筛选数据为新闻和公告
        let news = res.data.Data.filter(item => item.CategoryType === newsType);
        let notice = res.data.Data.filter(
          item => item.CategoryType === noticeType
        );
        commit("assignNews", { news, notice });
      });
    },
    // 右侧内部新闻详情数据获取后台
    getNewsDetail({ state, commit }, payload) {
      // 左侧选项卡手动配置
      commit("assignTechs", state.newsDetailCard);
      // 默认当前激活选项卡第一项
      commit("getCurrent", state.newsDetailCard[0]);
      //根据新闻ID 获取详情信息
      axios
        .get(`${PUBLICAXIOS}/api/index/getInforMation?id=${payload.id}`)
        .then(res => {
          commit("assignNewsDetail", res.data.Data);
          if (!res.data.Data) {
            payload.$router.push("/xxx");
          }
        });
    }
  },
  getters: {
    newsTotalNum(state, getters) {
      const { currentCategoryName } = getters;
      const current =
        currentCategoryName === "更多新闻"
          ? "news"
          : currentCategoryName === "更多公告"
          ? "notice"
          : "";

      return state.subNewsData[current].content.length;
    },
    newsCurrentData(state, getters) {
      return (currentPage, pageSize) => {
        const { currentCategoryName } = getters;
        const current =
          currentCategoryName === "更多新闻"
            ? "news"
            : currentCategoryName === "更多公告"
            ? "notice"
            : "";
        return state.subNewsData[current].content.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        );
      };
    }
  }
};
export default news;
