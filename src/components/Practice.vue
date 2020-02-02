<template>
  <div class="main-bg">
    <div class="learn-banner">
      <img src="../assets/images/practice-banner.png" alt="在线练习" />
    </div>
    <DownloadSoftware
      :downloadHref="`${$publicDownload}/BH.App.Output.rar`"
      downloadName="在线练习软件下载"
      baiduTrackId="practice"
    />
    <div class="container">
      <div class="tab-common">
        <div class="tech-aside fff-bg">
          <div class="filter">
            <div class="filter-item df">
              <div class="filter-item-title">工艺分类:</div>
              <div class="category-list df">
                <span
                  v-for="item in technology"
                  :key="item.Id"
                  :class="{
                    active: item.CategoryName === active,
                    category: true
                  }"
                  @click="selectCategory(item)"
                  >{{ item.CategoryName }}</span
                >
              </div>
            </div>
            <div class="filter-item-subtype df">
              <div class="filter-item-title">科目类别:</div>
              <el-radio-group v-model="subtype" size="small">
                <el-radio border label="3">科目三</el-radio>
                <el-radio border label="4">科目四</el-radio>
              </el-radio-group>
            </div>
            <div class="filter-sort df">
              <div class="df filter-sort-order">
                <div class="df" @click="sorting('hot')">
                  <span :class="{ active: sort.type === 'hot' }">热门</span>
                  <div>
                    <div v-if="sort.type === 'hot'">
                      <img
                        v-if="sort.order"
                        src="../assets/images/sort-descending.png"
                      />
                      <img v-else src="../assets/images/sort-ascending.png" />
                    </div>
                    <img v-else src="../assets/images/sort-inactive.png" />
                  </div>
                </div>
                <div class="df" @click="sorting('popular')">
                  <span :class="{ active: sort.type === 'popular' }">人气</span>
                  <div>
                    <div v-if="sort.type === 'popular'">
                      <img
                        v-if="sort.order"
                        src="../assets/images/sort-descending.png"
                      />
                      <img v-else src="../assets/images/sort-ascending.png" />
                    </div>
                    <img v-else src="../assets/images/sort-inactive.png" />
                  </div>
                </div>
              </div>
              <p>共{{ showPractice.length }}个单元</p>
            </div>
          </div>

          <div class="courses" v-loading="!showPractice.length">
            <CourseList :data="showPractice" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import DownloadSoftware from "./common/DownloadSoftware";
import CourseList from "./common/CourseList";
export default {
  name: "practice",
  data() {
    return {
      UserId: null,
      subtype: "3",
      sort: {
        type: "hot",
        order: true
      }
    };
  },
  components: {
    CourseList,
    DownloadSoftware
  },
  computed: {
    ...mapState({
      technology: state => state.technology.technology,
      active: state => state.technology.active,
      activeId: state => state.technology.activeId,
      coursePractice: state => state.practice.coursePractice
    }),
    showPractice() {
      const courseData = [...this.coursePractice].filter(
        item => item.SubType === this.subtype
      );
      return courseData;
    }
  },
  methods: {
    ...mapActions(["getPractice", "getPracticeFile", "softWare"]),
    ...mapMutations(["getActive", "changeTab"]),
    selectCategory(item) {
      if (item.CategoryId !== this.activeId) {
        this.getActive(item);
        this.getPracticeFile(this.UserId);
      }
    },
    sorting(type) {
      if (this.sort.type === type) {
        this.sort.order = !this.sort.order;
      } else {
        this.sort.type = type;
        this.sort.order = true;
      }
    },
    clickConfirm(text, title, type) {
      this.$confirm(text, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
        center: true
      })
        .then(() => {
          this.changeTab("login");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$router.back();
        });
    },
    startSoftware(CourseId) {
      const UserId = this.UserId;
      const type = "1";
      this.softWare({ UserId, CourseId, type });
    }
  },
  created() {
    let UserId = localStorage.getItem("UserId");
    if (!UserId) {
      UserId = sessionStorage.getItem("UserId");

      if (!UserId) {
        this.clickConfirm("用户未登录，请先登录", "警告", "warning");
      }
    }
    this.UserId = UserId;
    this.getPractice(UserId);
  }
};
</script>

<style>
.courses {
  min-height: 70vh;
  padding: 0 20px 20px;
}
.filter {
  padding: 20px;
}
.filter-item-subtype {
  margin-bottom: 20px;
}
.filter-item-title {
  flex-shrink: 0;
  width: 120px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.filter-sort {
  justify-content: space-between;
  background-color: #f2f2f2;
  height: 46px;
  padding: 15px 0;
}
.filter-sort-order > div {
  padding: 0 40px;
  cursor: pointer;
  align-items: center;
}
.filter-sort-order > div:first-child {
  border-right: 1px solid #ccc;
}
.filter-sort-order span {
  display: block;
  font-size: 14px;
  color: #333;
  line-height: 1;
  margin-right: 10px;
}
.filter-sort-order span.active {
  color: #3d5baa;
}
.filter-sort p {
  font-size: 14px;
  color: #333;
  line-height: 1;
  margin-right: 10px;
}
.filter-item .category-list {
  flex-wrap: wrap;
  align-content: flex-start;
}
.category-list span.category {
  display: block;
  font-size: 12px;
  line-height: 1.5;
  color: #333;
  background-color: #fff;
  padding: 5px 10px;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: none;
  background-color: #f7f7f7;
}
.category-list span.category.active,
.category-list span.category:hover {
  background-color: #3d5baa;
  color: #fff;
}
.category-list span.category + span.category {
  margin-left: 10px;
}
</style>
