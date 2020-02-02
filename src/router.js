//路由相关配置
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import LoginMain from "./components/LoginMain.vue";
import ForgotPassword from "./components/ForgotPassword.vue";
import Main from "./components/Main";
import Learn from "./components/Learn.vue";
import LearnDetail from "./components/LearnDetail.vue";
import Practice from "./components/Practice.vue";
import MockExam from "./components/MockExam.vue";
import CourseDetail from "./components/CourseDetail.vue";
import User from "./components/User.vue";
import AboutUs from "./components/AboutUs.vue";
import HelpInfo from "./components/HelpInfo.vue";
import NewsTable from "./components/NewsTable.vue";
import NewsDetail from "./components/NewsDetail.vue";
import Knowledge from "./components/Knowledge.vue";
import KnowledgeLearn from "./components/KnowledgeLearn.vue";
import KnowledgeExam from "./components/KnowledgeExam.vue";
import Error from "./components/Error.vue";
//给vue项目安装路由功能
Vue.use(VueRouter);
//创建路由
const routes = [
  {
    component: Home,
    // /服务器跟地址
    path: "/",
    children: [
      {
        component: Main,

        path: ""
      },
      {
        component: Learn,

        path: "learn"
      },

      {
        component: Practice,

        path: "practice"
      },
      {
        component: MockExam,

        path: "mock-exam"
      },
      {
        component: User,
        path: "user"
      },
      {
        component: AboutUs,
        path: "aboutus"
      },
      {
        component: HelpInfo,
        path: "help"
      },
      {
        component: NewsTable,
        path: "news"
      },
      {
        component: NewsDetail,
        path: "news/:id"
      },
      {
        component: Knowledge,
        path: "knowledge"
      },
      {
        component: KnowledgeLearn,
        path: "knowledge-learn"
      },
      {
        component: KnowledgeExam,
        path: "knowledge-exam"
      }
    ]
  },
  {
    component: LearnDetail,

    path: "/learn/:id"
  },
  {
    component: CourseDetail,

    path: "/course/:id"
  },
  {
    component: Login,
    path: "/login",
    children: [
      {
        component: LoginMain,
        path: ""
      },
      {
        component: ForgotPassword,
        path: "forgotpassword"
      }
    ]
  },
  {
    component: Error,
    path: "*"
  }
];
const router = new VueRouter({
  routes,
  mode: "hash"
});
export default router;
