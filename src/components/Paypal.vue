<template>
  <div class="paypal">
    <div>支付二维码</div>
    <button @click="getOrder">获取支付二维码</button>
    <div class="paypal-show" v-if="paypal">
      <h3>{{ paypal.OrderNumber }}</h3>
      <vue-qr
        :text="paypal.url"
        :size="191"
        :margin="0"
        :auto-color="true"
        :dot-scale="1"
      />
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";
import { mapActions, mapState } from "vuex";
export default {
  name: "paypal",
  components: {
    VueQr
  },
  computed: {
    ...mapState({
      paypal: state => state.user.paypal
    })
  },
  props: {
    UserId: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(["getOrderInfo"]),
    getOrder() {
      this.getOrderInfo({ id: this.UserId, money: 1 });
    }
  }
};
</script>

<style></style>
