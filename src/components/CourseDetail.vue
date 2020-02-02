<template>
  <div class="main-bg">
    <div class="learn-banner">
      <img src="../assets/images/practice-banner.png" alt="单元详细" />
    </div>
    <div class="container">
      <div class="learn-detail-top df">
        <div class="df">
          <img src="../assets/images/pic-notfound.png" alt="图片未找到" />
          <div class="learn-detail-top-text">
            <h3 class="">{{ course.CourseName }}</h3>
            <div class="course-detail-data">统计数据</div>
          </div>
        </div>
        <div class="learn-detail-end">
          <p>0<span>人学过</span></p>
        </div>
      </div>
      <div class="learn-detail-content">
        <el-tabs v-model="tab">
          <el-tab-pane label="单元信息" name="info"
            ><LearnCell
              :UnitData="falseData"
              @startSoftware="startSoftware"
              :course="course"
          /></el-tab-pane>
          <el-tab-pane label="单元练习" name="practice">
            <Block
              btnText="开始练习"
              :sourceData="course"
              class="mg-t-14"
              @startSoftware="startSoftware"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <HomeBottom />
  </div>
</template>

<script>
import HomeBottom from "./HomeBottom";
import LearnCell from "./common/LearnCell";
import Block from "./common/Block";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "course-detail",
  data() {
    return {
      UserId: null,
      tab: "info",
      falseData: {
        block1: {
          Title: "离心泵",
          SubTitle: "光气及光气化工艺",
          Remark:
            "这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介"
        },
        block2: [
          {
            Title: "工艺流程简介",
            content: [
              {
                SubTitle: "1、工作原理",
                Text:
                  "在化工、能源、动力、冶金、机械、建筑等工业部门中，常常涉及到换热问题。特别是在化工生产过程中的许多过程和单元操作，都需要进行加热或冷却。例如，化学反应通常要在一定的温度下进行，为了达到并保持一定的温度，就需要向反应器输入或从它输出热；又如在蒸发、蒸馏、干燥等单元操作中，都要向这些设备输入或输出热。此外，化工设备的保温，生产过程中热能的合理利用以及废热的回收等都涉及传热的问题。由此可见，换热器是化工厂中重要的化工设备之一，换热器的类型很多，特点不一，所以，对化工等行业的人员来说，换热器的操作技术培训是很重要的基本单元操作训练。热的传递有：传导、对流、和辐射三种基本方式。热传导是无物质宏观位移的传热方式，发生于静止位置内；对流传热是指流体中质点发生相对位移引起的热交换，常伴有热传导；由热的原因产生电磁波在空间的热传递是辐射传热，它不需要传递介质。化工生产中所指的换热器，依据传热原理和实现热交换的方法，换热器可分为间壁式、混合式及蓄热式三类。其中以间壁式换热器应用最普遍，间壁式换热器的特点是冷、热两种流体被固体壁面隔开，热流体将热传到壁面的一侧（对流传热），通过间壁内的热传导，再由间壁的另一侧将热传给冷流体，从而使热物流被冷却，冷物流被加热，满足化工生产中对冷物流或热物流温度的控制要求。此类换热器中，以列管式应用最广。它的主要优点是单位体积具有的传热面积较大以及传热效果较好；此外，结构简单，制造的材料范围较广，操作弹性也较大，因此在高温、高压和大型装置上多采用列管式换热器，其他还有管式换热器、板式换热器、翅片式换热器。本单元选用的是双程列管式换热器，冷物流被加热后有相变化。在对流传热中，传递的热量除与传热推动力（温度差）有关外，还与传热面积和传热系数成正比。传热面积减少时，传热量减少；如果间壁上有气膜或垢层，都会降低传热系数，减少传热量。所以，开车时要排不凝气；发生管堵或严重结垢时，必须停车检修或清洗。"
              },
              {
                SubTitle: "2、流程说明",
                Text:
                  "冷物流（92℃）进入本单元，由泵P101A/B，经调节器FIC1001控制流量送入换热器E101壳程，加热到142℃（20％被汽化）后，经阀VI2E101出系统。热物流（225℃）进入系统，经泵P102A/B，由温度调节器TIC1001分程控制主线调节阀TV1001A和副线调节阀TV1001B（两调节阀的分程动作如下图所示）使冷物料出口温度稳定；过主线阀TV1001A的热物流经换热器E101管程后，与副线阀TV1001B来的热物流混合（混合温度为（177±2℃）），由阀VI4E101出本单元。"
              }
            ]
          },
          {
            Title: "复杂控制说明",
            content: [
              {
                SubTitle: "1、分程控制",
                Text:
                  "本装置的热物流分程控制手段来控制其温度。当调节器控制在100%开度时，A阀全开，B阀全关；当调节器控制在50％开度时，A、B阀都是开50%；当调节器控制在0%开度时，A阀全关，B阀全开。",
                Img: "../../assets/images/images/block-img2.png"
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    HomeBottom,
    LearnCell,
    Block
  },
  computed: {
    ...mapState({
      coursePractice: state => state.practice.coursePractice
    }),
    course() {
      return this.coursePractice.find(
        item => item.CourseId === this.$route.params.id
      );
    }
  },
  methods: {
    ...mapActions(["softWare"]),
    ...mapMutations(["changeTab"]),
    startSoftware() {
      const UserId = this.UserId;
      const type = "1";
      const { CourseId } = this.course;
      this.softWare({ UserId, CourseId, type });
    },
    clickConfirm(text, title, type) {
      this.$confirm(text, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
        center: true
      })
        .then(() => {
          this.changeTab("login");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$router.back();
        });
    }
  },
  created() {
    let UserId = localStorage.getItem("UserId");
    if (!UserId) {
      UserId = sessionStorage.getItem("UserId");
      if (!UserId) {
        this.clickConfirm("用户未登录，请先登录", "警告", "warning");
      }
    }
    this.UserId = UserId;
  }
};
</script>

<style></style>
