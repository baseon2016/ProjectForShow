<template>
  <div class="course-list">
    <transition-group name="route" mode="out-in">
      <div v-for="item in data" :key="item.CourseId" class="course-item df">
        <div class="course-item-img">
          <img src="../../assets/images/单元图片.png" alt="单元" />
        </div>
        <div class="course-item-title">
          <p>
            <span>{{ active }}</span
            >-
            <span>{{ item.CourseName }}</span>
          </p>
          <div class="course-item-datainfo">
            <p class="warnred">距离过期还有20天</p>
            <p>有1000人学习过</p>
          </div>
        </div>
        <div class="course-item-enter">
          <p>我已学习20次</p>
          <el-button
            type="primary"
            class="button"
            @click="goPracticeId(item.CourseId)"
            >单元详细</el-button
          >
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "course-list",
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapState({
      active: state => state.technology.active
    })
  },
  methods: {
    goPracticeId(id) {
      this.$router.push(`/course/${id}`);
    }
  }
};
</script>

<style>
.course-list {
  background-color: #fff;
  border: 1px solid #e5e5e5;
}
.course-item {
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.course-item + .course-item {
  border-top: 1px solid #e5e5e5;
}
.course-item-img {
  width: 160px;
}
.course-item-img img {
  width: 100%;
  display: block;
}
.course-item-title {
  flex-shrink: 0;
  width: 300px;
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.course-item-title p {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  line-height: 1.8;
}
.course-item-datainfo p {
  font-size: 12px;
  font-weight: normal;
  color: #666;
}
.course-item-datainfo .warnred {
  color: #da4136;
}
.course-item-datainfo p + p {
  margin-top: 25px;
}
.course-item-enter {
  margin-left: 530px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.course-item-enter p {
  font-size: 12px;
  font-weight: normal;
  color: #666;
}
</style>
