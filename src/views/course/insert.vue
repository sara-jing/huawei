<template>
  <div class="courseinsert">
    <el-form :model="courseForm">
      <el-form-item label="所属分类">
        <el-select v-model="courseForm.id" placeholder="请选择">
          <el-option
            v-for="item in coursecate"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服装名称">
        <el-input
          v-model="courseForm.cname"
          placeholder="请输入服装名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="发货时间">
        <el-input
          v-model="courseForm.cdesc"
          placeholder="请输入发货时间"
        ></el-input>
      </el-form-item>
        <el-input
          type="hidden"
          v-model="courseForm.cdesc"
          placeholder="请输入服装缩略图"
        ></el-input>
      
      <el-form-item label="服装缩略图">
        <el-upload
          class="avatar-uploader"
          :action="urlPath + '/admin/upload'"
          :show-file-list="false"
          :on-success="handlerThumbUpload"
          :before-upload="handlerBeforeThumbUpload"
        >
          <img
            v-if="courseForm.cthumb"
            :src="urlPath + courseForm.cthumb"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="服装现价">
        <el-input
          v-model="courseForm.cprice"
          placeholder="请输入服装现价"
        ></el-input>
      </el-form-item>
      <el-form-item label="服装原价">
        <el-input
          v-model="courseForm.cperiod"
          placeholder="请输入服装原价"
        ></el-input>
      </el-form-item>
      <el-form-item label="服装品牌名">
        <el-input
          v-model="courseForm.cteacher"
          placeholder="请输入服装品牌名"
        ></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input
          v-model="courseForm.cteacher_position"
          placeholder="请输入产地"
        ></el-input>
      </el-form-item>
        <el-input
        type="hidden"
          v-model="courseForm.cbg"
          placeholder="请输入服装服装详情图"
        ></el-input>
      <el-form-item label="请上传服装服装详情图">
        <el-upload
          class="avatar-uploader"
          :action="urlPath + '/admin/upload'"
          :show-file-list="false"
          :on-success="handlerBgUpload"
          :before-upload="handlerBeforeBgUpload"
        >
          <img
            v-if="courseForm.cbg"
            :src="urlPath + courseForm.cbg"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="服装简介">
        <el-input
          v-model="courseForm.cintro"
          type="textarea"
          autosize
          placeholder="服装简介"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="courseInsertSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SUCCESS,URLPATH } from '../../config/config';
import {courseCateIndex} from '../../http/coursecate';
import { courseCreate } from '../../http/course';
export default {
  name: "insert",
  data() {
    return {
      urlPath: URLPATH,
      courseForm: {
        cname: "",
        cdesc: "",
        cthumb: "",
        cprice: "",
        cperiod: "",
        cteacher: "",
        cteacher_position: "",
        cbg: "",
        cintro: "",
        id: "",
      },
      coursecate: []
      
    };
  },
  methods: {
    initCourseCate() {
      this.showLoading = true;
        courseCateIndex().then((res) => {
          let { msg, data } = res;
          this.$message.success(msg);
          this.coursecate = data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    handlerThumbUpload(res) {
      if(res.code === SUCCESS) {
        this.courseForm.cthumb = res.url;
      }
    },
    handlerBeforeThumbUpload(file) {
      let imgTypeFlag = true,imgSizeFlag = true;
      let {size, type} = file;
      let maxSize = 200 * 1024;
      let imgType = ['image/png', 'image/jpeg','image/jpg','image/gif','image/webp'];
      if(size > maxSize) {
        imgSizeFlag = false;
        this.$message.warning('上传的文件最多不能超过500kb');
      }
      if(!imgType.includes(type)) {
        imgTypeFlag = false;
         this.$message.warning('上传文件格式有误');
      }
      return imgTypeFlag && imgSizeFlag;
    },
    handlerBgUpload(res) {
      if(res.code === SUCCESS) {
        this.courseForm.cbg = res.url;
      }
    },
    handlerBeforeBgUpload(file) {
      let imgTypeFlag = true,imgSizeFlag = true;
      let {size, type} = file;
      let maxSize = 200 * 1024;
      let imgType = ['image/png', 'image/jpeg','image/jpg','image/gif','image/webp'];
      if(size > maxSize) {
        imgSizeFlag = false;
        this.$message.warning('上传的文件最多不能超过500kb');
      }
      if(!imgType.includes(type)) {
        imgTypeFlag = false;
         this.$message.warning('上传文件格式有误');
          return imgTypeFlag && imgSizeFlag;
      }
    },
    courseInsertSubmit() {
      courseCreate(this.courseForm).then((res) => {
          let {code,msg} = res;
          if(code === SUCCESS) {
            this.$message.success(msg);
          }else {
            this.$message.warning(msg);
          }
      }).catch(err => {
          console.log(err);
      })
    }
  },
  created() {
    this.initCourseCate();
  },
};
</script>

<style>
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
.courseinsert {
  margin: 30px 35px;
  padding: 40px;
  width: 50%;
  border: 1px solid #ccc;
}
</style>