<template>
  <div>
    <Header title="查询"></Header>
    <div class="searchDetail">
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
    <div v-if="answer.length!=0" class="searchImg">
      <div @click="detail(item.itemId)" v-for=" (item,index) in answer " :key="index">
        <img :src="item.img" alt />
        <div class="sd_itemInfo">
          <p>{{item.name}}</p>
          <p>净含量:{{item.kg}}kg</p>
          <span>￥</span>
          <span>{{item.price- -30}}</span>
          <p class="sd-tags">
            <span v-for="(tags,tagIndex) in item.tag " :key="tagIndex">{{tags}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <p>暂无数据</p>
      <img src="../../static/img/nodata.png" alt />
    </div>
  </div>
</template>
<style scoped>
.searchDetail {
  padding: 60px 0 0 0;
  width: 100%;
  height: 40px;
  /* margin: 10px 0; */
  text-align: center;
}
.searchDetail > div {
  width: 100%;
}
.searchImg {
  margin-top: 20px;
}
.searchImg > div {
  margin: 10px 0;
}
.searchImg img {
  width: 35%;
  vertical-align: middle;
  margin: 0 10px;
  border-radius: 5px;
  height: 120px;
}
.sd_itemInfo {
  width: 55%;
  display: inline-block;
  vertical-align: top;
}
.sd_itemInfo p:nth-child(1) {
  font-size: 20px;
  color: black;
  margin-bottom: 20px;
}
.sd_itemInfo :nth-child(3) {
  font-size: 10px;
  color: #f44;
}
.sd_itemInfo :nth-child(4) {
  font-size: 16px;
  color: #f44;
}
.sd-tags {
  margin: 5px 0;
}
.sd-tags span {
  padding: 2px 5px;
  border: 1px solid deeppink;
  border-radius: 4px;
  margin-right: 5px;
  font-size: 10px;
  color: red;
  font-weight: bold;
  display: inline-block;
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
}
.noData {
  margin-top: 20%;
  text-align: center;
  width: 100%;
}
.noData img{
  width: 90%;
}
</style>
<script>
export default {
  data() {
    return {
      dataList: {},
      keyWord: "",
      restaurants: [],
      state1: "",
      answer: []
    };
  },

  mounted() {
    this.getDataList();
    this.restaurants = this.loadAll();
    var dataList = this.dataList;
    this.keyWord = this.$route.params.keyWord;
  },
  methods: {
    detail(d) {
      this.$router.push({ name: "detail", query: { id: d } });
    },
    search() {
      this.answer = [];
      this.keyWord = this.state1;
      for (let index in this.dataList) {
        if (
          this.dataList[index].name == this.keyWord ||
          this.dataList[index].tag.indexOf(this.keyWord) != -1
        ) {
          this.dataList[index].itemId = index;
          if (this.answer.indexOf(this.dataList[index])) {
            this.answer.push(this.dataList[index]);
          }
        } else {
        }
      }
      console.log(this.answer);
      
    },
    loadAll() {
      return [
        { value: "历史文化" },
        { value: "葡萄酒" },
        { value: "纯天然" },
        { value: "养生" }
      ];
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
      console.log(item);
    },
    getDataList() {
      var _this = this;
      this.$http
        .get("../static/dataList.json")
        .then(function(res) {
          _this.dataList = res.data;

          for (let index in _this.dataList) {
            if (
              _this.dataList[index].name == _this.keyWord ||
              _this.dataList[index].tag.indexOf(_this.keyWord) != -1
            ) {
              _this.dataList[index].itemId = index;
              _this.answer.push(_this.dataList[index]);
            } else {
            }
          }
        })
        .catch(function(error) {
          return error;
        });
    }
  }
};
</script>