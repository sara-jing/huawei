<template>
  <div class="swiper-insert">
    <el-form
      :model="swiperInsertForm"
      :rules="swiperInsertRules"
      ref="swiperInsertForm"
    >
      <el-form-item label="轮播描述">
        <el-input
          v-model="swiperInsertForm.sdesc"
          placeholder="请输入轮播描述"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="轮播图片"
        prop="sthumb"
        size="mini"
        style="margin-bottom: 0"
      >
        <el-input v-model="swiperInsertForm.sthumb" type="hidden"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="urlPath + '/admin/upload'"
          :show-file-list="false"
          :on-success="handlerSwiperUploadSuccess"
          :before-upload="handlerBeforeImageUpload"
        >
          <img
            v-if="swiperInsertForm.sthumb"
            :src="urlPath + swiperInsertForm.sthumb"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="轮播排序" prop="ssort">
        <el-input
          v-model.number="swiperInsertForm.ssort"
          placeholder="请输入轮播排序"
        ></el-input>
      </el-form-item>
      <el-form-item label="轮播路径">
        <el-input
          v-model="swiperInsertForm.surl"
          placeholder="请输入轮播跳转路径"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSwiperInsertSubmit"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { URLPATH,HandlerBeforeImageUpload,SUCCESS } from '../../config/config';
import { swiperCreate } from '../../http/swiper';

export default {
  data() {
    return {
        handlerBeforeImageUpload: HandlerBeforeImageUpload,
        urlPath: URLPATH,
        swiperInsertForm: {
            sdesc: "",
            sthumb: "",
            ssort: "",
            surl: "",
        },
        swiperInsertRules: {
        sthumb: [{ required: true, message: "请选择轮播图", trigger: "blur" }],
        ssort: [
          {
            type: "number",
            min: 0,
            max: 128,
            message: "排序返回为0-127",
            trigger: "blur",
          }
        ]
        },
    }
  },
  methods: {
      handlerSwiperUploadSuccess(res) {
          if(res.code === SUCCESS) {
              this.swiperInsertForm.sthumb = res.url;
          }
      },
      handlerSwiperInsertSubmit() {
          this.$refs.swiperInsertForm.validate((valid) => {
              if(valid) {
                  swiperCreate(this.swiperInsertForm).then(res => {
                      let { code,msg } = res;
                      if(code === SUCCESS) {
                          this.$message.success(msg);
                          this.swiperInsertForm = {
                            sdesc: "",
                            sthumb: "",
                            ssort: "",
                            surl: "",
                        } 
                      }else {
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

<style>
.swiper-insert {
    width: 800px;
    padding: 10px 30px;
    border: 1px solid #ccc;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>