<template>
  <div id="app">
    <router-view />
  </div>    
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  beforeMount() {
    let account = JSON.parse(localStorage.getItem("account"));
 
  },
  mounted() {
    var myStock_s = JSON.parse(localStorage.getItem("myStock_s"));
    var myOrder_s = JSON.parse(localStorage.getItem("myOrder_s"));
    if (myStock_s) {
      localStorage.setItem("myStock", JSON.stringify(myStock_s));
    }
    if (myOrder_s) {
      localStorage.setItem("myOrder", JSON.stringify(myOrder_s));
    }
  }
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style-type: none;
}
html {
  width: 100%;
  height: 100%;
  font-size: 14px;
}

#app,
body {
  position: relative;
  height: 100%;
  width: 100%;
  background: #f4f4f4;
  overflow-x: hidden;
  color: #666;
}
*::-webkit-scrollbar {
  display: none;
}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
