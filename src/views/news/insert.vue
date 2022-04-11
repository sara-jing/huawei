<template>
  <div class="news">
      <el-form :model="newsForm" :rules="newsRules" ref="newInsertForm">
          <el-form-item label="咨询内容" prop="content">
              <el-input v-model="newsForm.content" placeholder="请输入咨询内容"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary"  @click="handlerInsertNews">提交</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { SUCCESS } from '../../config/config'
import { newsCreate } from '../../http/news'
export default {
    data() {
        return {
            newsForm: {
                content: ''   
            },
            newsRules: {
                content: [{required:true,message: '必填',trigger: 'blur'}]
            }
        }
    },
    methods: {
        handlerInsertNews() {
            this.$refs.newInsertForm.validate(valid => {
                if(!valid) return;
                newsCreate(this.newsForm).then(res => {
                    let {code,msg} = res;
                    if(code === SUCCESS) {
                        this.$message.success(msg);
                    }else {
                        this.$message.warning(msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            })
        }
    }
}
</script>

<style>
.news {
    padding: 20px;
    width: 600px;
    height: 400px;
    border: 1px solid #ccc;
}
</style>