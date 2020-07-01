<template>
  <div class="perCenter">
    <Header title="个人中心"></Header>
    <div class="perContent">
      <div class="container">
        <div class="userImg">
          <img src="../../static/img/admin.jpg" />
        </div>
        <div class="userName">{{userName}}</div>
      
      </div>
      <div class="personList" @click="orderTable">
        <i class="el-icon-notebook-2"></i>
        &nbsp; 订单报表
        <i class="userLink el-icon-arrow-right"></i>
      </div>
      <div class="personList" @click="profit">
        <i class="el-icon-money"></i>
        &nbsp; 盈利详情
        <i class="userLink el-icon-arrow-right"></i>
      </div>
      <div class="personList" @click="logOut">
        <i class="el-icon-switch-button"></i>
        &nbsp; 退出登录
        <i class="userLink el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName:"admin"
    };
  },
  mounted() {
    let account = JSON.parse(localStorage.getItem("account"));
    if(!account){

    }else{
      this.userName=account.nickName
    }
  },
  methods: {
    orderTable() {
      this.$router.push({ name: "personOrder" });
    },
    profit() {
      var orderSum = JSON.parse(localStorage.getItem("orderSum"));
      var stockSum = JSON.parse(localStorage.getItem("stockSum"));
      if (orderSum && stockSum) {
        this.$router.push({ name: "profit" });
      } else {
        this.$toast("订单未结算");
      }

      // this.$router.push({ name: "personOrder" });
    },
    logOut() {
       localStorage.setItem("isLog", JSON.stringify(false));
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped >
.perContent {
  padding-top: 60px;
}
.perContent .container {
  height: 170px;
  /* background: url(../../static/img/bj.png) no-repeat;
   */
  background: #fe5455;
  text-align: center;
  color: #fff;
  padding: 10px 0;
}
.perContent .container .userImg {
  width: 16%;
  margin: 20px auto;
}
.userImg img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.userName {
  font-size: 18px;
  margin: 10px 0;
}
.userState {
  font-size: 25px;
}
.personList {
  font-size: 15px;
  background: white;
  height: 50px;
  border-bottom: 1px #c5ab97 solid;
  line-height: 50px;
  padding: 0 20px;
}
.userLink {
  float: right;
  line-height: 50px;
  cursor: pointer;
}
</style>