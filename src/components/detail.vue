<template>
  <div class="detail">
    <Header title="详情"></Header>
    <div class="detail-wrap">
      <img class="detailLogo" :src="detailArr.img" alt />
      <div class="Homebuy">
        <b style="margin-right: 40%;font-size: 20px;">购买数量</b>
        <el-input-number size="mini" v-model="num" :min="0"></el-input-number>
      </div>
      <button @click="addStock" style="background:#ff976a">
        <span>加入库存</span>
      </button>
      <button @click="stock"   style="background:#ff4444">
        <span>我的库存</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailArr: {},
      num: 1,
      newsID: "",
      myStock: {},
      inset: "",
      dataList: {}
    };
  },
  created() {
    this.getDataList();
  },
  mounted() {
    var newsID = this.$route.query.id;
    this.newsID = newsID;
    this.getData(newsID);
    //  localStorage.setItem("myStock", JSON.stringify({}));
    if (!JSON.parse(localStorage.getItem("myStock_s"))) {
      this.myStock = JSON.parse(localStorage.getItem("myStock"));
    } else {
      this.myStock = JSON.parse(localStorage.getItem("myStock_s"));
    }

    console.log(this.myStock);
  },
  methods: {
    stock() {
      if (!JSON.parse(localStorage.getItem("isLog"))) {
        this.$toast({ message: "请登录后操作", duration: 800 });
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "stock" });
      }
    },
    addStock() {
      if (!JSON.parse(localStorage.getItem("isLog"))) {
        this.$toast({ message: "请登录后操作", duration: 800 });
        this.$router.push({ name: "login" });
        return;
      }
      console.log(this.dataList[this.newsID]);

      this.insert = this.dataList[this.newsID].name;
      if (!this.myStock[this.insert]) {
        this.dataList[this.newsID].num = this.num;
        this.myStock[this.insert] = this.dataList[this.newsID];
        // this.myStock.push(this.dataList[this.newsID]);
        console.log(this.myStock[this.insert]);
        localStorage.setItem("myStock", JSON.stringify(this.myStock));
        localStorage.setItem("myStock_s", JSON.stringify(this.myStock));

        this.$message({
          message: "添加成功",
          type: "success",
          center: "true",
          duration: "700",
          offset: 400
        });
      } else {
        this.$message({
          message: "该类酒已经在购物车里",
          type: "error",
          center: "true",
          duration: "700",
          offset: 400
        });
      }
    },
    getData(id) {
      var _this = this;
      this.$http
        .get("../static/detail.json")
        .then(function(res) {
          _this.detailArr = res.data[id - 1];
        })
        .catch(function(error) {
          return error;
        });
    },
    getDataList() {
      var _this = this;
      this.$http
        .get("../static/dataList.json")
        .then(function(res) {
          _this.dataList = res.data;
        })
        .catch(function(error) {
          return error;
        });
    }
  }
};
</script>



<style scoped>
.detail {
  background: #f4f4f4;
  height: 100%;
  width: 100%;
  z-index: 120;
  position: absolute;
}
.detail-wrap {
  background: #f4f4f4;
}
.detailLogo {
  width: 100%;
}
.Homebuy {
  border-top: 1px solid #cecece;
  border-bottom: 1px solid #cecece;
  padding: 20px;
}
.detail-wrap button {
  color: #fff;
  text-align: center;
  height: 48px;
  line-height: 48px;
  border-style: none;
  outline: none;

  width: 49.5%;
  /* font-size: 0; */
  margin-top: 20px;
  position: relative;
}
.detail-wrap > button::before {
  content: " ";
  position: absolute;
  left: 100%;
  width: 2%;
  height: 100%;
  border: inherit;
  border-color: #ff976a;
  background-color: #ff976a;
  border-radius: inherit;
}
</style>