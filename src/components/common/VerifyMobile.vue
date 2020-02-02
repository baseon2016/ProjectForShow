<template>
  <div class="mobile-verify po-r df">
    <h4 v-if="title" class="input-title">
      <span v-if="essential">*</span>
      {{ title }}
    </h4>
    <input
      type="text"
      :value="val"
      :placeholder="placeholder"
      :style="{ width: inputWidth }"
      @input.prevent="userInput"
      spellcheck="false"
      maxlength="20"
    />
    <div class="mobile-sendcode po-a">
      <span v-if="readyToSend" @click="sendRequest">发送验证码</span>
      <span v-else class="unable-tosend">{{ countDown }}秒后可重新发送</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "mobile-verify",

  data() {
    return {
      readyToSend: true,
      countDown: 60
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    essential: {
      type: Boolean,
      default: false
    },
    attr: {
      type: String,
      required: true
    },
    val: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: "请提示输入内容"
    },

    inputWidth: {
      type: String,
      default: "100%"
    },
    UserMobile: {
      type: String,
      required: true
    },
    process: {
      type: String,
      required: true
    }
  },

  methods: {
    ...mapActions([
      "forgotPasswordVerifyMobile",
      "forgotpasswordMobileCode",
      "registerVerifyMobile",
      "registerMobileCode"
    ]),
    userInput(e) {
      // 输入框不是数字输入，直接调用自定义事件

      this.$emit("input", { attr: this.attr, val: e.target.value });
    },
    async sendRequest() {
      // 声明倒计时函数
      const changeCountDown = () => {
        this.countDown--;
        // console.log(this.countDown);
        if (this.countDown === 0) {
          this.readyToSend = true;
          this.countDown = 60;
          clearInterval(eta);
        }
      };
      //   判断当前状态可发送
      if (this.readyToSend) {
        const re = /^1[3456789]\d{9}$/;
        if (this.UserMobile.trim().match(re)) {
          //   切换为等待发送状态
          this.readyToSend = false;
          // 计时器倒计时至0，修改状态为可发送
          var eta = setInterval(changeCountDown, 1000);
          // 忘记密码验证码过程
          if (this.process === "forgotpassword") {
            const isExist = await this.$store.dispatch(
              "forgotPasswordVerifyMobile"
            );
            // 忘记密码校验手机号已注册
            if (isExist.data.Result) {
              const mobileCode = await this.$store.dispatch(
                "forgotpasswordMobileCode"
              );
              // 发送验证码成功
              if (mobileCode.data.Result) {
                this.message("warn", mobileCode.data.Message);
                // 发送验证码失败
              } else {
                this.message("error", mobileCode.data.Message);
              }
              // 忘记密码手机号未注册
            } else {
              this.message("error", isExist.data.Message);
            }
          } else if (this.process === "register") {
            const isExist = await this.$store.dispatch("registerVerifyMobile");
            // 注册过程校验手机号已注册
            if (isExist.data.Result) {
              this.message("error", "手机号已注册");
              // 注册过程手机号未注册
            } else {
              const mobileCode = await this.$store.dispatch(
                "registerMobileCode"
              );
              // 发送验证码成功
              if (mobileCode.data.Result) {
                // 问题点，错误的手机号也会发送验证码成功，待改善
                // 发送验证码失败
                if (mobileCode.data.ErrorCode !== "200") {
                  this.message("warn", mobileCode.data.Message);
                }
              } else {
                this.message("error", "发送验证码失败");
              }
            }
          }
        } else {
          // console.log(this.UserMobile.trim().match(re));
          this.message("error", "请输入正确的手机号码");
        }
      }
    },
    message(type, text) {
      this.$message({
        showClose: true,
        center: true,
        type: type,
        message: text
      });
    }
  }
};
</script>

<style>
.mobile-verify {
  margin-bottom: 20px;
}
.mobile-verify h4.input-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: #666;
  width: 100px;
  margin-right: 10px;
  text-align: right;
}
.mobile-verify h4 span {
  color: #ff4200;
}
.mobile-verify input {
  display: block;
  font-size: 14px;
  color: #333;
  height: 36px;
  line-height: 36px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  padding-left: 30px;
  user-select: none;
  cursor: pointer;
}
.mobile-verify input:focus {
  border-color: #2a4793;
}
.mobile-verify .mobile-sendcode {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-left: 2px solid #e3e7ed;
}
.mobile-verify .mobile-sendcode {
  font-size: 14px;
  color: #333;
  line-height: 16px;
  padding: 0 18px;
  color: #5272c6;
}
.mobile-verify .mobile-sendcode span {
  cursor: pointer;
  user-select: none;
}
.mobile-verify .mobile-sendcode span.unable-tosend {
  color: #c0c4cc;
}
</style>
