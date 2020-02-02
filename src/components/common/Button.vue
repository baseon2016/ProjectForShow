<template>
  <button
    class="btn-soft"
    @click="$emit('btnClick')"
    :style="{ width: setWidth + 'px', lineHeight: setHeight + 'px' }"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "btn-soft",
  props: {
    text: {
      type: String,
      default: "按钮"
    },
    setWidth: {
      type: Number,
      default: 80
    },
    setHeight: {
      type: Number,
      default: 28
    }
  }
};
</script>

<style scoped>
button.btn-soft {
  font-size: 12px;
  color: #fff;
  line-height: 28px;
  /* width: 80px; */
  /* padding: 0 17px; */
  text-align: center;
  background-color: #2a4793;
  border: 0;
  border-radius: 2px;
  outline: 0;
  cursor: pointer;
}
button.btn-soft:hover {
  background-color: #5272c6;
}
</style>
