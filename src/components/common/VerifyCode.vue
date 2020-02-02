<template>
  <div class="verifycode">
    <!-- <h4>验证码</h4> -->
    <div class="captcha df">
      <h4 v-if="title" class="input-title">
        <span v-if="essential">*</span>
        {{ title }}
      </h4>
      <input
        type="text"
        placeholder="请输入验证码"
        spellcheck="false"
        class="code-input"
        v-model="code"
        maxlength="4"
      />
      <div class="verification" @click="refreshCode">
        <span
          v-for="(item, index) in codeList"
          :key="index"
          :style="getStyle(item)"
          >{{ item.code }}</span
        >
      </div>
    </div>
    <div class="verify-tip">
      <div v-show="code">
        <span
          class="verify-pass"
          v-if="
            code.toUpperCase() ==
              codeList
                .map(item => item.code)
                .join('')
                .toUpperCase()
          "
          >验证码输入正确</span
        >
        <span class="verify-deny" v-else>验证码输入错误</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      codeList: []
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
    length: {
      type: Number,
      default: 4
    }
  },
  created() {
    this.createdCode();
  },
  methods: {
    // 判断结果并返回boolean
    checking() {
      if (
        this.code.toUpperCase() ===
        this.codeList
          .map(item => item.code)
          .join("")
          .toUpperCase()
      ) {
        return true;
      } else {
        return false;
      }
    },
    // 刷新
    refreshCode() {
      this.createdCode();
    },
    // 生成图片验证码
    createdCode() {
      // 先清空验证码输入
      this.code = "";
      // 验证码长度
      let len = this.length,
        codeList = [],
        chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
        charsLen = chars.length;
      // 生成
      for (let i = 0; i < len; i++) {
        let rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200)
        ];
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${Math.floor(Math.random() * 90) -
            Math.floor(Math.random() * 90)}deg)`
        });
      }
      // 指向
      this.codeList = codeList;
    },
    // 转化对象属性为行内样式格式
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`;
    }
  }
};
</script>

<style>
/* .verifycode h4 {
  font-size: 14px;
  font-weight: normal;
  color: #323232;
  margin-bottom: 10px;
} */
.captcha {
  justify-content: space-between;
  align-items: center;
}
.captcha h4.input-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  color: #666;
  width: 100px;
  margin-right: 10px;
  text-align: right;
}
.captcha h4 span {
  color: #ff4200;
}
.code-input,
.verification {
  font-size: 14px;
  line-height: 36px;
  height: 36px;
  border: 1px solid #dcdfe6;
  /* letter-spacing: 5px; */
}
.code-input {
  width: 250px;
  color: #838383;
  border-radius: 2px;
  padding-left: 15px;
  cursor: pointer;
}

.code-input:focus {
  border-color: #2a4793;
}
.verification {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 2px;
  width: 116px;
  margin-left: 10px;
  background-image: url("../../assets/images/code-bg.jpg");
  background-size: cover;
  background-position: center;
}
.verification span {
  display: inline-block;
}
.verify-tip {
  margin-top: 7px;
  height: 1;
}
.verify-pass,
.verify-deny {
  display: block;
  font-size: 14px;
  line-height: 1;
}
.verify-pass {
  color: #67c23a;
}
.verify-deny {
  color: #f56c6c;
}
</style>
