<template>
  <div class="sub-cell">
    <div class="cell-title">
      <h3>{{ subCellData.text }}</h3>
    </div>
    <div class="cell-content">
      <div v-if="fileType === 'docs'" class="content-docs">
        <div
          class="content-element df"
          v-for="item in subCellData.content"
          :key="item.Id"
        >
          <div>
            <div class="element-title">
              <span>{{ item.Title }}</span>
            </div>
            <div class="element-info">
              <p>
                这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
              </p>
            </div>
          </div>
          <img
            :src="fileType === 'docs' ? docPic : videoPic"
            @click="open(item)"
          />
        </div>
      </div>
      <div v-else class="df content-video">
        <div
          class="content-element po-r"
          v-for="item in subCellData.content"
          :key="item.Id"
          @click="open(item)"
        >
          <div class="element-video">
            <div class="video-img">
              <img src="../../assets/images/images/video-demo.png" />
            </div>
            <span>{{ item.Title }}</span>
          </div>
          <transition mode="out-in" name="route">
            <div class="modal po-a">
              <div class="video-info">
                <p>
                  这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
                </p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <el-dialog
      v-if="dialogVisible"
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :style="{ fontSize: 14 + 'px' }"
      :before-close="closeDialog"
      :destroy-on-close="true"
    >
      <iframe
        v-if="fileType === 'docs'"
        :src="src"
        frameborder="0"
        style="width: 100%; height: 500px"
      ></iframe>
      <div v-else>
        <Video :src="src" ref="videoComponent" />
        <span slot="footer" class="dialog-footer">
          <Button
            type="primary"
            @btnClick="dialogVisible = false"
            text="关闭窗口"
          ></Button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import pdf from "../../assets/images/images/个人独立博客搭建完全手册.pdf";
import docPic from "../../assets/images/docs.png";
import videoPic from "../../assets/images/videos.png";
import Video from "../common/Video";
import Button from "../common/Button";
export default {
  name: "sub-cell",
  components: {
    Video,
    Button
  },
  data() {
    return {
      docPic: docPic,
      videoPic: videoPic,
      title: "",
      dialogVisible: false,
      src: ""
    };
  },
  props: {
    fileType: {
      type: String,
      required: true
    },
    subCellData: {
      type: Object,
      required: true
    }
  },

  methods: {
    open(item) {
      if (this.fileType === "videos") {
        this.title = item.Title;
        this.src = this.$publicUrl + item.FileInfo;
        this.dialogVisible = true;
      } else if (this.fileType === "docs") {
        this.src = this.$publicUrl + item.FileInfo;
        this.dialogVisible = true;
      }
    },
    closeDialog(done) {
      done();
    }
  }
};
</script>

<style>
.sub-cell {
  background-color: #fff;
  padding: 20px 30px 26px 30px;
}
.cell-title h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  line-height: 1;
  padding-left: 8px;
  border-left: 3px solid #5272c6;
}
.cell-content {
  padding-top: 30px;
  /* justify-content: flex-start; */
  align-items: center;
  flex-wrap: wrap;
}

.content-element {
  /* display: block; */
  user-select: none;
  /* text-align: center; */
  font-size: 12px;
  margin: 10px 0;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.content-element .element-title span {
  display: inline-block;
  width: 115px;
  max-width: 115px;
  line-height: 28px;
  height: 28px;
  border-radius: 2px;
  color: #fff;
  background-color: #2a4793;
  text-align: center;
}
.content-element .element-info p {
  text-align: left;
  max-width: 600px;
  margin-top: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-docs img {
  display: block;
  width: 90px;
  height: 90px;
  cursor: pointer;
}
.content-video {
  flex-wrap: wrap;
  justify-content: space-between;
  transition: all 0.5s;
}
.content-video .content-element {
  height: 240px;
}
.element-video .video-img {
  height: 180px;
  overflow: hidden;
  margin-bottom: 15px;
}
.element-video img {
  display: block;
  width: 390px;
  cursor: pointer;
  margin-top: -15px;
  transition: all 0.5s;
}
.element-video span {
  display: inline-block;
  width: 115px;
  max-width: 115px;
  line-height: 28px;
  height: 28px;
  border-radius: 2px;
  color: #fff;
  background-color: #2a4793;
  text-align: center;
  transition: all 0.5s;
  opacity: 1;
}
.content-video .modal {
  left: 0;
  top: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
}
.modal .video-info {
  padding: 20px;
}
.modal .video-info p {
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content-video .content-element:hover .modal {
  opacity: 1;
}
.content-video .content-element:hover .element-video img {
  margin-top: 0;
}
.content-video .content-element:hover .element-video .video-img {
  height: 218px;
  margin-bottom: -23px;
}
.content-video .content-element:hover .element-video span {
  display: none;
}
</style>
