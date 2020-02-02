<template>
  <div class="select-item df">
    <h4 v-if="title" class="input-title">
      <span v-if="essential">*</span>
      {{ title }}
    </h4>
    <el-select
      :value="val"
      @change="userInput"
      placeholder="请选择身份类别"
      :style="{ width: inputWidth }"
      class="common-select"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.text"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "select-item",
  data() {
    return {
      options: [
        { text: "危化企业主要负责人", value: "1" },
        { text: "安全管理人员", value: "2" },
        { text: "特种作业人员", value: "3" },
        { text: "从业人员", value: "4" },
        { text: "危化企业执法监管人员", value: "5" }
      ]
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
    inputWidth: {
      type: String,
      default: "100%"
    }
  },
  methods: {
    userInput(e) {
      this.$emit("input", { attr: this.attr, val: e });
    }
  },
  computed: {
    ...mapState({
      userRegister: state => state.login.userRegister
    })
  }
};
</script>

<style>
.select-item {
  margin-bottom: 18px;
  font-size: 14px;
}
.select-item h4.input-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: #666;
  width: 100px;
  margin-right: 10px;
  text-align: right;
}
.select-item h4 span {
  color: #ff4200;
}
.select-item select {
  display: block;
  font-size: 14px;
  color: #333;
  line-height: 36px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  padding-left: 30px;
  height: 39px;
}
.select-item select:focus {
  border-color: #2a4793;
}
/* 设置select选中时边框样式 */
.common-select.el-select .el-input__inner:focus {
  border-color: #2a4793;
}
.common-select.el-select .el-input.is-focus .el-input__inner {
  border-color: #2a4793;
}
/* 设置select框内文字样式 */
.common-select .el-input__inner {
  color: #333;
}
/* 设置已选中选项颜色 */
.el-select-dropdown__item.selected span {
  color: #2a4793;
}
</style>
