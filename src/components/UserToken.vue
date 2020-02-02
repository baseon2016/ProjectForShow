<template>
  <div class="user-token mg-t-14">
    <div class="info-area">
      <div class="info-title">
        <h3>
          当前登录账号:
          <span>{{UserName}}</span>
        </h3>
      </div>
      <InputItem
        title="新密码"
        attr="userPassword"
        inputType="password"
        :inputWidth="userInputWidth"
        :val="token.userPassword"
        @input="handleInput"
        placeholder="请输入8-16位新密码"
      />
      <InputItem
        title="确认密码"
        attr="confirmPassword"
        inputType="password"
        :inputWidth="userInputWidth"
        :val="token.confirmPassword"
        @input="handleInput"
        placeholder="请再次输入新密码"
      />
      <div class="btn-po">
        <Button text="更改密码" @btnClick="changePassword" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import InputItem from "./common/InputItem";
import Button from "./common/Button";
export default {
  name: "token",
  data() {
    return {
      userInputWidth: 310 + "px"
    };
  },
  components: {
    InputItem,
    Button
  },
  props: {
    UserId: {
      type: String,
      required: true
    },
    UserName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  methods: {
    ...mapMutations(["setToken", "clearToken"]),
    ...mapActions(["updateUserPassword"]),
    handleInput(e) {
      this.setToken(e);
    },
    changePassword() {
      this.$confirm("确认修改账号密码", "修改密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          const { UserId, message, $router } = this;
          this.updateUserPassword({ UserId, message, $router });
        })
        .catch(() => {
          this.clearToken();
        });
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
.info-title {
  margin-left: -28px;
}
.info-title h3 {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 32px;
}
</style>