<template>
  <div class="error">
    <div class="container">
      <div class="error-po">
        <img src="../assets/images/404.png" alt="页面未找到" />
        <div class="error-text">
          <!-- <p>
            <span>404</span>
            <span>出错了</span>
          </p>-->
          <p>抱歉！您访问的页面不存在……</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error"
};
</script>

<style>
.error {
  min-height: 100vh;
  background-color: #f1f3f8;
}
.error-po {
  padding-top: 200px;
}
.error-po img {
  display: block;
  margin: 0 auto;
}
.error-text {
  margin-top: 50px;
  text-align: center;
  font-size: 22px;
  color: #666;
}
</style>
