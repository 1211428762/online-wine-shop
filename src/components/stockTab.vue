<template>
  <div class="stockTable">
    <Header title="库存报表"></Header>
    <el-table stripe :data="tableData" border show-summary :row-class-name="tableRowClassName"  style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="num" sortable label="商品数量"></el-table-column>
      <el-table-column prop="price" sortable label="商品单价"></el-table-column>
    </el-table>
    <div class="settle">
      <span>总购入: </span>
      <span> {{sum}}</span>
      <span> 元 </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      myStock: [],
      sum: 0
    };
  },
  mounted() {
    var tableData = [];
    this.myStock = JSON.parse(localStorage.getItem("myStock"));
    for (var i in this.myStock) {
      let listItem = {
        name: "",
        price: "",
        num: ""
      };
      listItem.name = this.myStock[i].name;
      listItem.price = this.myStock[i].price;
      listItem.num = this.myStock[i].num;
      tableData.push(listItem);
    }
    this.tableData = tableData;

    let sum = 0;
    for (let item of tableData) {
      sum += item.price * item.num;
    }
    this.sum = sum;
    localStorage.setItem("stockSum", JSON.stringify(this.sum));
  },
  methods: { tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else if (rowIndex % 2 != 0) {
        return "success-row";
      }
      return "";
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    }
  }
};
</script>
<style scoped>
.stockTable {
  padding: 60px 0 0 0;
}
.settle {
  float: right;
  margin: 10px;
}
.settle :nth-child(1),
.settle :nth-child(3) {
  color: #555;
}
.settle :nth-child(2) {
  color: #f44;
  font-size: 20px;
}
</style>