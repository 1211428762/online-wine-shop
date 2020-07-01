<template>
  <div class="homePage">
    <router-view />
    <div class="homeHead">酒品分销</div>
    <div class="homeLunbo">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <router-link :to="{name:'detail',query:{id:1}}" style="height:100%" tag="div">
            <img src="../../static/img/maotai.jpg" alt />
          </router-link>
        </mt-swipe-item>
        <mt-swipe-item>
          <router-link :to="{name:'detail',query:{id:2}}" style="height:100%" tag="div">
            <img src="../../static/img/wuliangye.jpg" alt />
          </router-link>
        </mt-swipe-item>
        <mt-swipe-item>
          <router-link :to="{name:'detail',query:{id:3}}" style="height:100%" tag="div">
            <img src="../../static/img/guanyu.jpg" alt />
          </router-link>
        </mt-swipe-item>
        <mt-swipe-item>
          <router-link :to="{name:'detail',query:{id:4}}" style="height:100%" tag="div">
            <img src="../../static/img/grape.jpg" alt />
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="homeSearch">
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
        class="input-with-select"
        clearable
      >
        <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
      </el-autocomplete>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="精品展示" name="first">
        <p class="homeTitle">
          <i class="el-icon-sold-out"></i> Hot热卖
        </p>
        <div class="boutique">
          <router-link
            tag="div"
            v-for="(item,index) in boutiqueArr1"
            :key="index"
            :to="{name:'detail',query:{id:index+5}}"
          >
            <img :src="item.img" alt />
            <p>
              {{item.name}}
              <span class="homePrice">
                <i style="color:black" class="el-icon-coin"></i>
                {{item.price}}起
              </span>
            </p>
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="入库推荐" name="second">
        <p class="homeTitle">
          <i class="el-icon-sold-out"></i> Hot热卖
        </p>
        <div class="boutique">
          <router-link
            tag="div"
            v-for="(item,index) in boutiqueArr2"
            :key="index"
            :to="{name:'detail',query:{id:index+9}}"
          >
            <img :src="item.img" alt />
            <p>
              {{item.name}}
              <span class="homePrice">
                <i style="color:black" class="el-icon-coin"></i>
                {{item.price}}起
              </span>
            </p>
          </router-link>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="homeShow"></div>
    <!-- <mt-button type="primary" @click="test">default</mt-button> -->
  </div>
</template>
<style scoped>
.homeHead {
  text-align: center;
  background: #cf2f2f;
  height: 50px;
  line-height: 50px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 2px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
}
.homeSearch {
  width: 100%;
  height: 40px;
  margin: 10px 0;
  text-align: center;
}
.homeSearch > div {
  width: 100%;
}
.el-carousel__item img {
  height: 100%;
  width: 100%;
}
.homeLunbo {
  height: 255px;
  margin-top: 50px;
  margin-bottom: 20px;
}
.homeLunbo .mint-swipe img {
  width: 100%;
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.boutique {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  flex-wrap: wrap;
}
.boutique > div {
  width: 40%;
  height: 160px;
  position: relative;
}
.boutique img {
  width: 100%;
  border-radius: 5px;
  height: 120px;
}
.boutique p {
  padding: 0 10px;
  margin: 5px 0;
  font-size: 14px;
  color: brown;
}
.homeShow {
  padding: 10px;
  margin-bottom: 60px;
}

.homeTitle {
  display: inline-block;
  margin-bottom: 10px;
  color: red;
  -webkit-animation: Tada 3s both infinite;
  -moz-animation: Tada 3s both infinite;
  -ms-animation: Tada 3s both infinite;
  animation: Tada 3s both infinite;
}
@keyframes Tada {
  0% {
    transform: scale(1);
    transform: scale(1);
  }
  70%,
  73% {
    transform: scale(0.8);
    transform: scale(0.9);
  }
  77%,
  83%,
  90%,
  97% {
    transform: scale(1.2) rotate(10deg);
    transform: scale(1.2) rotate(10deg);
  }

  80%,
  87%,
  93% {
    transform: scale(1.2) rotate(-10deg);
    transform: scale(1.2) rotate(-10deg);
  }

  100% {
    transform: scale(1) rotate(0);
    transform: scale(1) rotate(0);
  }
}
.homePage /deep/ .el-tabs__content {
  padding: 0 20px;
}
.homePrice {
  position: absolute;
  right: 0;
  bottom: 4px;
  font-size: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      activeName: "second",
      restaurants: [],
      dataList: {},
      state1: "",
      boutiqueArr1: [],
      boutiqueArr2: []
    };
  },
  mounted() {
    this.getRecommand();
    this.restaurants = this.loadAll();

  },
  methods: {
    search() {
      this.$router.push({
        name: "searchDetail",
        params: { keyWord: this.state1 }
      });
    },
    loadAll() {
      return [
        { value: "茅台" },
        { value: "五粮液" },
        { value: "知名品牌" },
        { value: "养生" }
      ];
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;

      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      // console.log(item);
    },
    getRecommand() {
      var _this = this;
      this.$http
        .get("../static/recommand.json")
        .then(function(res) {
          _this.boutiqueArr1 = res.data[0];
          _this.boutiqueArr2 = res.data[1];
        })
        .catch(function(error) {
          return error;
        });
    }
  }
};
</script>