<template>
  <div class="stockTable">
    <Header title="我的订单"></Header>
    <el-table
      :data="orderTable"
    
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" block class="demo-table-expand" >
            <el-form-item label="分类">
              <span>{{ props.row.tag}}</span>
            </el-form-item>
            <el-form-item label="配送电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="配送地址">
              <span>{{ props.row.region }}</span>
            </el-form-item>
            <el-form-item label="即时配送">
              <span>{{ props.row.delivery }}</span>
            </el-form-item>
            <el-form-item label="支付方式">
              <span>{{ props.row.activeName }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.desc?props.row.desc:"——" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name" :sortable=true></el-table-column>
      <el-table-column label="商品数量" prop="num" :sortable=true></el-table-column>
      <el-table-column label="商品单价" prop="price" :sortable=true></el-table-column>
    </el-table>
    <div class="settle">
      <span>总售出:</span>
      <span>{{sum}}</span>
      <span>元</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderTable: [],

      sum: 0
    };
  },
  mounted() {
    this.orderTable = JSON.parse(localStorage.getItem("purchaseList"));

    console.log(this.orderTable);

    let sum = 0;
    if (this.orderTable) {
      for (let item of this.orderTable) {
        sum += item.price * item.num;
      }
    }

    this.sum = sum;
    localStorage.setItem("orderSum", JSON.stringify(this.sum));
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else if (rowIndex % 2 != 0) {
        return "success-row";
      }
      return "";
    }
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
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>