import axios from "axios";
import common from "../../js/common";
import { HOMEURL, PUBLICAXIOS } from "../../js/publicPath";
const login = {
  state: {
    tab: "login",
    user: {
      LoginAccount: "",
      Password: ""
    },
    userRegister: {
      UserName: "",
      UserPass: "",
      confirmPass: "",
      UserMobile: "",
      UserEmail: "",
      UserType: "",
      Resource: "",
      IdCard: "",
      ValCode: ""
    },
    regExpTip: {
      UserMobile: null,
      UserName: null,
      UserPass: null,
      UserEmail: null,
      IdCard: null
    }
  },
  mutations: {
    clear(state) {
      // 清空信息
      (state.tab = "login"),
        (state.user = {
          LoginAccount: "",
          Password: ""
        }),
        (state.userRegister = {
          UserName: "",
          UserPass: "",
          confirmPass: "",
          UserMobile: "",
          UserEmail: "",
          UserType: "",
          Resource: "",
          IdCard: "",
          ValCode: ""
        });
    },
    changeTab(state, payload) {
      state.tab = payload;
    },
    // 用户输入登录信息与数据同步变更
    setUserLog(state, payload) {
      state.user = { ...state.user, [payload.attr]: payload.val };
    },
    // 用户输入注册信息与数据同步变更
    setUserRegister(state, payload) {
      state.userRegister = {
        ...state.userRegister,
        [payload.attr]: payload.val
      };
    },
    // 正则判断用户输入规范的返回tip结果
    setRegExpTip(state, payload) {
      state.regExpTip = { ...state.regExpTip, [payload.attr]: payload.val };
    }
  },
  actions: {
    login(context, payload) {
      const { user } = context.state;
      const { LoginAccount, Password } = user;
      if (
        // 用户输入非空
        LoginAccount.trim() &&
        Password.trim()
      ) {
        // 确认验证码无误
        if (payload.checking()) {
          // 登录信息请求
          axios.post(`${PUBLICAXIOS}/api/user/login`, user).then(res => {
            // 返回参数;
            if (res.data.Result) {
              payload.message("success", "恭喜你，登录成功，即将跳转页面……");
              setTimeout(() => {
                // 保持登录状态
                if (payload.keepLogged) {
                  localStorage.setItem("UserName", res.data.Data.UserName);
                  localStorage.setItem("UserId", res.data.Data.UserId);
                } else {
                  sessionStorage.setItem("UserName", res.data.Data.UserName);
                  sessionStorage.setItem("UserId", res.data.Data.UserId);
                }
                // 跳转到主页并清空输入框信息
                context.commit("clear");
                payload.$router.push(HOMEURL);
              }, 1000);
            } else {
              payload.message("error", res.data.Message);
            }
          });
        } else {
          payload.message("error", "验证码输入错误");
        }
      } else {
        payload.message("error", "登录信息不能为空");
      }
    },
    register(context, payload) {
      const { userRegister } = context.state;
      //验证用户名
      const regusername = {
        regstr: /^[\w]{4,11}$/,
        tip: "请输入4-11位的英文、数字、下划线"
      };
      //验证密码
      const regpassword = {
        regstr: /^[\w@#*]{8,16}$/,
        tip: "请输入8-16位的英文、数字、下划线、@、#、*"
      };
      //验证邮箱
      const regemail = {
        regstr: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        tip: "请确认邮箱格式"
      };
      //验证手机
      const regphone = { regstr: /^1\d{10}$/, tip: "请输入11位的手机号" };
      //验证身份证号
      const regid = {
        regstr: /^(\d{15})|(\d{18})$/,
        tip: "请输入15或18位身份证号"
      };
      const {
        UserName,
        UserPass,
        confirmPass,
        UserMobile,
        UserEmail,
        UserType,
        Resource,
        IdCard,
        ValCode
      } = userRegister;
      if (
        // 用户输入非空
        UserName.trim() &&
        UserPass.trim() &&
        UserMobile.trim() &&
        UserEmail.trim() &&
        UserType.trim() &&
        Resource.trim() &&
        IdCard.trim() &&
        ValCode.trim()
      ) {
        // 确认密码无误
        if (confirmPass === UserPass) {
          // 正则判断用户输入规范,并传递前端显示tip信息
          // 用户名
          if (regusername.regstr.test(UserName)) {
            context.commit("setRegExpTip", { attr: "UserName", val: null });
          } else {
            context.commit("setRegExpTip", {
              attr: "UserName",
              val: regusername.tip
            });
          }
          // 密码
          if (regpassword.regstr.test(UserPass)) {
            context.commit("setRegExpTip", { attr: "UserPass", val: null });
          } else {
            context.commit("setRegExpTip", {
              attr: "UserPass",
              val: regpassword.tip
            });
          }
          // 邮箱
          if (regemail.regstr.test(UserEmail)) {
            context.commit("setRegExpTip", { attr: "UserEmail", val: null });
          } else {
            context.commit("setRegExpTip", {
              attr: "UserEmail",
              val: regemail.tip
            });
          }
          // 手机号
          if (regphone.regstr.test(UserMobile)) {
            context.commit("setRegExpTip", { attr: "UserMobile", val: null });
          } else {
            context.commit("setRegExpTip", {
              attr: "UserMobile",
              val: regphone.tip
            });
          }
          // 身份证号
          if (regid.regstr.test(IdCard)) {
            context.commit("setRegExpTip", { attr: "IdCard", val: null });
          } else {
            context.commit("setRegExpTip", { attr: "IdCard", val: regid.tip });
          }
          if (
            regusername.regstr.test(UserName) &&
            regpassword.regstr.test(UserPass) &&
            regemail.regstr.test(UserEmail) &&
            regphone.regstr.test(UserMobile) &&
            regid.regstr.test(IdCard)
          )
            // 注册信息请求
            axios
              .post(`${PUBLICAXIOS}/api/user/register`, userRegister)
              .then(res => {
                // 返回参数
                if (res.data.Result) {
                  payload.message(
                    "success",
                    "恭喜你，注册成功，即将自动登录主页……"
                  );

                  setTimeout(() => {
                    // 保持登录状态
                    if (payload.keepLogged) {
                      localStorage.setItem("UserName", res.data.Data.UserName);
                      localStorage.setItem("UserId", res.data.Data.UserId);
                    } else {
                      sessionStorage.setItem(
                        "UserName",
                        res.data.Data.UserName
                      );
                      sessionStorage.setItem("UserId", res.data.Data.UserId);
                    }
                    // 跳转到主页并清空输入框信息
                    context.commit("clear");
                    payload.$router.push(HOMEURL);
                  }, 1000);
                } else {
                  payload.message("error", res.data.Message);
                }
              });
        } else {
          payload.message("error", "两次输入密码不一致");
        }
      } else {
        payload.message("error", "注册信息不能为空");
      }
    },
    // 注册验证手机号请求
    registerVerifyMobile({ state }) {
      const { UserMobile } = state.userRegister;
      return common.verifyMobileExist(UserMobile);
    },
    // 注册请求手机验证码
    registerMobileCode({ state }) {
      const { UserMobile } = state.userRegister;
      return common.requestMobileCode(UserMobile);
    },
    // 后端登出请求
    logoutAxios(context, payload) {
      return axios.get(
        `${PUBLICAXIOS}/api/user/userloginout?userId=${payload}`
      );
    }
  }
};
export default login;
