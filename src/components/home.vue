<template>
  <div class="content">
    <div class="mainContent">
      <router-view></router-view>
    </div>
    <nav>
      <router-link to="/first" class="tab checkLog" title="first" tag="div">
        <i class="el-icon-goblet-square-full"></i>
        <p>首页</p>
      </router-link>
      <router-link to="/stock" class="tab checkLog" title="stock" tag="div">
        <i class="el-icon-shopping-cart-2"></i>
        <p>库存管理</p>
      </router-link>
      <router-link to="/order" class="tab checkLog" title="order" tag="div">
        <i class="el-icon-document"></i>
        <p>订单管理</p>
      </router-link>
      <router-link to="/person" class="tab checkLog" title="person" tag="div">
        <i class="el-icon-user"></i>
        <p>个人中心</p>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Data: [],
      pageUrl: ""
    };
  },
  mounted() {
    var that = this;
    $(".checkLog").click(function(item) {
      if (JSON.parse(localStorage.getItem("isLog"))) {
        $(".checkLog")
          .eq($(this).index())
          .addClass("cur")
          .siblings()
          .removeClass("cur");
        that.$router.push({ name: item.delegateTarget.title });
        console.log(item.delegateTarget.title, that.$router);
      } else {
        that.pageUrl = "/" + item.delegateTarget.title;
        that.$toast({ message: "请登录后操作", duration: 800 });
        that.$router.push({ name: "login" });
      }
    });
  },
  methods: {
    stock() {
      if (JSON.parse(localStorage.getItem("isLog"))) {
        this.$router.push({ name: "stock" });
      } else {
        this.$toast("请登录后操作");
        setTimeout(function() {
          this.$router.push({ name: "login" });
        }, 1000);
      }
    },
    order() {
      if (JSON.parse(localStorage.getItem("isLog"))) {
        this.$router.push({ name: "order" });
      } else {
        this.$toast("请登录后操作");
        setTimeout(function() {
          this.$router.push({ name: "login" });
        }, 1000);
      }
    },
    person() {
      if (JSON.parse(localStorage.getItem("isLog"))) {
        this.$router.push({ name: "person" });
      } else {
        this.$toast("请登录后操作");
        setTimeout(function() {
          this.$router.push({ name: "login" });
        }, 1000);
      }
    }
  }
};
</script>

<style scoped >
nav {
  width: 100%;
  height: 58px;
  position: fixed;
  z-index: 100;
  bottom: 0;
  color: #666;
  background: white;
}
nav > div {
  transform: scale(0.85);
}
.tab {
  width: 24%;
  height: 100%;
  margin-top: 8px;
  display: inline-block;
  text-align: center;
}
.tab i {
  font-size: 25px;
}
.tab p {
  font-size: 14px;
}
.cur {
  color: #dd2645;
}
.router-link-active {
  color: #dd2645;
}
.content {
  height: 100%;
  width: 100%;
}
.mainContent {
  background: #f4f4f4;
  height: 100%;
}
</style>