<template>
  <div class="main-intro">
    <div class="main-intro-title">{{title}}</div>
    <div class="main-intro-text">
      <ul>
        <li v-for="item in text" :key="item.id">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-intro",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    text: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>