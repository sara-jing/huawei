<template>
  <div class="changepsd">
    <el-form :model="formData" :rules="rules" ref="passwordForm">
        <el-form-item prop="oldPass" label="原密码">
            <el-input v-model.trim="formData.oldPass" clearable show-password placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPass" label="新密码">
            <el-input v-model.trim="formData.newPass"  clearable show-password placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass" label="确认密码">
            <el-input v-model.trim="formData.confirmPass" clearable show-password placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="submit-btn" type="primary" @click="handleSubmit">修改</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios';
import { URLPATH, SUCCESS } from "../../config/config";
export default {
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

    const checkConfirmPass = (rule ,value, callback) => {
        if(!value) {
            callback(new Error('密码不能为空'));
        }
        if(this.formData.oldPass === value) {
            callback(new Error('不能与旧密码一致'));
        }
        if(this.formData.newPass !== value) {
            callback(new Error('两次密码不一致'));
        }else {
            callback();
        }
    }
    return {
      formData: {
        oldPass: "",
        newPass: "",
        confirmPass: "",
      },
      rules: {
        oldPass: [{ validator: checkPassword, trigger: "blur" }],
        newPass: [{ validator: checkPassword, trigger: "blur" }],
        confirmPass: [{ validator: checkConfirmPass, trigger: "blur" }]
      },
    };
  },
  methods: {
      handleSubmit() {
          this.$refs['passwordForm'].validate(valid => {
              if(valid) {
                  let url = URLPATH + '/admin/changepassword';
                  let token = sessionStorage.getItem('token');
                  axios.post(url, this.formData,{
                    headers: {
                        token
                    }
                  }).then(res => {
                    let {code, msg} = res.data;
                    if(code === SUCCESS) {
                      this.$message.success(msg);
                      sessionStorage.clear();
                      this.$router.push({name: 'login'});
                    } else {
                      this.$message.warning(msg);
                    }
                  }).catch(err => {
                    console.log(err);
                  })
              } else {
                  return ;
              }
          })
      }
  }
};
</script>
<style scoped>
.changepsd {
    width: 500px;
    padding: 20px 35px;
    box-shadow: 0 0 2px #ccc;
    margin: 20px;
}
</style>