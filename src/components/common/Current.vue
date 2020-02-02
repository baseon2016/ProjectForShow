<template>
  <div class="current df">
    <div class="current-title">
      <!-- 用户信息侧边栏分数加带选项卡 -->
      <div v-if="userScoreTab" class="current-learn df">
        <div class="po-r">
          <span
            :class="{ 'main-tab': true, active: userScoreTab === '0' }"
            @click="switchUserScoreTab('0')"
            >在线练习</span
          >
          <span :class="{ line: true, active: userScoreTab === '0' }"></span>
        </div>
        <div class="po-r">
          <span
            :class="{ 'main-tab': true, active: userScoreTab === '1' }"
            @click="switchUserScoreTab('1')"
            >模拟考试</span
          >
          <span :class="{ line: true, active: userScoreTab === '1' }"></span>
        </div>
        <div class="po-r">
          <span
            :class="{ 'main-tab': true, active: userScoreTab === '2' }"
            @click="switchUserScoreTab('2')"
            >理论测验</span
          >
          <span :class="{ line: true, active: userScoreTab === '2' }"></span>
        </div>
      </div>
      <div v-else class="current-general df">
        <span>{{ nav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "current",
  props: {
    nav: {
      type: String,
      required: true
    },
    learnTab: {
      type: String
    },
    userScoreTab: {
      type: String
    }
  },
  methods: {
    ...mapMutations(["switchUserScoreTab"])
  }
};
</script>

<style scoped>
.current {
  justify-content: space-between;
  align-items: flex-end;
  padding: 30px 20px 30px 30px;
  background-color: #fff;
}
/* .current-learn {
} */
.current-learn .main-tab {
  user-select: none;
  cursor: pointer;
  font-size: 20px;
  color: #13317e;
  line-height: 1;
  outline: 0;
}
.current-learn .main-tab.active {
  font-weight: bold;
}
span.line {
  display: none;
  width: 62.5%;
  height: 3px;
  background-color: #13317e;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
}
span.line.active {
  display: block;
}
.current-learn > div + div {
  margin-left: 40px;
}
.subject-info {
  max-width: 900px;
  margin-top: 20px;
}
.current-general {
  font-size: 20px;
  color: #13317e;
  line-height: 1;
  font-weight: bold;
}
</style>
