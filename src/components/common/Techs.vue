<template>
  <div v-if="techs.length" class="techs">
    <div class="techs-name">{{ techsName }}</div>
    <div v-for="item in techs" :key="item.CategoryId" class="tab">
      <span
        :class="{
          active: item.CategoryName === current,
          'po-r': true,
          tech: true
        }"
        @click="switchTab(item)"
        >{{ item.CategoryName }}
        <span
          v-if="item.CategoryName === '用户消息' && newMsgs.length"
          class="new-msgs"
          >{{ newMsgs.length }}</span
        >
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "techs",
  props: {
    techsName: {
      type: String,
      default: "栏目类别"
    }
  },
  computed: {
    ...mapState({
      current: state => state.techs.current,
      currentId: state => state.techs.currentId,
      techs: state => state.techs.techs
    }),
    ...mapGetters(["newMsgs"])
  },
  methods: {
    ...mapMutations(["getCurrent", "clearCurrent", "switchUserScoreTab"]),
    switchTab(item) {
      if (item.CategoryId !== this.currentId) {
        this.clearCurrent();
        if (item.CategoryName === "分数信息") {
          // 进入用户分数信息栏时，重置该页选项卡（练习/模拟）
          this.switchUserScoreTab("0");
        } else {
          this.switchUserScoreTab(null);
        }
        this.getCurrent(item);
        this.$emit("clickTab");
        this.$common.slideTo(0);
      }
    }
  }
};
</script>

<style>
.techs {
  width: 220px;
  flex-shrink: 0;
  background-color: #f9f9fb;
  margin-right: 20px;
}
.techs-name {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  border-left: 6px solid #5272c6;
  background-color: #2a4793;
  line-height: 58px;
  margin-bottom: 5px;
  padding-left: 30px;
}
.techs .tab {
  /* padding: 5px 0; */
  background-color: #f9f9fb;
}
.techs .tech {
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
  text-align: left;
  padding-left: 30px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  user-select: none;
  border-left: 6px solid transparent;
}
.techs span.active,
.techs span:hover {
  /* border-left: 6px solid #5272c6; */
  color: #fff;
  font-weight: bold;
}
.techs span.active {
  background-color: #3d5baa;
}
.techs span:hover {
  background-color: #5272c6;
}
.techs div.tab:first-child {
  padding-top: 0;
}
</style>
