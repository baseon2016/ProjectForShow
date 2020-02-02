<template>
  <div class="main-bg">
    <div class="container">
      <div class="tab-common df">
        <Techs techsName="关于我们" />
        <div class="tech-aside">
          <Current nav="关于我们" />
          <div class="courses">
            <transition name="route" mode="out-in">
              <HelpText
                v-if="current === '危化品安全协会'"
                :showData="aboutCCSA"
              />
              <HelpText
                v-if="current === '博赫科技有限公司'"
                :showData="aboutBOHE"
              />
              <HelpText
                v-if="current === '平台信息技术资料'"
                :showData="aboutWEB"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import HelpText from "./HelpText";
import Techs from "./common/Techs";
import Current from "./common/Current";
export default {
  name: "help-info",
  data() {
    return {
      edit: false
    };
  },
  computed: {
    ...mapState({
      current: state => state.techs.current,
      aboutCCSA: state => state.aboutUs.aboutCCSA,
      aboutBOHE: state => state.aboutUs.aboutBOHE,
      aboutWEB: state => state.aboutUs.aboutWEB
    })
    // ...mapGetters(["showAboutUs"])
  },
  components: {
    Techs,
    Current,
    HelpText
  },

  methods: {
    ...mapActions(["getAboutUs"])
  },

  created() {
    this.getAboutUs();
  }
};
</script>

<style></style>
