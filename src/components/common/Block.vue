<template>
  <div class="block-content">
    <div class="content-item df">
      <div class="item-info df">
        <span class="course-name">{{ sourceData.CourseName }}</span>
        <div class="course-danger">
          <div
            v-for="unit in sourceData.HiddenDanger"
            :key="unit.Id"
            class="hidden-danger df"
          >
            <span class="hidden-danger-name">{{ unit.hiddenDanger }}</span>
            <span class="hidden-danger-remark">{{ unit.details }}</span>
          </div>
        </div>
      </div>
      <Button
        :text="btnText"
        :setWidth="130"
        :setHeight="34"
        @btnClick="$emit('startSoftware')"
        class="btn-unit"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "block",
  components: {
    Button
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    btnText: {
      type: String,
      default: "按钮"
    }
  }
};
</script>

<style>
.block {
  background-color: #fff;
  padding: 37px 37px 30px 33px;
}
.block .block-title h3 {
  font-size: 24px;
  font-weight: normal;
  color: #333;
  line-height: 1;
}
.block-area-wrap {
  padding-top: 3px;
  padding-bottom: 10px;
}
.block-area {
  padding-top: 20px;
  padding-bottom: 20px;
}
.block-area + .block-area {
  border-top: 1px dashed #dadada;
}
.block-subtitle {
  align-items: center;
}
.block-subtitle h4 {
  font-size: 16px;
  color: #666;
  font-weight: normal;
  line-height: 1;
}
.block-subtitle img {
  margin-right: 10px;
  display: block;
  width: 7px;
  height: 7px;
}
.block-content {
  padding-top: 17px;
  font-size: 14px;
}
.content-item {
  flex-direction: column;
}
.content-item + .content-item {
  margin-top: 30px;
}
.btn-unit {
  margin-top: 12px;
  align-self: flex-end;
}
.item-info {
  align-items: center;
}
.item-info span.course-name {
  width: 77px;
  height: 224px;
  writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
  /* writing-mode: tb-lr; IE浏览器的从左向右 从右向左是 writing-mode: tb-rl； */
  display: flex;
  -webkit-display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/images/unit-bg.png");
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  user-select: none;
}
.item-info .course-danger {
  margin-left: 16px;
}
.item-info .course-danger span {
  display: block;
  line-height: 26px;
  text-align: center;
  border: 1px solid #c8c8c8;
  border-radius: 2px;
  /* cursor: pointer; */
  user-select: none;
}
.item-info .hidden-danger + .hidden-danger {
  margin-top: 11px;
}
.hidden-danger-name {
  font-weight: bold;
  color: #2a4793;
  width: 126px;
  flex-shrink: 0;
}
.hidden-danger-remark {
  padding: 0 15px;
  color: #666;
  margin-left: 10px;
}
</style>
