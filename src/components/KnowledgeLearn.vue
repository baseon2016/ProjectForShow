<template>
  <div class="knowledge-learn container">
    <div class="knowledge-top df">
      <div class="knowledge-title">
        知识点预习
      </div>
      <div class="knowledge-subtitle df">
        <span>试卷选择:</span>
        <el-select v-model="selectedPaper" placeholder="请选择试卷">
          <el-option
            v-for="item in allPaper"
            :key="item.Id"
            :label="item.PaperName"
            :value="item.PaperId"
          ></el-option>
        </el-select>

        <div class="go-exam" @click="goExam">我要考试</div>
      </div>
    </div>

    <el-tabs v-model="Qtype">
      <el-tab-pane label="单项选择" name="choice">
        <div class="exam-radio">
          <h5>单选题</h5>
          <div
            v-for="(item, index) in knowledgePoints.ChoiceQuestion"
            :key="item.Q_id"
            :class="{ 'exam-item': true, dn: index >= currentPageChoice }"
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
            <div class="exam-item-answer">
              <button v-if="!item.showAnswer" @click="showResult(item)">
                查看答案
              </button>
              <div
                v-else
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
          <div class="more-knowledge" @click="moreKnowledge('Choice')">
            更多题目
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="多项选择" name="much-choice">
        <div class="exam-checkbox">
          <h5>多选题</h5>
          <div
            v-for="(item, index) in knowledgePoints.MuchChoice"
            :key="item.Q_id"
            :class="{ 'exam-item': true, dn: index >= currentPageMuchChoice }"
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
            <div class="exam-item-answer">
              <button v-if="!item.showAnswer" @click="showResult(item)">
                查看答案
              </button>
              <div
                v-else
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
          <div class="more-knowledge" @click="moreKnowledge('Choice')">
            更多题目
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="判断题" name="judge">
        <div class="exam-true-false">
          <h5>(三)、判断题</h5>
          <div
            v-for="(item, index) in knowledgePoints.JudgeQuestion"
            :key="item.Q_id"
            :class="{ 'exam-item': true, dn: index >= currentPageJudge }"
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
            <div class="exam-item-answer">
              <button v-if="!item.showAnswer" @click="showResult(item)">
                查看答案
              </button>
              <div
                v-else
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
          <div class="more-knowledge" @click="moreKnowledge('Choice')">
            更多题目
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "knowledge-learn",
  data() {
    return {
      Qtype: "choice",
      currentPageChoice: 5,
      currentPageMuchChoice: 5,
      currentPageJudge: 5,
      knowledgePoints: {},
      allPaper: null,
      selectedPaper: null
    };
  },

  methods: {
    ...mapActions(["getKnowledgePoints", "getAllPaper"]),
    filterKnowledgePoints(data) {
      const choice = data.ChoiceQuestion.map(item => {
        let newItem = { ...item };
        newItem.showAnswer = false;
        newItem.userAnswer = "";
        return newItem;
      });
      const muchChoice = data.MuchChoice.map(item => {
        let newItem = { ...item };
        newItem.showAnswer = false;
        newItem.userAnswer = [];
        return newItem;
      });
      const judge = data.JudgeQuestion.map(item => {
        let newItem = { ...item };
        newItem.showAnswer = false;
        newItem.userAnswer = "";
        return newItem;
      });
      this.knowledgePoints = {
        ChoiceQuestion: choice,
        MuchChoice: muchChoice,
        JudgeQuestion: judge
      };
    },
    showResult(item) {
      item.showAnswer = true;
    },
    moreKnowledge(type) {
      if (type === "Choice") {
        this.currentPageChoice = this.currentPageChoice + 5;
      }
      if (type === "MuchChoice") {
        this.currentPageMuchChoice = this.currentPageMuchChoice + 5;
      }
      if (type === "Judge") {
        this.currentPageJudge = this.currentPageJudge + 5;
      }
    },
    goExam() {
      if (this.selectedPaper) {
        this.$router.push(`/knowledge-exam?id=${this.selectedPaper}`);
      }
    }
  },
  created() {
    this.getKnowledgePoints().then(res => {
      this.filterKnowledgePoints(res.data.Data);
    });
    this.getAllPaper().then(res => {
      this.allPaper = res.data.Data;
    });
  }
};
</script>

<style>
.knowledge-learn {
  padding: 20px 0;
}
.knowledge-top {
  justify-content: space-between;
  align-items: flex-end;
}
.knowledge-top .knowledge-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.knowledge-top .knowledge-subtitle {
  width: 400px;
  justify-content: space-between;
  align-items: center;
}
.knowledge-top .go-exam {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #2a4793;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.exam-item {
  padding: 20px 0;
  border-bottom: 1px solid #ededed;
}
.exam-item-option {
  margin-top: 13px;
}
.knowledge-learn .el-radio__input.is-checked .el-radio__inner {
  border-color: #002856;
  background: #002856;
}
.knowledge-learn .el-radio__input.is-checked + .el-radio__label {
  color: #002856;
}
.knowledge-learn .el-checkbox__input.is-checked .el-checkbox__inner,
.knowledge-learn .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #002856;
  background: #002856;
}
.knowledge-learn .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #002856;
}
.knowledge-learn .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #002856;
}
.exam-item-answer {
  margin-top: 10px;
  width: 1000px;
  height: 100px;
}
.exam-item-answer .answer {
  padding: 15px;
}
.exam-item-answer .answer.right {
  background-color: #e8fbe8;
}
.exam-item-answer .answer.wrong {
  background-color: #feedf0;
}
.answer .score span {
  font-size: 20px;
  font-style: italic;
  color: #ff0000;
}
.answer .answer-tip img {
  width: 16px;
}
.more-knowledge {
  display: block;
  width: 100%;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
  font-weight: 700;
  background-image: url("../assets/images/more-knowledge.png");
  cursor: pointer;
}
</style>
