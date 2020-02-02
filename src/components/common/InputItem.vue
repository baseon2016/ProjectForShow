<template>
  <div class="input-item">
    <div class="df">
      <h4 v-if="title" class="input-title">
        <span v-if="essential">*</span>
        {{ title }}
      </h4>
      <input
        :value="val"
        :placeholder="placeholder"
        :type="inputType"
        :disabled="disabled"
        :style="{ width: inputWidth }"
        @input.prevent="userInput"
        spellcheck="false"
        maxlength="20"
      />
    </div>
    <span class="reg-tip" v-if="regExp">{{ regExp }}</span>
  </div>
</template>

<script>
export default {
  name: "input-item",
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
    inputType: {
      type: String,
      default: "text"
    },
    inputWidth: {
      type: String,
      default: "100%"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    regExp: {
      type: String,
      default: ""
    }
  },
  methods: {
    userInput(e) {
      this.$emit("input", { attr: this.attr, val: e.target.value });
    }
  }
};
</script>

<style>
.input-item {
  margin-bottom: 20px;
  font-size: 14px;
}
.input-item h4.input-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: #666;
  width: 100px;
  margin-right: 10px;
  text-align: right;
}
.input-item h4 span {
  color: #ff4200;
}
.input-item input {
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
.input-item input:focus {
  border-color: #2a4793;
}
.reg-tip {
  font-size: 12px;
  font-weight: normal;
  color: #ff4200;
}
/* .input-item span {
  display: block;
  font-size: 20px;
  color: #838383;
  line-height: 40px;
  margin-bottom: 20px;
  padding-left: 30px;
} */

/* 输入内容为数字类型时，谷歌浏览器和火狐浏览器会出现上下箭头按钮，去掉的方法如下 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
   -webkit-appearance: none !important;
}
input[type="number"] {
   -moz-appearance: textfield;
}
/* input placeholder颜色设置 */
input::-webkit-input-placeholder {
  color: #c0c4cc;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #c0c4cc;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #c0c4cc;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c0c4cc;
}
</style>
