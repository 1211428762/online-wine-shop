<template>
  <div class="profit">
    <Header title="盈利情况"></Header>
    <p>计算盈利</p>

    <div class="box">
      <div class="water">
        <div class="wave"></div>
      </div>
    </div>

    <div class="calProfit">
      <p>
        总收入:
        <span class="income">{{income}}</span>
      </p>

      <p>
        总购入:
        <span style="color:#555" class="outcome">
          <i style="float:left;font-size：20px">-</i>
          {{outcome}}
        </span>
      </p>
      <div class="comeLine"></div>
      <br />
      <p style="color:#f44" class="allIncome">{{income-outcome}}</p>
    </div>

    <button class="createPro" @click="createPro">生成盈利</button>
  </div>
</template>
<style scoped>
.profit {
  text-align: center;
  padding-top: 80px;
}
.box {
  width: 200px;
  height: 200px;
  margin: 50px auto 10px;
  border-radius: 50%;
  position: relative;
  border: 2px solid deepskyblue;
}
.water,
.wave {
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.water {
  width: 90%;
  overflow: hidden;
  height: 90%;
  background: dodgerblue;
  border-radius: 50%;
}
.wave {
  width: 150%;
  height: 150%;
  top: 0;
  background: white;
  border-radius: 40%;
  animation: move 5s infinite linear;
}
.fadeLeft {
  animation: fadeLeft 1s linear forwards;
}
.fadeUp {
  animation: fadeUp 1s linear forwards;
}
.fadeRight {
  animation: fadeRight 1s linear forwards;
}
@keyframes move {
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes fadeLeft {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fadeUp {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fadeRight {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.income,
.outcome,
.allIncome,
.comeLine {
  opacity: 0;
}
.calProfit p {
  text-align: right;
  margin-right: 70px;
}
.calProfit > div {
  width: 50px;
  background: red;
  height: 1px;
  float: right;
  margin: 10px 65px 0 0;
}
.calProfit p:nth-child(1) span {
  color: #ff3333;
  font-size: 25px;
  display: inline-block;
  width: 50px;
}
.calProfit p:nth-child(2) span {
  color: #ff3333;
  font-size: 15px;
  display: inline-block;
  width: 50px;
}
.createPro {
  color: #fff;
  text-align: center;
  height: 42px;
  line-height: 42px;
  border-style: none;
  outline: none;
  width: 27%;
  background: deepskyblue;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      income: "",
      outcome: ""
    };
  },
  mounted() {
    let income = JSON.parse(localStorage.getItem("orderSum"));
    let outcome = JSON.parse(localStorage.getItem("stockSum"));
    if (income && outcome) {
      this.income = income;
      this.outcome = outcome;
    } else {
      this.income = null;
      this.outcome = null;
    }
  },
  methods: {
    createPro() {
      $(".wave").animate({ top: "-146px" }, 6000);
      setTimeout(function() {
        $(".income").addClass("fadeLeft");
      }, 500);
      setTimeout(function() {
        $(".outcome").addClass("fadeLeft");
      }, 2000);
      setTimeout(function() {
        $(".comeLine").addClass("fadeRight");
      }, 3000);
      setTimeout(function() {
        $(".allIncome").addClass("fadeUp");
      }, 4000);
    }
  }
};
</script>