<template>
  <div class="course-list df">
    <div class="course-list-aside">{{ subCategory }}</div>
    <transition-group name="route" mode="out-in" tag="div">
      <div v-for="item in data" :key="item.CourseId" class="course-item df">
        <div class="course-item-img">
          <img src="../../assets/images/单元图片.png" alt="单元" />
        </div>
        <div class="course-item-title">
          <p>
            <span>{{ item.CourseName }}</span>
          </p>
          <div class="course-item-datainfo">
            <p class="warnred">距离过期还有20天</p>
            <p>曾经获得最高分数<span class="warnred">99分</span></p>
          </div>
        </div>
        <div class="course-item-enter">
          <p>我已考试20次</p>
          <el-button
            type="primary"
            class="button"
            @click="startSoftware(item.CourseId)"
            >进入软件</el-button
          >
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "course-list",
  props: {
    data: {
      type: Array,
      default: null
    },
    subCategory: {
      type: String,
      default: "科目类别"
    }
  },
  computed: {
    ...mapState({
      active: state => state.technology.active
    })
  },
  methods: {
    ...mapActions(["softWare"]),
    startSoftware(id) {
      const UserId = this.UserId;
      const type = "1";
      const CourseId = id;
      this.softWare({ UserId, CourseId: id, type });
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

<style>
.course-list-aside {
  writing-mode: vertical-lr;
  text-align: center;
  width: 56px;
  border-right: 1px solid #e5e5e5;
  font-size: 14px;
  line-height: 56px;
  color: #333;
  letter-spacing: 3px;
}
</style>
