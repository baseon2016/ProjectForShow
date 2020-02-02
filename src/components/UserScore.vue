<template>
  <div class="user-score mg-t-14">
    <div class="info-area">
      <transition name="route" mode="out-in">
        <div v-if="userScoreCurrentData.length" :key="userScoreTab">
          <table border="1" v-if="userScoreTab === '0' || userScoreTab === '1'">
            <tr>
              <th>序号</th>
              <th>学习科目</th>
              <th>学习状态</th>
              <th>学习成绩</th>
              <th>学习时间</th>
              <th>学习时长</th>
            </tr>
            <tr
              v-for="(item, index) in userScoreCurrentData(
                currentPage,
                pageSize
              )"
              :key="item.Id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.PaperName }}</td>
              <td :class="{ success: item.Status === '学习中' }">
                {{ item.Status }}
              </td>
              <td>{{ item.Score }}</td>
              <td>{{ item.Createtime }}</td>
              <td>{{ item.Duration }}</td>
            </tr>
          </table>

          <table border="1" v-if="userScoreTab === '2'">
            <tr>
              <th>序号</th>
              <th>试卷名称</th>
              <th>考试时间</th>
              <th>学习成绩</th>
              <th>试卷状态</th>
              <th>考试时长</th>
            </tr>
            <tr
              v-for="(item, index) in userScoreCurrentData(
                currentPage,
                pageSize
              )"
              :key="item.Id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.PaperName }}</td>
              <td>
                {{ $common.transDate(item.Createtime) }}
                {{ $common.transTime(item.Createtime) }}
              </td>
              <td>{{ item.Score }}</td>
              <td :class="{ success: item.Adopt === 'true' }">
                {{ item.Adopt === "true" ? "通过" : "没通过" }}
              </td>
              <td>{{ item.Duration }}</td>
            </tr>
          </table>

          <el-pagination
            class="common-pager"
            background
            layout="prev, pager, next"
            :total="
              userScoreTab === '0'
                ? userScorePractice.length
                : userScoreTab === '1'
                ? userScoreMock.length
                : userScoreKnowledge.length
            "
            :page-size="pageSize"
            :page-count="7"
            :hide-on-single-page="false"
            :current-page="currentPage"
          ></el-pagination>
        </div>

        <div v-else class="no-data">
          <img src="../assets/images/no-msg.png" />
          <p>暂无分数消息</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "score",
  data() {
    return {
      pageSize: 10,
      currentPage: 1
    };
  },
  props: {
    UserId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      userScorePractice: state => state.user.userScorePractice,
      userScoreMock: state => state.user.userScoreMock,
      userScoreKnowledge: state => state.user.userScoreKnowledge,
      userScoreTab: state => state.user.userScoreTab
    }),
    ...mapGetters(["userScoreCurrentData"])
  },
  methods: {
    ...mapMutations(["switchUserScoreTab"]),
    ...mapActions([""])

    // pagerChange(currentPage) {
    //   this.currentPage = currentPage;
    // }
  },
  // 离开用户信息组件时，清除分数栏选项卡参数
  beforeDestroy() {
    this.switchUserScoreTab(null);
  }
};
</script>

<style>
.user-score table {
  border-collapse: collapse;
  font-size: 14px;
  color: #666;
  line-height: 48px;
  border: 1px solid #f4f5f9;
  width: 100%;
  text-align: center;
}
.user-score table th {
  font-weight: bold;
}
.user-score table td.success {
  color: #1ca705;
}
/* 分页器设置自定义背景色 */
.common-pager {
  margin-top: 30px;
  font-size: 12px;
}
.common-pager.el-pagination {
  font-weight: normal;
}
.common-pager .el-pager li {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.common-pager.el-pagination.is-background .el-pager li {
  /* background-color: #f4f4f5; */
  color: #333;
}
.common-pager.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3e60c1;
  color: #fff;
}
.common-pager.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #5272c6;
}
</style>
