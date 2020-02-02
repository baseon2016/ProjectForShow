<template>
  <div class="knowledge-exam container">
    <div class="knowledge-top df">
      <div class="knowledge-title">
        考试试卷-{{ paper.PaperName }} 满分:{{ paper.FullMarks }} 考生:{{
          this.UserName
        }}
      </div>
      <div class="timer">
        <i class="el-icon-timer"></i>
        考试时间: <span>{{ duration }}</span
        >秒
      </div>
      <button
        class="submit-exam"
        v-show="!afterSubmit"
        :disabled="afterSubmit"
        @click="showResult"
      >
        我要交卷
      </button>
    </div>
    <el-tabs v-model="Qtype">
      <el-tab-pane label="单项选择" name="choice">
        <div class="exam-radio">
          <h5>单选题</h5>
          <div
            v-for="(item, index) in paper.ChoiceQuestion"
            :key="item.Q_id"
            :class="{ 'exam-item': true }"
          >
            <div>
              <span>{{ index + 1 }}、</span><span>{{ item.Q_Content }}</span
              ><span>分数:{{ item.Score }}</span
              ><span>( {{ item.userAnswer }} )</span>
            </div>
            <div>
              <el-radio-group
                size="medium"
                v-model="item.userAnswer"
                :disabled="item.showAnswer"
              >
                <el-radio label="A" class="exam-item-option"
                  >A. {{ item.Q_a }}</el-radio
                >
                <el-radio label="B" class="exam-item-option"
                  >B. {{ item.Q_b }}</el-radio
                >
                <el-radio label="C" class="exam-item-option"
                  >C. {{ item.Q_c }}</el-radio
                >
                <el-radio label="D" class="exam-item-option"
                  >D. {{ item.Q_d }}</el-radio
                >
              </el-radio-group>
            </div>
            <div class="exam-item-answer" v-if="afterSubmit">
              <div
                :class="{
                  answer: true,
                  right: item.Answer === item.userAnswer,
                  wrong: item.Answer !== item.userAnswer
                }"
              >
                <div class="answer-tip">
                  <div v-if="item.Answer === item.userAnswer" class="df">
                    <img src="../assets/images/right.png" /><span>答对了</span>
                  </div>
                  <div v-else class="df">
                    <img src="../assets/images/wrong.png" /><span>答错了</span>
                  </div>
                </div>
                <div class="score">
                  得分:
                  <span>{{
                    item.Answer === item.userAnswer ? item.Score : "0"
                  }}</span>
                  分
                </div>
                <span>正确答案是 {{ item.Answer }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="多项选择" name="much-choice">
        <div class="exam-checkbox">
          <h5>多选题</h5>
          <div
            v-for="(item, index) in paper.MuchChoice"
            :key="item.Q_id"
            :class="{ 'exam-item': true }"
          >
            <div>
              <span>{{ index + 1 }}、</span><span>{{ item.Q_Content }}</span
              ><span>分数:{{ item.Score }}</span
              ><span>( {{ [...item.userAnswer].sort().join("，") }} )</span>
            </div>
            <div>
              <el-checkbox-group size="medium" v-model="item.userAnswer">
                <el-checkbox label="A" class="exam-item-option"
                  >A. {{ item.Q_a }}</el-checkbox
                >
                <el-checkbox label="B" class="exam-item-option"
                  >B. {{ item.Q_b }}</el-checkbox
                >
                <el-checkbox label="C" class="exam-item-option"
                  >C. {{ item.Q_c }}</el-checkbox
                >
                <el-checkbox label="D" class="exam-item-option"
                  >D. {{ item.Q_d }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
            <div class="exam-item-answer" v-if="afterSubmit">
              <div
                :class="{
                  answer: true,
                  right: item.Answer === [...item.userAnswer].sort().join('，'),
                  wrong: item.Answer !== [...item.userAnswer].sort().join('，')
                }"
              >
                <div class="answer-tip">
                  <div
                    v-if="
                      item.Answer === [...item.userAnswer].sort().join('，')
                    "
                    class="df"
                  >
                    <img src="../assets/images/right.png" /><span>答对了</span>
                  </div>
                  <div v-else class="df">
                    <img src="../assets/images/wrong.png" /><span>答错了</span>
                  </div>
                </div>
                <div class="score">
                  得分:
                  <span>{{
                    item.Answer === [...item.userAnswer].sort().join("，")
                      ? item.Score
                      : "0"
                  }}</span>
                  分
                </div>
                <span>正确答案是 {{ item.Answer }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="判断题" name="judge">
        <div class="exam-true-false">
          <h5>判断题</h5>
          <div
            v-for="(item, index) in paper.JudgeQuestion"
            :key="item.Q_id"
            :class="{ 'exam-item': true }"
          >
            <div>
              <span>{{ index + 1 }}、</span><span>{{ item.Q_Content }}</span
              ><span>分数:{{ item.Score }}</span
              ><span>( {{ item.userAnswer }} )</span>
            </div>
            <div>
              <el-radio-group size="medium" v-model="item.userAnswer">
                <el-radio label="T" class="exam-item-option">正确</el-radio>
                <el-radio label="F" class="exam-item-option">错误</el-radio>
              </el-radio-group>
            </div>
            <div class="exam-item-answer" v-if="afterSubmit">
              <div
                :class="{
                  answer: true,
                  right: item.Answer === item.userAnswer,
                  wrong: item.Answer !== item.userAnswer
                }"
              >
                <div class="answer-tip">
                  <div v-if="item.Answer === item.userAnswer" class="df">
                    <img src="../assets/images/right.png" /><span>答对了</span>
                  </div>
                  <div v-else class="df">
                    <img src="../assets/images/wrong.png" /><span>答错了</span>
                  </div>
                </div>
                <div class="score">
                  得分:
                  <span>{{
                    item.Answer === item.userAnswer ? item.Score : "0"
                  }}</span>
                  分
                </div>
                <span>正确答案是 {{ item.Answer }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "knowledge-exam",
  data() {
    return {
      UserId: null,
      UserName: null,
      Qtype: "choice",
      afterSubmit: false,
      paper: {},
      userScore: null,
      duration: 0
    };
  },
  methods: {
    ...mapActions(["getPaper", "recording"]),
    processPaper(data) {
      const choice = data.ChoiceQuestion.map(item => {
        let newItem = { ...item };
        newItem.userAnswer = "";
        return newItem;
      });
      const muchChoice = data.MuchChoice.map(item => {
        let newItem = { ...item };
        newItem.userAnswer = [];
        return newItem;
      });
      const judge = data.JudgeQuestion.map(item => {
        let newItem = { ...item };
        newItem.userAnswer = "";
        return newItem;
      });
      this.paper = {
        ...data,
        ChoiceQuestion: choice,
        MuchChoice: muchChoice,
        JudgeQuestion: judge
      };
    },
    reducerCal(accumulator, currentVal) {
      if (currentVal.Answer === currentVal.userAnswer) {
        return accumulator + parseInt(currentVal.Score);
      }
      if (currentVal.Answer === [...currentVal.userAnswer].sort().join("，")) {
        return accumulator + parseInt(currentVal.Score);
      } else {
        return accumulator;
      }
    },
    showResult() {
      const choiceScore = this.paper.ChoiceQuestion.reduce(this.reducerCal, 0);
      const judgeScore = this.paper.JudgeQuestion.reduce(this.reducerCal, 0);
      const muchChoiceScore = this.paper.MuchChoice.reduce(this.reducerCal, 0);
      this.userScore = choiceScore + judgeScore + muchChoiceScore;
      let text, title, type;
      if (this.userScore >= parseInt(this.paper.passingGrade)) {
        text = `在本次考试中获得${this.userScore}分，通过考试`;
        title = `恭喜您，${this.UserName}`;
        type = "success";
      } else {
        text = `在本次考试中获得${this.userScore}分，没有通过考试`;
        title = `太遗憾了，${this.UserName}`;
        type = "error";
      }
      this.submitPaper(text, title, type);
      this.afterSubmit = true;
      clearInterval(this.timing);
      const recorder = {
        UserId: this.UserId,
        UserName: this.UserName,
        PaperId: this.paper.PaperId,
        PaperName: this.paper.PaperName,
        Score: this.userScore,
        Duration:
          parseInt(this.duration / 60) +
          "分钟" +
          parseInt(this.duration % 60) +
          "秒",
        Adopt: this.userScore >= parseInt(this.paper.passingGrade)
      };
      this.recording(recorder);
    },
    submitPaper(text, title, type) {
      this.$confirm(text, title, {
        confirmButtonText: "确定",
        type: type,
        center: true
      });
    },
    clickConfirm(text, title, type) {
      this.$confirm(text, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
        center: true
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          this.$router.back();
        });
    }
  },
  created() {
    const UserId = localStorage.getItem("UserId");
    const UserName = localStorage.getItem("UserName");
    if (!UserId || !UserName) {
      const UserId = sessionStorage.getItem("UserId");
      const UserName = sessionStorage.getItem("UserName");
      if (!UserId || !UserName) {
        this.clickConfirm("用户未登录，请先登录", "警告", "warning");
      }
    }
    if (UserId && UserName) {
      this.UserId = UserId;
      this.UserName = UserName;
      const id = this.$route.query.id;
      this.getPaper(id).then(res => {
        this.processPaper(res.data.Data);
        this.timing = setInterval(() => {
          this.duration = this.duration + 1;
        }, 1000);
      });
    }
  }
};
</script>

<style>
.knowledge-exam {
  padding: 20px 0;
}
.knowledge-top .submit-exam {
  border: 0;
  outline: 0;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #2a4793;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
