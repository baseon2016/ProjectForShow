import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const main = {
  state: {
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
    showMask: false
  },
  mutations: {
    //首页大图路径赋值
    //
    // getBanner(state, payload) {
    //   state.bannerImg = payload;
    // },
    // 获取新闻公告
    getNews(state, payload) {
      state.subNewsData.news.content = payload.news;
      state.subNewsData.notice.content = payload.notice;
    },
    doShowMask(state, payload) {
      state.showMask = payload;
    }
  },
  actions: {
    loadInfo({ state, commit }, payload) {
      // loading 待轮播图片转后端数据开启
      // const loading = payload({
      //   lock: true,
      //   background: "rgba(0,0,0,0.8)"
      // });
      // 首页大图
      // axios.get(`${PUBLICAXIOS}/api/index/getImgFile`).then(res => {
      //   // console.log(res);
      //   commit("getBanner", res.data.Data.FilePath);
      //   loading.close();
      // });
      // 获取所有工艺
      // axios.get(`${PUBLICAXIOS}/api/index/getResCategorylist`).then(res => {
      //   // console.log(res.data.Data);
      //   commit("getCategories", res.data.Data);
      // });
      //公告新闻帮助中心
      const noticeType = state.subNewsData.notice.CategoryType;
      const newsType = state.subNewsData.news.CategoryType;
      axios.get(`${PUBLICAXIOS}/api/index/getInforMationlist`).then(res => {
        // 筛选数据为新闻和公告
        let news = res.data.Data.filter(item => item.CategoryType === newsType);
        news = news.slice(0, 5);
        let notice = res.data.Data.filter(
          item => item.CategoryType === noticeType
        );
        notice = notice.slice(0, 5);
        commit("getNews", { news, notice });
      });
    }
  }
};
export default main;
