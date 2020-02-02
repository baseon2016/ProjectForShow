<template>
  <div class="home-bottom">
    <div class="home-bottom-inner container">
      <div>
        <p>中国化学品安全协会&秦皇岛博赫科技开发有限公司联合开发 ©版权所有</p>
        <p>地址：北京市东城区和平里北街21号</p>
        <p>地址：河北省秦皇岛市海港区民族北路116支2号 电话0335-8070039</p>
      </div>
      <!-- <div class="bottom-logo df">
        <img
          class="logo-ccsa"
          src="../assets/images/bottom-logo-ccsa.png"
          alt="中国化学品安全协会"
        />
        <img
          class="logo-bohe"
          src="../assets/images/bottom-logo-bohe.png"
          alt="秦皇岛博赫科技开发有限公司"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "home-bottom"
};
</script>

<style>
.home-bottom {
  width: 100%;
  /* height: 197px; */
  padding: 25px 0;
  color: #666;
  background-color: #ebebeb;
  font-size: 14px;
  line-height: 1;
  text-align: center;
}
.home-bottom p + p {
  margin-top: 17px;
}
.bottom-logo {
  width: 662px;
  /* justify-content: flex-start; */
  align-items: center;
  margin: 0 auto;
}

.bottom-logo img {
  display: block;
  margin-top: 17px;
}
.bottom-logo img.logo-ccsa {
  width: 207px;
}
.bottom-logo img.logo-bohe {
  width: 387px;
}
.bottom-logo img + img {
  margin-left: 55px;
}
</style>
