<template>
  <div class="user-msgs mg-t-14">
    <div class="info-area">
      <div v-if="showMsgs.length" class="msg-list">
        <div v-for="item in showMsgs" class="msg-item" :key="item.MesId">
          <div class="msg-date">
            {{ $common.transDate(item.Createtime) }}&nbsp;{{
              $common.transTime(item.Createtime)
            }}
          </div>
          <div class="msg-content">
            <div class="msg-title df">
              <span class="msg-title-text">{{ item.Title }}</span>
              <span class="msg-isread">{{
                item.IsRead ? "已读" : "未读"
              }}</span>
            </div>
            <div class="po-r">
              <transition mode="out-in" name="route">
                <div
                  :key="item.showDetail"
                  :class="{
                    'msg-text': true,
                    'msg-text-detail': item.showDetail
                  }"
                >
                  {{ item.Remark }}
                </div>
              </transition>
              <span class="msg-detail po-a" @click="showDetail(item)">{{
                item.showDetail === true ? "关闭详情" : "查看详情"
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <img src="../assets/images/no-msg.png" />
        <p>暂无消息</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "user-msgs",

  computed: {
    ...mapGetters(["showMsgs"])
  },
  methods: {
    ...mapActions(["updateIsRead"]),
    showDetail(payload) {
      this.updateIsRead(payload);
    }
  }
};
</script>

<style>
.msg-list {
  overflow-y: auto;
  height: 60vh;
}
.msg-item {
  font-size: 14px;
  margin-bottom: 20px;
}
.no-data {
  width: 180px;
  padding-top: 50px;
  margin: 0 auto;
  min-height: 50vh;
}
.no-data img {
  display: block;
  width: 100%;
  margin-bottom: 30px;
}
.no-data p {
  font-size: 18px;
  color: #999;
  text-align: center;
}
.msg-date {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-bottom: 10px;
}
.msg-content {
  background-color: #f5f6fa;
  border-radius: 8px;
  padding: 25px;
}
.msg-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  justify-content: space-between;
}
.msg-title-text {
  max-width: 600px;
}
.msg-isread {
  font-size: 14px;
  color: #666;
  align-self: flex-end;
}
.msg-text {
  max-width: 600px;
  font-size: 14px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.msg-text.msg-text-detail {
  max-width: 100%;
  white-space: normal;
  text-overflow: unset;
}
.msg-detail {
  color: #2a4793;
  right: 0;
  bottom: 0;
  cursor: pointer;
  user-select: none;
}
</style>
