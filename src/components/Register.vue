<template>
  <div class="log-sheet">
    <InputItem
      title="用户名"
      :essential="true"
      attr="UserName"
      :inputWidth="inputWidth"
      :val="userRegister.UserName"
      placeholder="请输入用户名"
      @input="handleInput"
      :regExp="regExpTip.UserName"
    />
    <InputItem
      title="手机号"
      :essential="true"
      attr="UserMobile"
      :inputWidth="inputWidth"
      :val="userRegister.UserMobile"
      placeholder="请输入手机号"
      @input="handleInput"
      :regExp="regExpTip.UserMobile"
    />

    <VerifyMobile
      title="验证码"
      :essential="true"
      attr="ValCode"
      :inputWidth="inputWidth"
      :val="userRegister.ValCode"
      placeholder="短信验证码"
      @input="handleInput"
      :UserMobile="UserMobile"
      process="register"
    />
    <InputItem
      title="密码"
      :essential="true"
      attr="UserPass"
      :inputWidth="inputWidth"
      inputType="password"
      :val="userRegister.UserPass"
      placeholder="设置密码"
      @input="handleInput"
      :regExp="regExpTip.UserPass"
    />
    <InputItem
      title="确认密码"
      :essential="true"
      attr="confirmPass"
      :inputWidth="inputWidth"
      inputType="password"
      :val="userRegister.confirmPass"
      placeholder="确认密码"
      @input="handleInput"
    />
    <InputItem
      title="邮箱"
      attr="UserEmail"
      :inputWidth="inputWidth"
      inputType="email"
      :val="userRegister.UserEmail"
      placeholder="邮箱号码"
      @input="handleInput"
      :regExp="regExpTip.UserEmail"
    />

    <InputItem
      title="所属单位"
      attr="Resource"
      :inputWidth="inputWidth"
      :val="userRegister.Resource"
      placeholder="所属单位"
      @input="handleInput"
    />
    <SelectItem
      title="身份类别"
      :essential="true"
      attr="UserType"
      :inputWidth="inputWidth"
      :val="userRegister.UserType"
      placeholder="身份类别"
      @input="handleInput"
    />
    <div class="btn-lg-po">
      <ButtonLg
        text="注册"
        @btnClick="register({ message, $router, keepLogged })"
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
import SelectItem from "./common/SelectItem";
import VerifyMobile from "./common/VerifyMobile";
import ButtonLg from "./common/ButtonLg";
export default {
  name: "register",
  data() {
    return {
      inputWidth: 100 + "%",
      keepLogged: true
    };
  },
  components: {
    InputItem,
    SelectItem,
    VerifyMobile,
    ButtonLg
  },
  computed: {
    ...mapState({
      userRegister: state => state.login.userRegister,
      regExpTip: state => state.login.regExpTip,
      UserMobile: state => state.login.userRegister.UserMobile
    })
  },
  methods: {
    ...mapMutations(["setUserRegister", "clear"]),
    ...mapActions(["register", "requestValCode"]),
    handleInput(e) {
      this.setUserRegister(e);
    },
    handleVerify(payload) {
      this.requestValCode(payload);
    },
    message(type, text) {
      this.$message({
        center: true,
        type: type,
        message: text
      });
    },

    transChecker() {
      this.keepLogged = !this.keepLogged;
    }
  }
};
</script>

<style></style>
