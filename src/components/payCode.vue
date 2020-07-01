<template>
  <div class="payCode">
    <Header title="支付"></Header>
    <!-- <p>推荐使用二维码</p> -->
    <img src="../../static/img/code.jpg" alt />
    <!-- <p>扫一扫</p> -->
  </div>
</template>
<style scoped>
.payCode {
  padding: 60px 0 0 0;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
  /* background: #009ee7; */
}
.payCode p {
  padding: 40px 0 0 0;
  color: white;
  font-size: 30px;
}
.payCode img {
  /* padding: 20px; */
  width: 100%;
  background: white;
  /* margin: 50px 0 0 0; */
}
</style>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    var that = this;
    $(".payCode img ").click(function() {
        console.log(1);
        
      setTimeout(function() {
        that.$router.push({ name: "paySuccess", query: { boo: false } });
      }, 3000);
    });
  }
};
</script>