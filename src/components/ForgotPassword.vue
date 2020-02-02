<template>
  <div class="forgot-password mg-0">
    <div class="login-tab df mg-0">
      <div class="log">
        <span class="active-tab">找回密码</span>
      </div>
    </div>
    <div class="login-content mg-0">
      <transition name="route" mode="out-in">
        <div class="log-sheet">
          <InputItem
            title="手机号"
            :essential="true"
            attr="UserMobile"
            :inputWidth="inputWidth"
            :val="retrive.UserMobile"
            placeholder="请输入手机号"
            @input="handleInput"
          />
          <VerifyMobile
            title="验证码"
            :essential="true"
            attr="ValCode"
            :inputWidth="inputWidth"
            :val="retrive.ValCode"
            placeholder="短信验证码"
            @input="handleInput"
            :UserMobile="UserMobile"
            process="forgotpassword"
          />
          <InputItem
            title="密码"
            :essential="true"
            attr="UserPass"
            :inputWidth="inputWidth"
            inputType="password"
            :val="retrive.UserPass"
            placeholder="设置密码"
            @input="handleInput"
          />
          <InputItem
            title="确认密码"
            :essential="true"
            attr="confirmPass"
            :inputWidth="inputWidth"
            inputType="password"
            :val="retrive.confirmPass"
            placeholder="确认密码"
            @input="handleInput"
          />
          <div class="btn-lg-po df">
            <ButtonLg text="返回" @btnClick="goBack" />
            <ButtonLg
              text="重设密码"
              @btnClick="resetPassword({ $router, message })"
              class="mg-l-20"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import InputItem from "./common/InputItem";
import VerifyMobile from "./common/VerifyMobile";
import ButtonLg from "./common/ButtonLg";
export default {
  name: "forgot-password",
  components: {
    InputItem,
    VerifyMobile,
    ButtonLg
  },
  data() {
    return {
      inputWidth: 100 + "%"
    };
  },
  computed: {
    ...mapState({
      retrive: state => state.forgotpassword.retrive,
      UserMobile: state => state.forgotpassword.retrive.UserMobile
    })
  },
  methods: {
    ...mapMutations(["setRetrive"]),
    ...mapActions(["resetPassword"]),
    handleInput(e) {
      this.setRetrive(e);
    },
    goBack() {
      this.$router.back();
    },
    message(type, text) {
      this.$message({
        center: true,
        type: type,
        message: text
      });
    }
  }
};
</script>

<style>
.forgot-password {
  width: 370px;
}
.return img {
  display: block;
  width: 20px;
  cursor: pointer;
  user-select: none;
}
</style>
