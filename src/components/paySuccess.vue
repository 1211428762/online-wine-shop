<template>
  <div class="paySuccess">
    <Header title="结算"></Header>
    <div v-if="$route.query.boo">
      
      <img src="../../static/img/success.jpg" alt />
      <p>订单已完成</p>
      <p>祝您生活愉快 感谢您的支持与厚爱</p>
    </div>
    <div v-else>
        
      <img src="../../static/img/fail.jpg" alt />
      <p>支付失败,请重试</p>
      
    </div>
  </div>
</template>
<style scoped>
.paySuccess {
  height: 100%;
  background: #f6f6f6;
  text-align: center;
}
.paySuccess img {
  width: 50%;
  margin: 100px 0 30px 0;
}
</style>