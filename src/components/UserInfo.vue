<template>
  <div class="user-info mg-t-14">
    <div class="info-area">
      <InputItem
        title="用户名"
        :essential="true"
        attr="UserName"
        :inputWidth="userInputWidth"
        :val="userInfo.UserName"
        @input="handleInput"
        placeholder="请输入用户名"
      />
      <InputItem
        title="手机号"
        :essential="true"
        attr="UserMobile"
        inputType="number"
        :inputWidth="userInputWidth"
        :disabled="true"
        :val="userInfo.UserMobile"
        @input="handleInput"
        placeholder="请输入手机号"
      />
      <InputItem
        title="邮箱"
        attr="UserEmail"
        inputType="email"
        :inputWidth="userInputWidth"
        :val="userInfo.UserEmail"
        @input="handleInput"
        placeholder="请输入邮箱"
      />

      <InputItem
        title="所属单位"
        attr="Resource"
        :inputWidth="userInputWidth"
        :val="userInfo.Resource"
        @input="handleInput"
        placeholder="请输入所属单位"
      />
      <InputItem
        title="身份类别"
        :essential="true"
        attr="UserType"
        :inputWidth="userInputWidth"
        :disabled="true"
        :val="UserTypeText"
        placeholder="请输入身份类别"
      />
      <div class="btn-po">
        <Button text="保存" @btnClick="saveUserChange" />
      </div>
    </div>
  </div>
</template>

<script>
import InputItem from "./common/InputItem";
import Button from "./common/Button";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "user-info",
  data() {
    return {
      userInputWidth: 310 + "px"
    };
  },
  props: {
    UserId: {
      type: String,
      required: true
    }
  },
  components: {
    InputItem,
    Button
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["UserTypeText"])
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    ...mapActions(["updateUser", "getUserInfo"]),
    handleInput(e) {
      this.setUserInfo(e);
    },
    saveUserChange() {
      this.$confirm("确认修改账户信息", "修改账户信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          const { UserId, message } = this;
          this.updateUser({ UserId, message });
        })
        .catch(() => {
          this.getUserInfo(this.UserId);
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
.info-area {
  background-color: #fff;
  padding: 40px 62px;
}
.btn-po {
  font-size: 12px;
  margin-left: 84px;
}
</style>
