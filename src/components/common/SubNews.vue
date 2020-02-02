<template>
  <div class="news-block">
    <div v-if="title" class="block-title df">
      <h3 class="title">{{ title }}</h3>
      <span class="more df" @click="goMore">
        <span>更多</span>
        <img src="../../assets/images/more.png" />
      </span>
    </div>
    <div class="block-list">
      <ul>
        <li
          v-for="item in content"
          :key="item.AbId"
          @click="gotoRoute(item)"
          class="df"
        >
          <span class="list-text">
            <i>·</i>
            {{ item.Title }}
          </span>
          <span class="list-date">{{
            $common.transDate(item.Createtime)
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "news",
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapMutations(["doShowMask"]),
    goMore() {
      this.$router.push(this.$homeUrl + "news");
      this.doShowMask(false);
    },
    gotoRoute(item) {
      window.open(item.IsType === 2 ? item.WebUrl : `/news/${item.AbId}`);
    }
  }
};
</script>

<style>
.news-block {
  font-size: 18px;
  line-height: 2;
  margin-bottom: 10px;
}
.news-block .block-title {
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #ececec;
}
.news-block .block-title h3.title {
  display: block;
  font-size: 18px;
  font-weight: bold;
  line-height: 30px;
  padding: 0 15px;
  color: #fff;
  background-color: #2a4793;
  text-align: center;
}
.news-block .block-title .more {
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.news-block .block-title .more span {
  font-size: 14px;
  color: #999;
}
.news-block .block-title .more img {
  display: block;
  margin-left: 7px;
}
.block-list {
  padding-bottom: 20px;
}
.block-list ul li {
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  cursor: pointer;
  margin-top: 18px;
}
.block-list ul li:hover span {
  color: #2a4793;
}
.block-list span.list-text {
  max-width: 460px;
  font-size: 16px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.block-list span.list-text i {
  margin-right: 10px;
}
.block-list span.list-date {
  font-size: 14px;
  color: #ddd;
}
</style>
