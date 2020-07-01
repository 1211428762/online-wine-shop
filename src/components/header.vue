<template>
  <div class="headerTitle">
    <div class="header-left" @click="$router.go(-1)">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="header-in">{{title}}</div>
    <div class="header-rigth"></div>
  </div>
</template>
<script>
export default {
  name: "headerTitle",
  props: ["title"]
};
</script>
<style scoped>
.headerTitle {
  width: 100%;
  height: 60px;
  background: #fff;
  line-height: 60px;
  position: fixed;
  top: 0;
  z-index: 150;
  font-size: 16px;
  left: 0;
}
.header-left {
  width: 10%;
  text-align: center;
  height: 100%;
  display: inline-block;
  font-size: 20px;
}
.header-in {
  width: 80%;
  display: inline-block;
  text-align: center;
}

.header-rigth {
  width: 10%;
  display: inline-block;
}
</style>