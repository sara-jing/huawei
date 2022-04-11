<template>
  <div class="login" v-loading.fullscreen.body.lock="showLoading">
    <div class="login-content">
      <el-form :model="loginForm" :rules="loginRules" ref="ruleForm">
        
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="loginForm.password"
            placeholder="请输入密码"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submit-btn"
            type="primary"
            @click="handleSubmit('ruleForm')">登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { URLPATH, SUCCESS } from "../../config/config";

export default {
  name: "Login",
  data() {
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      }
      let passreg = /^[a-zA-Z0-9]{6,8}$/;
      if (!passreg.test(value)) {
        callback(new Error("6-8位数字字母"));
      } else {
        callback();
      }
    };
    return {
      showLoading: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个", trigger: "blur" },
        ],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((vaild) => {
        if (vaild) {
          this.showLoading = true;
          let url = URLPATH + "/admin/login";
          axios
            .post(url, this.loginForm)
            .then((res) => {
              let data = res.data;
              if (data.code === SUCCESS) {
                this.$message.success("登录成功");
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem(
                  "userinfo",
                  JSON.stringify(data.userInfo)
                );
                this.$router.push({ name: "main" });
              } else {
                this.$message.warning(data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.showLoading = false;
            });
        }
      });
    },
  },
};
</script>
<style scoped>
@import "../../assets/css/login.css";
</style>