<template>
  <video
    :src="src"
    controls="controls"
    :style="{ width: '100%', 'object-fill': 'fill' }"
  >
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
  name: "video-component",
  props: {
    src: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.learn-video {
  width: 350px;
}
</style>
