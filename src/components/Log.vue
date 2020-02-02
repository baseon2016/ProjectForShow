<template>
  <div class="log-sheet">
    <InputItem
      title="手机号"
      attr="LoginAccount"
      inputWidth="100%"
      :val="user.LoginAccount"
      @input="handleInput"
      class="mg-b-32"
      placeholder="请输入手机号"
    />
    <InputItem
      title="密码"
      attr="Password"
      inputWidth="100%"
      inputType="password"
      :val="user.Password"
      @input="handleInput"
      class="mg-b-32"
      placeholder="请输入密码"
    />
    <VerifyCode title="验证码" ref="verifycode" class="mg-b-32" />
    <div class="btn-lg-po">
      <ButtonLg
        text="登陆"
        @btnClick="login({ message, checking, $router, keepLogged })"
      />
    </div>
    <div class="keep-logged df">
      <div class="checker df" @click="transChecker">
        <div>
          <img v-if="keepLogged" src="../assets/images/checked.png" />
          <img v-else src="../assets/images/checked2.png" />
        </div>
        <span>保持登录状态</span>
      </div>
      <router-link to="/login/forgotpassword" tag="span" class="retrive"
        >忘记密码?</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import InputItem from "./common/InputItem";
import ButtonLg from "./common/ButtonLg";
import VerifyCode from "./common/VerifyCode";
export default {
  name: "log-sheet",
  data() {
    return {
      keepLogged: true
    };
  },
  components: {
    InputItem,
    ButtonLg,
    VerifyCode
  },
  computed: {
    ...mapState({
      user: state => state.login.user
    })
  },
  methods: {
    ...mapMutations(["setUserLog", "clear"]),
    ...mapActions(["login"]),
    handleInput(e) {
      this.setUserLog(e);
    },
    message(type, text) {
      this.$message({
        showClose: true,
        center: true,
        type: type,
        message: text
      });
    },
    checking() {
      const rst = this.$refs.verifycode.checking();
      return rst;
    },

    transChecker() {
      this.keepLogged = !this.keepLogged;
    }
  }
};
</script>

<style>
.log-sheet {
  padding-top: 32px;
  padding-bottom: 25px;
}
.btn-lg-po {
  font-size: 12px;
}

.keep-logged {
  justify-content: space-between;
  margin-top: 20px;
  font-size: 12px;
  color: #959595;
  cursor: pointer;
  user-select: none;
}
.checker {
  align-items: center;
}
.checker img {
  display: block;
  margin-right: 8px;
}
/* span.retrive {
  display: block;
  margin-top: 20px;
  font-size: 12px;
  color: #959595;
  text-align: right;
  cursor: pointer;
} */
span.retrive:hover {
  text-decoration: underline;
}
</style>
