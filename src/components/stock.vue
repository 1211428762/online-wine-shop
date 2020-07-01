<template>
  <div class="stock">
    <Header title="库存"></Header>

    <!-- 商品展示 -->
    <!-- v-if="Object.keys(myStock).length > 0" -->
    <div class="allStock" v-if="Object.keys(myStock).length > 0">
      <div class="stockItem" v-for="(item,index) in myStock" :key="index">
        <el-checkbox v-model="item.exist"></el-checkbox>
        <img :src="item.img" alt />
        <div class="itemInfo">
          <p>{{item.name}}</p>
          <p>
            <span class="oldPrice">￥{{item.price*1 + 30}}</span>
            ￥{{item.price}}
          </p>
          <el-input-number size="mini" v-model="item.num" :min="0"></el-input-number>
        </div>
        <div class="itemDel" @click="del(item)">
          <i class="el-icon-delete"></i>
        </div>
      </div>
      <!-- <button class="stockBuy" @click="buy">结算</button> -->
      <button class="stockTab" @click="tab">生成表格</button>
    </div>

    <!-- 为空展示 -->
    <div v-else class="emptyStock">
      <img src="../../static/img/empty.jpg" alt />
    </div>
  </div>
</template>
<style  scoped>
.stock {
  height: 100%;
  position: relative;
  padding: 60px 0 0 0;
  box-sizing: border-box;
}
.stock .stockItem {
  padding: 10px 20px;
  position: relative;
  background: white;
  border-bottom: 1px solid #ccc;
}
.stock .stockItem img {
  width: 28%;
  vertical-align: middle;
  margin: 0 10px;
  border-radius: 5px;
  height: 80px;
}
.stock .itemInfo {
  width: 55%;
  display: inline-block;
  vertical-align: bottom;
}
.stock .itemInfo p:nth-child(2) {
  color: #f44;
}
.oldPrice {
  font-size: 12px;
  color: #666;
  text-decoration: line-through;
}
.stock .itemDel {
  display: inline-block;
}
.emptyStock img {
  width: 100%;
  height: 620px;
}
.stockTab,
.stockBuy {
  color: #fff;
  text-align: center;
  height: 42px;
  line-height: 42px;
  border-style: none;
  outline: none;
  width: 27%;
  background: #f44;
  margin-top: 20px;
  position: fixed;
}
.stockTab {
  right: 0px;
  bottom: 60px;
}
.stockBuy {
  right: 50%;
  bottom: 60px;
  background: #22b3c8;
}
.allStock {
  padding-bottom: 60px;
}
</style>
<script>
export default {
  data() {
    return {
      myStock: {}
    };
  },
  mounted() {
    this.myStock = JSON.parse(localStorage.getItem("myStock"));
  },
  methods: {
    del(d) {
      if (d.exist) {
        this.$messagebox
          .confirm("确定删除该项?")
          .then(action => {
            if (action === "confirm") {
              d.num++;
              delete this.myStock[d.name];
              localStorage.setItem("myStock", JSON.stringify(this.myStock));

              localStorage.setItem("myStock_s", JSON.stringify(this.myStock));
            }
            if (action === "cancel") {
              return;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    tab() {
      localStorage.setItem("myStock", JSON.stringify(this.myStock));
      localStorage.setItem("myStock_s", JSON.stringify(this.myStock));
      this.$router.push({ name: "stockTab" });
    },
    buy() {
      this.$router.push({ name: "settle" });
    }
  }
};
</script>