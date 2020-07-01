<template>
  <div class="bruce flex-ct-x">
    <form class="bubble-distribution">
      <h3 v-if="isLog">登录</h3>
      <h3 v-if="!isLog">注册</h3>
      <input
        class="nickName"
        type="text"
        v-model="nickName"
        placeholder="请输入昵称"
        pattern="[A-z]{6}"
        maxlength="6"
        required
        autocomplete="on"
        v-if="!isLog"
      />
      <div class="accout">
        <input
          class="accountInput"
          type="text"
          v-model="phone"
          placeholder="请输入账号"
          pattern="^1[3456789]\d{9}$|^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$"
          required
          autocomplete="on"
        />
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" />
      </div>
      <div class="password">
        <input
          type="password"
          v-model="password"
          placeholder="请输入密码"
          pattern="^[\dA-Za-z_]{6,20}$"
          required
          autocomplete="on"
        />
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" />
      </div>
      <div class="code">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" />
      </div>
      <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" />
      <ul>
        <li>
          <input type="radio" name="sex" id="log" />
          <label for="log" @click="isLog=true">
            <span>登录</span>
          </label>
        </li>
        <li>
          <input type="radio" name="sex" id="reg" />
          <label for="reg" @click="isLog=false">
            <span>注册</span>
          </label>
        </li>
      </ul>
      <button v-if="isLog" @click="login" type="button">登录</button>
      <button v-if="!isLog" @click="registe" type="button">注册</button>
    </form>
  </div>
</template>
<style scoped>
.bruce {
  width: 100%;
  margin-top: 100px;
}

.bubble-distribution {
  position: relative;
  margin-top: 50px;
  padding: 25px;
  border-radius: 2px;
  width: 100%;
  box-sizing: border-box;
}
.bubble-distribution h3 {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}
.bubble-distribution div {
  margin-top: 10px;
}
.bubble-distribution img {
  position: absolute;
  left: 50%;
  bottom: 100%;
  margin: 0 0 -20px -60px;
  width: 120px;
}
.bubble-distribution ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
}
.bubble-distribution li {
  position: relative;
  width: 45%;
  transition: all 300ms;
}
.bubble-distribution li:focus-within {
  background: linear-gradient(90deg, #fe5455 50%, transparent 0) repeat-x,
    linear-gradient(90deg, #fe5455 50%, transparent 0) repeat-x,
    linear-gradient(0deg, #fe5455 50%, transparent 0) repeat-y,
    linear-gradient(0deg, #fe5455 50%, transparent 0) repeat-y;
  background-position: 0 0, 0 100%, 0 0, 100% 0;
  background-size: 8px 1px, 8px 1px, 1px 8px, 1px 8px;
  animation: move 500ms infinite linear;
}
.bubble-distribution input[type="text"],
.bubble-distribution input[type="password"] {
  padding: 10px;
  outline: none;
  border: 1px solid #e9e9e9;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  transition: all 300ms;
}
.bubble-distribution input[type="text"]:focus:valid,
.bubble-distribution input[type="password"]:focus:valid {
  border-color: #fe5455;
}
.bubble-distribution input[type="text"]:focus:invalid,
.bubble-distribution input[type="password"]:focus:invalid {
  border-color: #f66;
}
.bubble-distribution input[type="radio"] {
  position: absolute;
  width: 0;
  height: 0;
}
.bubble-distribution input[type="radio"]:checked + label {
  border: 3px solid transparent;
  background-color: #fe5455;
  color: #fff;
}
.bubble-distribution label {
  display: block;
  border-bottom: 1px solid #ccc;
  width: 100%;
  background-clip: padding-box;
  cursor: pointer;
  text-align: center;
  transition: all 300ms;
}
.bubble-distribution button {
  overflow: hidden;
  margin-top: 10px;
  outline: none;
  border: none;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  background-color: #fe5455;
  cursor: pointer;
  color: #fff;
  transition: all 300ms;
}

.accout img,
.password img,
.code img {
  display: none;
  margin-bottom: -27px;
}
.accout:focus-within img,
.password:focus-within img,
.code:focus-within img {
  display: block;
}
.accout:focus-within ~ img,
.password:focus-within ~ img,
.code:focus-within ~ img {
  display: none;
}

.code {
  display: flex;
  justify-content: space-between;
}
.code button {
  margin-top: 0;
}
.code input:not(:placeholder-shown) {
  width: 70%;
}
.code input:not(:placeholder-shown) + button {
  width: 25%;
}
.code input:placeholder-shown {
  width: 100%;
}
.code input:placeholder-shown + button {
  width: 0;
  opacity: 0;
}

@keyframes move {
  to {
    background-position: 6% 0, -6% 100%, 0 -6%, 100% 6%;
  }
}
.nickName,
.accout input,
.password input {
  padding-left: 35px !important;
}
.nickName {
  background: url(../../static/img/account.png) no-repeat;
  background-size: 20px;
  background-position: 10px 18px;
}
.accout input {
  background: url(../../static/img/phone.png) no-repeat;
  background-size: 15px;
  background-position: 12px 15px;
}
.password input {
  background: url(../../static/img/password.png) no-repeat;
  background-size: 20px;
  background-position: 10px 18px;
}
</style>
<script>
export default {
  data() {
    return {
      nickName: "",
      password: "",
      phone: "",
      isLog: false
    };
  },
  methods: {
    registe() {
      let account = {
        nickName: this.nickName,
        phone: this.phone,
        password: this.password
      };
      let reg = JSON.parse(localStorage.getItem("account"));

      if (!reg) {
        if (this.nickName && this.password && this.phone) {
          localStorage.setItem("account", JSON.stringify(account));

          this.isLog = true;
               this.$toast("请登录");
        } else {
          this.$toast("信息尚未完善");
          return;
        }
        localStorage.setItem("account", JSON.stringify(account));
          this.$toast("请登录");
        this.isLog = true;
      } else {
        if (reg.phone == account.phone) {
          this.$toast("账号已存在");
        } else {
          if (this.nickName && this.password && this.phone) {
            localStorage.setItem("account", JSON.stringify(account));

            this.isLog = true;
              this.$toast("请登录");
          } else {
            this.$toast("信息尚未完善");
            return;
          }
        }
      }
    },
    login() {
      let account = JSON.parse(localStorage.getItem("account"));
      if (!account) {
        this.$toast("请先注册");
      } else {
        if (this.phone == account.phone && this.password == account.password) {
          this.$router.push({ name: "first" });
          localStorage.setItem("isLog", JSON.stringify(true));
        } else {
          this.$toast("登录错误,请重试");
        }
      }
    }
  }
};
</script>