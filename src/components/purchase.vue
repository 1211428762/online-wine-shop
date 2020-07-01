<template>
  <div class="purchase">
    <Header title="结算"></Header>

    <div class="address">
      <el-form label-position="left" ref="form" :model="form" label-width="80px">
        <el-form-item label="电话">
          <el-select size="mini" v-model="form.phone" placeholder="请选择活动区域">
            <el-option label="13543565736" value="13543565736"></el-option>
            <el-option label="13945465142" value="13945465142"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini" label="收货地址">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="浙江绍兴" value="浙江绍兴"></el-option>
            <el-option label="湖北荆州" value="湖北荆州"></el-option>
            <el-option label="甘肃兰州" value="甘肃兰州"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="shopItem">
      <h4>商品明细</h4>
      <div>
        <span>
          <img :src="items.img" alt />
        </span>
        <div class="shopDetail">
          <p>{{items.name}}</p>
          <p>￥{{items.price}}</p>
        </div>
        <div>x{{items.num}}</div>
      </div>
    </div>
    <div class="pay-wrap">
      <h4>支付方式</h4>
      <el-tabs v-model="activeName" :stretch="auto" type="border-card">
        <el-tab-pane label="在线支付" name="first">支持支付宝支付、微信支付、银行卡支付、财付通等</el-tab-pane>
        <el-tab-pane label="货到付款" name="second">货到再付款，支持现金交易</el-tab-pane>
      </el-tabs>
    </div>
    <div class="shopComment">
      <h4>备注</h4>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="desc"
      ></el-input>
    </div>
    <div class="overPay">
      <span>
        <span>合计:</span>
        <span>￥{{items.price*items.num}}</span>
      </span>

      <button @click="overPay">结算</button>
    </div>
  </div>
</template>
<style scoped>
.address {
  /* padding-top: 60px; */
  padding: 60px 10px 0;
  background: white;
}

.shopItem,
.pay-wrap,
.shopComment {
  font-size: 14px;
  background: white;
  margin: 20px 0;
}
.shopItem h4,
.pay-wrap h4,
.shopComment h4 {
  border-bottom: 1px solid #eaeaea;
  padding: 15px 10px;
}
.shopComment {
  margin-bottom: 70px;
  padding: 10px 0;
}
.shopItem > div {
  padding: 15px;
}
.shopItem img {
  width: 150px;
  height: 110px;
}
.shopItem > div > div {
  display: inline-block;
}
.shopDetail {
  vertical-align: 50px;
  margin: 0 10px;
}
.shopDetail :nth-child(1) {
  font-size: 20px;
}
.shopDetail :nth-child(2) {
  color: #f44;
  font-size: 15px;
}
.shopItem > div > div:nth-of-type(2) {
  margin: 20px 30px 0 0;
  float: right;
}
.overPay {
  height: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 14px;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;

  background: white;
}
.overPay > span {
  margin-left: 50%;
}
.overPay > span :nth-child(2) {
  color: #f44;
  font-size: 18px;
}
.overPay button {
  display: inline-block;
  position: absolute;
  padding: 0;
  height: 44px;
  line-height: 42px;
  font-size: 16px;
  border-radius: 2px;
  text-align: center;
  box-sizing: border-box;
  color: #fff;
  background-color: #f44;
  border: 1px solid #f44;
  width: 100px;
  height: 50px;
  line-height: 48px;
  right: 0;
}
</style>
<script>
export default {
  data() {
    return {
      form: {
        phone: "13543565736",
        region: "",
        delivery: false
      },
      auto: true,
      value: "",
      items: {},
      activeName: "first",
      desc: "",
      purchaseList: [],
      myStock: {}
    };
  },
  mounted() {
    var myStock = JSON.parse(localStorage.getItem("myStock"));
    localStorage.setItem("myStock", JSON.stringify(myStock));
    this.items = this.$route.params.item;
    this.myStock = JSON.parse(localStorage.getItem("myStock"));
    // this.purchaseList = JSON.parse(localStorage.getItem("purchaseList"));
    var tableData = [];
    for (var i in this.myStock) {
      let listItem = {
        name: "",
        price: "",
        num: ""
      };
      listItem.name = this.myStock[i].name;
      listItem.price = this.myStock[i].price - -30;
      listItem.num = this.myStock[i].num;
      listItem.tag = this.myStock[i].tag.join(",");
      tableData.push(listItem);
    }
    this.purchaseList = tableData;
  },
  methods: {
    overPay() {
  
      var purchaseItem = {};
      purchaseItem = this.items;
      delete purchaseItem.exist;
      purchaseItem.tag = purchaseItem.tag.join(",");
      purchaseItem.desc = this.desc;
      purchaseItem.phone = this.form.phone;
      purchaseItem.region = this.form.region;
      purchaseItem.delivery = this.form.delivery;
      purchaseItem.activeName = this.activeName;
      purchaseItem.activeName == "first"
        ? (purchaseItem.activeName = "在线支付")
        : (purchaseItem.activeName = "货到付款");
      purchaseItem.delivery
        ? (purchaseItem.delivery = "是")
        : (purchaseItem.delivery = "否");

      for (let i in this.purchaseList) {
        if (this.purchaseList[i].name == purchaseItem.name) {
          this.purchaseList.splice(i, 1, purchaseItem);
        }
      }

      if (!this.form.phone && !this.form.region) {
        this.$toast("信息未完善");
        return;
      }
      if (this.activeName == "first") {
        this.$router.push({ name: "payCode" });
      } else {
        this.$router.push({ name: "paySuccess", query: { boo: true } });
      }

      localStorage.setItem("purchaseList", JSON.stringify(this.purchaseList));
     
    }
  }
};
</script>