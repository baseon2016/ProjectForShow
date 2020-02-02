<template>
  <button class="btn-lg" @click="$emit('btnClick')">{{text}}</button>
</template>

<script>
export default {
  name: "btn-lg",
  props: {
    text: {
      type: String,
      default: "按钮"
    }
  }
};
</script>

<style>
button.btn-lg {
  font-size: 14px;
  color: #fff;
  line-height: 42px;
  width: 100%;
  text-align: center;
  background-color: #2a4793;
  border: 0;
  border-radius: 2px;
  outline: 0;
  cursor: pointer;
}
</style>