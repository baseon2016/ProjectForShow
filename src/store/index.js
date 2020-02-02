import Vue from "vue";
import Vuex from "vuex";
// import createLogger from "vuex/dist/logger";
import main from "./modules/main";
import technology from "./modules/technology";
import learn from "./modules/learn";
import techs from "./modules/techs";
import practice from "./modules/practice";
import mockExam from "./modules/mockExam";
import onlineExam from "./modules/onlineExam";
import user from "./modules/user";
import help from "./modules/help";
import aboutUs from "./modules/aboutUs";
import login from "./modules/login";
import forgotpassword from "./modules/forgotpassword";
import news from "./modules/news";
import baiduApi from "./modules/baiduApi";
import knowledge from "./modules/knowledge";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    main,
    technology,
    learn,
    techs,
    practice,
    mockExam,
    onlineExam,
    user,

    help,
    aboutUs,
    login,
    forgotpassword,
    news,
    baiduApi,
    knowledge
  }
  // plugins: [createLogger()]
});

export default store;
