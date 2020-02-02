<template>
  <div class="download-software">
    <div class="container df">
      <img class="download-tip" src="../../assets/images/tip.png" />
      <p>为了保证当前仿真软件能够正常启动,请确保安装通用客户端</p>
      <a
        v-if="downloadHref"
        class="btn-download df"
        :href="downloadHref"
        :download="downloadName"
        @click="baiduTrack"
        :id="baiduTrackId"
      >
        <img src="../../assets/images/download-icon.png" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "download-software",
  props: {
    downloadHref: {
      type: String,
      default: ""
    },
    downloadName: {
      type: String,
      default: "下载软件"
    },
    baiduTrackId: {
      type: String,
      default: ""
    }
  },
  methods: {
    baiduTrack() {
      // 百度统计追踪下载记录
      // eslint-disable-next-line
      _hmt.push(["_trackEvent", "download", "click", "下载软件", 1]);
    }
  }
};
</script>

<style>
.download-software {
  background-color: #e6e6e6;
  height: 56px;
  padding: 12px 0;
}
.download-software > div {
  align-items: center;
}
.download-software img.download-tip {
  display: block;
  width: 17px;
  height: 17px;
}
.download-software p {
  margin-left: 10px;
  margin-right: 20px;
}
.btn-download {
  width: 120px;
  padding: 0 15px;
  border-radius: 2px;
  user-select: none;
  cursor: pointer;
}
.btn-download img {
  display: block;
}
</style>
