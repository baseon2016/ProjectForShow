import axios from "axios";
import { PUBLICAXIOS } from "../../js/publicPath";
const user = {
  state: {
    // 用户页选项卡配置
    userCard: [
      { CategoryId: "01", CategoryName: "基本信息" },
      { CategoryId: "02", CategoryName: "修改密码" },
      { CategoryId: "03", CategoryName: "分数信息" },
      { CategoryId: "04", CategoryName: "用户消息" },
      { CategoryId: "05", CategoryName: "购买积分" }
    ],
    options: [
      { text: "危化企业主要负责人", value: "1" },
      { text: "安全管理人员", value: "2" },
      { text: "特种作业人员", value: "3" },
      { text: "从业人员", value: "4" },
      { text: "危化企业执法监管人员", value: "5" }
    ],
    userInfo: {
      UserName: "",
      UserMobile: "",
      UserEmail: "",
      IdCard: "",
      Resource: "",
      UserType: ""
    },
    userScorePractice: [
      {
        Id: "1",
        PaperName: "练习科目一",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      },
      {
        Id: "2",
        PaperName: "练习科目三",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      },
      {
        Id: "3",
        PaperName: "练习科目四",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      },
      {
        Id: "4",
        PaperName: "练习科目二",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      }
    ],
    userScoreMock: [
      {
        Id: "1",
        PaperName: "模拟科目一",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      },
      {
        Id: "2",
        PaperName: "模拟科目三",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      },
      {
        Id: "3",
        PaperName: "模拟科目四",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      },
      {
        Id: "4",
        PaperName: "模拟科目二",
        Status: "学习中",
        Score: 100,
        Createtime: "2019-11-28 13:10",
        Duration: 100
      }
    ],
    userScoreKnowledge: [],
    userScoreTab: null,
    topNav: false,
    userMsgs: [
      // {
      //   MesId: "43243242",
      //   Title: "系统临时通知测试",
      //   Remark:
      //     "系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试系统临时通知测试",
      //   Createtime: "2019-10-22T16:01:55.43",
      //   MesDetailId: "324233453",
      //   IsRead: 0
      // }
    ],
    token: {
      userPassword: "",
      confirmPassword: ""
    },
    paypal: null
  },
  mutations: {
    // 右侧用户数据赋值本地
    assignUser(state, payload) {
      state.userInfo = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = { ...state.userInfo, [payload.attr]: payload.val };
    },
    setToken(state, payload) {
      state.token = { ...state.token, [payload.attr]: payload.val };
    },
    clearToken(state) {
      state.token = {
        userPassword: "",
        confirmPassword: ""
      };
    },
    // 保存练习和模拟的分数信息
    assignUserScore(state, payload) {
      state.userScore = payload;
    },
    // 保存理论考试分数信息
    assignUserScoreKnowledge(state, payload) {
      state.userScoreKnowledge = payload;
    },
    // 用户分数信息添加选项练习和模拟
    switchUserScoreTab(state, payload) {
      state.userScoreTab = payload;
    },
    setTopNav(state, payload) {
      state.topNav = payload;
    },
    assignUserMsgs(state, payload) {
      state.userMsgs = payload;
    },
    setIsRead(state, payload) {
      // 镜像消息数据,修改其中传参项为已读
      const read = state.userMsgs.map(item => {
        if (item.MesDetailId === payload) {
          return { ...item, IsRead: 1 };
        } else {
          return item;
        }
      });
      state.userMsgs = read;
    },
    setIsDetail(state, payload) {
      // 展开消息详情,修改其中传参项为详细信息状态
      const detail = state.userMsgs.map(item => {
        if (item.MesDetailId === payload) {
          return { ...item, showDetail: !item.showDetail };
        } else {
          return item;
        }
      });
      state.userMsgs = detail;
    },
    // 赋值本地购买订单信息
    assignPaypal(state, payload) {
      state.paypal = payload;
    }
  },
  actions: {
    // 右侧用户数据获取后台
    getUser({ state, commit }, payload) {
      // 左侧选项卡手动配置
      commit("assignTechs", state.userCard);
      // 首页顶部新消息导航点击事件进入到user
      if (state.topNav) {
        commit("setTopNav", false);
      } else {
        // 默认当前激活选项卡第一项
        commit("getCurrent", state.userCard[0]);
      }

      // 获取用户基础信息
      axios
        .get(`${PUBLICAXIOS}/api/user/getuserinfo?id=${payload}`)
        .then(res => {
          if (res.data.Result) {
            commit("assignUser", res.data.Data);
          }
        });

      // 获取用户分数信息
      // axios
      //   .get(`${PUBLICAXIOS}/api/user/getuserpaperorders?userid=${payload}`)
      //   .then(res => {
      //     if (res.data.Result) {
      //       commit("assignUserScore", res.data.Data);
      //     }
      //   });
      // 获取用户理论考试分数
      axios
        .get(`${PUBLICAXIOS}/api/index/getstorerecords?userid=${payload}`)
        .then(res => {
          if (res.data.Result) {
            // console.log(res);

            commit("assignUserScoreKnowledge", res.data.Data);
          }
        });
      // 获取用户消息信息
      axios
        .get(`${PUBLICAXIOS}/api/user/getusermes?userid=${payload}`)
        .then(res => {
          // console.log(res);
          if (res.data.Result) {
            let showMsgs = res.data.Data.map(item => {
              let rst = { ...item, showDetail: false };
              return rst;
            });
            commit("assignUserMsgs", showMsgs);
          }
        });
    },
    // 单独获取用户基本信息(当用户取消更改用户信息时,重新获取并恢复显示用户原信息)
    getUserInfo({ commit }, payload) {
      // 获取用户基础信息
      axios
        .get(`${PUBLICAXIOS}/api/user/getuserinfo?id=${payload}`)
        .then(res => {
          // console.log(res);
          if (res.data.Result) {
            commit("assignUser", res.data.Data);
          }
        });
    },
    // 更新用户基本信息,校验确认变更
    async updateUser({ state }, payload) {
      // 获取用户原来信息
      const oldUserInfo = await axios.get(
        `${PUBLICAXIOS}/api/user/getuserinfo?id=${payload.UserId}`
      );
      const { userInfo } = state;
      // 判断函数,用户信息存在变更，可以修改，不存在，则不可修改
      function diff(userInfo, oldUserInfo) {
        for (var ele in userInfo) {
          if (userInfo[ele] !== oldUserInfo[ele]) {
            return true;
          }
        }
        return false;
      }
      const {
        UserName,
        UserMobile,
        UserEmail,
        Resource,
        IdCard,
        UserType
      } = userInfo;
      if (
        // 用户输入非空
        UserName.trim() &&
        UserMobile.trim() &&
        UserEmail.trim() &&
        Resource.trim() &&
        IdCard.trim() &&
        UserType.trim()
      ) {
        if (diff(userInfo, oldUserInfo.data.Data)) {
          axios
            .post(`${PUBLICAXIOS}/api/user/updateuser`, {
              UserId: payload.UserId,
              ...state.userInfo
            })
            .then(res => {
              if (res.data.Result) {
                payload.message("success", res.data.Message);
              } else {
                payload.message("error", res.data.Message);
              }
            });
        } else {
          payload.message("error", "用户信息没有变更");
        }
      } else {
        payload.message("error", "用户信息不能为空");
      }
    },
    // 更新用户密码
    updateUserPassword({ state, commit, dispatch }, payload) {
      const { userPassword, confirmPassword } = state.token;
      if (userPassword.trim()) {
        if (userPassword === confirmPassword) {
          axios
            .post(`${PUBLICAXIOS}/api/user/updateuserpass`, {
              UserId: payload.UserId,
              UserPass: userPassword
            })
            .then(async res => {
              if (res.data.Result) {
                payload.message("success", res.data.Message);
                commit("clearToken");
                const request = await dispatch("logoutAxios", payload.UserId);
                if (request.data.Result) {
                  localStorage.removeItem("UserName");
                  localStorage.removeItem("UserId");
                  sessionStorage.removeItem("UserName");
                  sessionStorage.removeItem("UserId");
                  payload.$router.push("/login");
                }
              } else {
                payload.message("error", res.data.Message);
              }
            });
        } else {
          payload.message("error", "新密码与确认密码不一致");
        }
      } else {
        payload.message("error", "新密码不能为空");
      }
    },
    // 单独获取用户消息信息
    getUserMsgs({ commit }, payload) {
      axios
        .get(`${PUBLICAXIOS}/api/user/getusermes?userid=${payload}`)
        .then(res => {
          // console.log(res);
          if (res.data.Result) {
            let showMsgs = res.data.Data.map(item => {
              let rst = { ...item, showDetail: false };
              return rst;
            });
            commit("assignUserMsgs", showMsgs);
          }
        });
    },
    // 更新用户消息已读状态
    updateIsRead({ commit }, payload) {
      if (!payload.IsRead) {
        axios
          .get(
            `${PUBLICAXIOS}/api/user/getusermesdetail?mesdetailid=${payload.MesDetailId}`
          )
          .then(res => {
            if (res.data.Result) {
              // 点击详情时如果修改本地state 已读状态，信息会自动跳到已读信息区域，并重新排序，不便于阅读，所以本地状态不更改
              // commit("setIsRead", payload.MesDetailId);
            }
          });
      }
      commit("setIsDetail", payload.MesDetailId);
    },
    // 获取订单信息
    getOrderInfo({ commit }, payload) {
      axios
        .get(
          `${PUBLICAXIOS}/api/wxpay/url?userid=${payload.id}&&money=${payload.money}`
        )
        .then(res => {
          console.log(res);

          commit("assignPaypal", res.data.Data);
        });
    }
  },
  getters: {
    UserTypeText(state) {
      if (state.userInfo.UserType) {
        // 根据用户UserType代码返回用户类型名称
        const type = state.options.find(
          item => item.value === state.userInfo.UserType
        );
        return type.text;
      } else {
        return "";
      }
    },
    userScoreCurrentData(state) {
      return (currentPage, pageSize) => {
        if (state.userScoreTab === "0") {
          return state.userScorePractice.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          );
        }
        if (state.userScoreTab === "1") {
          return state.userScoreMock.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          );
        }
        if (state.userScoreTab === "2") {
          return state.userScoreKnowledge.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          );
        }
      };
    },
    newMsgs(state) {
      return state.userMsgs.filter(item => item.IsRead === 0);
    },
    showMsgs(state) {
      let showMsgs = state.userMsgs;
      const newMsgs = showMsgs.filter(item => item.IsRead === 0);
      const oldMsgs = showMsgs.filter(item => item.IsRead === 1);
      return [...newMsgs.reverse(), ...oldMsgs.reverse()];
    }
  }
};
export default user;
