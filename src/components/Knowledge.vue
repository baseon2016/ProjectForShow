<template>
  <div class="knowledge main-bg">
    <div class="learn-banner po-r">
      <img src="../assets/images/banner-knowledge.png" alt="理论学习" />
      <img
        class="btn-knowledge"
        src="../assets/images/btn-knowledge.png"
        alt="我要学习"
        @click="goKnowledgeLearn"
      />
    </div>
    <div class="container">
      <div class="tech-aside">
        <div>
          <img
            class="knowledge-func"
            src="../assets/images/knowledge1.png"
            alt="特色功能模块"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "knowledge",
  methods: {
    goKnowledgeLearn() {
      this.$router.push("/knowledge-learn");
    }
  }
};
</script>

<style>
.learn-banner .btn-knowledge {
  position: absolute;
  left: 20%;
  bottom: 70px;
  width: 150px;
  cursor: pointer;
}
</style>
