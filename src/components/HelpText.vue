<template>
  <div v-if="showData" class="common-text mg-t-14">
    <div class="text-area">
      <div class="text-area-inner" v-html="showData.Remark"></div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
export default {
  name: "help-text",

  props: {
    showData: {
      type: Object
    }
  }
};
</script>

<style>
.common-text {
  background-color: #fff;
  padding: 30px;
  font-size: 14px;
  color: #666;
  line-height: 34px;
  text-indent: 10px;
  padding-bottom: 50px;
}
</style>
