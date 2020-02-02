<template>
  <div class="cell" v-loading="!sourceData.length">
    <transition name="slow-in" mode="out-in">
      <div v-if="sourceData.length" key="data">
        <SubCell
          v-for="item in sourceData"
          :key="item.id"
          :subCellData="item"
          :fileType="fileType"
          class="mg-t-14"
        />
      </div>
      <div v-else class="no-data" key="no-data">
        <img src="../../assets/images/no-msg.png" />
        <p>暂无文件内容</p>
      </div>
    </transition>
  </div>
</template>

<script>
import SubCell from "./SubCell";
export default {
  name: "cell",
  components: {
    SubCell
  },
  props: {
    fileType: {
      type: String,
      required: true
    },
    sourceData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.cell {
  width: 100%;
  min-height: 70vh;
}

.content-list .list-item.is-active {
  display: block;
}
.el-icon-caret-right.is-active {
  transform: rotate(90deg);
}
.slow-in-enter {
  opacity: 0;
}
.slow-in-enter-active {
  transition: all 1s ease;
}
.slow-in-enter-to {
  opacity: 1;
}
</style>