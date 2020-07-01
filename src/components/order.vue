<template>
  <div class="order">
    <Header title="订单"></Header>

    <!-- 商品展示 -->
    <!-- v-if="Object.keys(myOrder).length > 0" -->
    <div v-if="Object.keys(myOrder).length > 0" class="orderList">
      <div @click="purchase(item)" class="orderItem" v-for="(item,index) in myOrder" :key="index">
        <img :src="item.img" alt />
        <div class="itemInfo">
          <p>{{item.name}}</p>
          <span class="featureTag" v-for="(feature,index) in item.tag " :key="index">{{feature}}</span>
          <p class="orderPrice">
            <span style="font-size:12px">￥</span>
            {{item.price}}
          </p>
        </div>
      </div>
    </div>

    <!-- 为空展示 -->
    <div v-else class="emptyStock">
      <img src="../../static/img/empty.jpg" alt />
    </div>
  </div>
</template>
<style  scoped>
.order {
  height: 100%;
  position: relative;
  padding: 60px 0 0 0;
  box-sizing: border-box;
}
.orderList {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  padding-bottom: 60px;
}
.order .orderItem {
  width: 48%;

  box-sizing: border-box;
  padding: 10px 10px;
  position: relative;
  background: white;
  margin: 5px 1% 5px 1%;
  text-align: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.order .orderItem img {
  width: 95%;
  height: 110px;
  margin-bottom: 10px;
  vertical-align: middle;
  border-radius: 5px;
}
.order .itemInfo {
  vertical-align: bottom;
  text-align: left;
}

.emptyStock img {
  width: 100%;
  height: 620px;
}
.orderTab {
  color: #fff;
  text-align: center;
  height: 48px;
  line-height: 48px;
  border-style: none;
  outline: none;
  width: 30%;
  background: #f44;
  margin-top: 20px;
  position: absolute;
  right: 0px;
  bottom: 60px;
}
.orderPrice {
  color: #f44;
  font-size: 20px;
}
.featureTag {
  padding: 2px 5px;
  border: 1px solid silver;
  border-radius: 4px;
  margin-right: 5px;
  font-size: 10px;
  /* background: pink;
  */

  color: #999;
  font-weight: bold;
  display: inline-block;
  transform: scale(0.9);
}
</style>
<script>
export default {
  data() {
    return {
      myOrder: {}
    };
  },
  mounted() {
    var myStock_s = JSON.parse(localStorage.getItem("myStock_s"));
    if (myStock_s) {
      this.myOrder = JSON.parse(localStorage.getItem("myStock_s"));
    } else {
      this.myOrder = JSON.parse(localStorage.getItem("myStock"));
    }

    for (let index in this.myOrder) {
      this.myOrder[index].price -= -30;
    }

    localStorage.setItem("myOrder", JSON.stringify(this.myOrder));
    localStorage.setItem("myOrder_s", JSON.stringify(this.myOrder));

   
  },
  methods: {
    tab() {
      localStorage.setItem("myStock", JSON.stringify(this.myStock));
      this.$router.push({ name: "stockTab" });
    },
    purchase(item) {
      this.$router.push({
        name: "purchase",
        params: {
          item: item
        }
      });
    }
  }
};
</script>