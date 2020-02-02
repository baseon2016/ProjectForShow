<template>
  <div class="unit-block2">
    <div v-for="item in data" class="unit-block2-section" :key="item.Id">
      <div class="unit-block2-title df">
        <span class="verticle-line mg-r-10"></span>
        {{ item.Title }}
      </div>
      <div v-for="ele in item.content" :key="ele.Id" class="df">
        <div :class="{ 'unit-block2-item': true, 'max-w-80p': ele.Img }">
          <div class="unit-block2-subtitle">
            {{ ele.SubTitle }}
          </div>
          <div class="unit-block2-text">
            {{ ele.Text }}
          </div>
        </div>
        <div class="unit-block2-img" v-if="ele.Img">
          <img src="../../assets/images/images/block-img2.png" alt="说明图" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "unit-block2",
  props: {
    data: {
      type: Array,
      default: null
    }
  }
};
</script>

<style>
.unit-block2 {
  background-color: #fff;
  padding: 35px 30px;
}
.unit-block2-title {
  font-size: 24px;
  line-height: 1;
  color: #333;
  margin-bottom: 25px;
  align-items: center;
}
.unit-block2-title span.verticle-line {
  display: block;
  width: 4px;
  height: 22px;
  border-radius: 2px;
  background-color: #5272c6;
}
.unit-block2-item {
  width: 100%;
}
.unit-block2-subtitle {
  font-size: 16px;
  line-height: 1;
  color: #333;
  margin-bottom: 14px;
}
.unit-block2-text {
  width: 100%;
  font-size: 14px;
  color: #666;
  word-wrap: break-word;
  margin-bottom: 20px;
}
.unit-block2-img {
  margin-left: 25px;
}
.unit-block2-img img {
  display: block;
}
</style>
