<template>
  <div class="learn-cell" v-if="UnitData">
    <UnitBlock1
      :data="UnitData.block1"
      :course="course"
      class="mg-t-14"
      @startSoftware="$emit('startSoftware')"
    />
    <UnitBlock2 :data="UnitData.block2" class="mg-t-14" />
  </div>
</template>

<script>
import UnitBlock1 from "./UnitBlock1";
import UnitBlock2 from "./UnitBlock2";
export default {
  name: "learn-cell",
  components: {
    UnitBlock1,
    UnitBlock2
  },
  props: {
    UnitData: {
      type: Object,
      default: null
    },
    course: {
      type: Object,
      default: null
    }
  }
};
</script>

<style></style>
