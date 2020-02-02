<template>
  <div class="block">
    <div class="block-title">
      <h3>{{sourceData.title}}</h3>
    </div>
    <div class="block-area">
      <div class="block-content">
        <div class="content-item df">
          <div class="item-info df">
            <span class="course-name">{{sourceData.content.name}}</span>
            <span class="course-duration" v-if="sourceData.content.duration">
              <ins class="course-intro">已培训时长:</ins>
              {{sourceData.content.duration}}
            </span>
            <span class="course-record" v-if="sourceData.content.lastUse">
              <ins class="course-intro">上次进入时间:</ins>
              {{sourceData.content.lastUse}}
            </span>
          </div>
          <!-- <Button :text="btnText" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "block-single",
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
</style>