<template>
  <div class="unit-block1 df">
    <div class="unit-block1-left">
      <div class="unit-block1-title">{{ data.Title }}</div>
      <div class="unit-block1-subtitle">
        <span>所属专业:{{ data.SubTitle }}</span>
        <span>对应专业:{{ data.SubTitle }}</span>
      </div>
      <div class="unit-block1-text">{{ data.Remark }}</div>
      <Button
        :text="btnText"
        @btnClick="$emit('startSoftware')"
        :setWidth="131"
        :setHeight="34"
      />
    </div>
    <div class="unit-block1-img">
      <video
        src="http://cs.bohechina.com:8026/Content/ApplyBills/20200109113707492715.mp4"
        controls="controls"
        width="350"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "unit-block1",
  components: {
    Button
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    course: {
      type: Object,
      default: null
    },
    btnText: {
      type: String,
      default: "开始练习"
    }
  },
  methods: {
    startPractice() {
      this.$router.push(this.$homeUrl + "practice");
    }
  }
};
</script>

<style>
.unit-block1 {
  background-color: #fff;
  padding: 35px 30px;
  /* justify-content: space-between; */
  align-items: flex-end;
}
.unit-block1-left {
  width: 70%;
}
.unit-block1-img {
  margin-left: 25px;
  width: 350px;
}
.unit-block1-img img {
  display: block;
}
.unit-block1-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 25px;
}
.unit-block1-subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}
.unit-block1-subtitle span + span {
  margin-left: 35px;
}
.unit-block1-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}
</style>
