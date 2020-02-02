import axios from "axios";
import common from "../../js/common";
import { PUBLICAXIOS } from "../../js/publicPath";
const forgotpassword = {
  state: {
    retrive: {
      UserMobile: "",
      ValCode: "",
      UserPass: "",
      confirmPass: ""
    }
  },
  mutations: {
    setRetrive(state, payload) {
      state.retrive = { ...state.retrive, [payload.attr]: payload.val };
    },
    clearRetrive(state) {
      state.retrive = {
        UserMobile: "",
        ValCode: "",
        UserPass: "",
        confirmPass: ""
      };
    }
  },
  actions: {
    // 忘记密码验证手机号
    forgotPasswordVerifyMobile({ state }) {
      const { UserMobile } = state.retrive;
      return common.verifyMobileExist(UserMobile);
    },
    // 忘记密码请求手机验证码
    forgotpasswordMobileCode({ state }) {
      const { UserMobile } = state.retrive;
      return common.requestMobileCode(UserMobile);
    },
    resetPassword({ state, commit }, payload) {
      // 请求重设密码
      const { UserMobile, ValCode, UserPass, confirmPass } = state.retrive;
      if (UserPass.trim()) {
        if (UserPass === confirmPass) {
          axios
            .post(`${PUBLICAXIOS}/api/user/userbackpass`, {
              LoginAccount: UserMobile,
              Password: UserPass,
              ValCode: ValCode
            })
            .then(res => {
              if (res.data.Result) {
                payload.message("success", res.data.Message);
                commit("clearRetrive");
                payload.$router.push("/login");
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
    }
  }
};
export default forgotpassword;
