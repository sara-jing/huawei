<template>
  <div v-if="websiteInfoUpdateForm" style="padding: 30px; width:900px;border: 1px solid #ccc">
    <el-form :model="websiteInfoUpdateForm" :rules="websiteInfoUpdateRules" ref="websiteInfoUpdateForm">
      <el-form-item label="网站名称" prop="wname">
        <el-input
          v-model="websiteInfoUpdateForm.wname"
          placeholder="请输入网站名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="网站关键字" prop="wkeywords">
        <el-input
          v-model="websiteInfoUpdateForm.wkeywords"
          placeholder="请输入网站关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="网站描述" prop="wdesc">
        <el-input
          v-model="websiteInfoUpdateForm.wdesc"
          placeholder="请输入网站描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="网站logo" prop="wlogo" style="margin-bottom:0" size="mini">
        <el-input
          v-model="websiteInfoUpdateForm.wlogo"
          type="hidden"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="urlPath + '/admin/upload'"
          :show-file-list="false"
          :on-success="handlerWebsiteLogoUpload"
          :before-upload="handlerBeforeImageUpload"
        >
          <img
            v-if="websiteInfoUpdateForm.wlogo"
            :src="urlPath + websiteInfoUpdateForm.wlogo"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
       <el-form-item label="网站地址信息" prop="waddress">
        <el-input
          v-model="websiteInfoUpdateForm.waddress"
          placeholder="请输入网站地址信息"
        ></el-input>
      </el-form-item>
       <el-form-item label="网站wx码" prop="wwx" style="margin-bottom:0" size="mini">
        <el-input
          v-model="websiteInfoUpdateForm.wwx"
          type="hidden"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="urlPath + '/admin/upload'"
          :show-file-list="false"
          :on-success="handlerWebsiteWxUpload"
          :before-upload="handlerBeforeImageUpload"
        >
          <img
            v-if="websiteInfoUpdateForm.wwx"
            :src="urlPath + websiteInfoUpdateForm.wwx"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="网站联系方式" prop="wtel">
        <el-input
          v-model="websiteInfoUpdateForm.wtel"
          placeholder="请输入联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="网站版权信息" prop="wcopy">
        <el-input
          v-model="websiteInfoUpdateForm.wcopy"
          placeholder="请输入网站版权信息"
        ></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="websiteinfoEditSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { websiteInfoIndex,websiteInfoUpdate } from "../../http/websiteinfo";
import { SUCCESS,HandlerBeforeImageUpload,URLPATH } from "../../config/config";
export default {
  data() {
    return {
      websiteInfoUpdateForm: null,
      handlerBeforeImageUpload:HandlerBeforeImageUpload,
      urlPath: URLPATH,
      websiteInfoUpdateRules: {
          wname: [
            {required: true,message: '请输入网站名称',trigger: 'blur'},
            {type: 'string', min:0, max:20, message: '长度0-20个字符',trigger:'blur'}
         ],
         wkeywords: [
            {required: true,message: '请输入网站关键字',trigger: 'blur'},
            {type: 'string', min:0, max:255, message: '长度0-255个字符',trigger:'blur'}
         ],
         wdesc: [
            {required: true,message: '请输入网站描述',trigger: 'blur'},
            {type: 'string', min:0, max:255, message: '长度0-255个字符',trigger:'blur'}
         ],
         wlogo:[
             {required: true,message: '请上传网站logo图',trigger: 'blur'},
         ],
         wwx:[
             {required: true,message: '请上传网站wx码',trigger: 'blur'},
         ],
         waddress: [
             {required: true,message: '请输入网站地址',trigger: 'blur'},
            {type: 'string', min:0, max:255, message: '长度0-255个字符',trigger:'blur'}
         ],
         wtel: [
             {required: true,message: '请输入网站联系电话',trigger: 'blur'},
            {type: 'string', min:11, max:11, message: '长度11个字符',trigger:'blur'}
         ],
         wcopy: [
             {required: true,message: '请输入网站版权信息',trigger: 'blur'},
            {type: 'string', min:0, max:255, message: '长度0-255个字符',trigger:'blur'}
         ]
      }
    };
  },
  methods: {
    initWebsiteInfo() {
      websiteInfoIndex()
        .then((res) => {
          let { code, msg, data } = res;
          if (code === SUCCESS && data) {
            this.$message.success(msg);
            this.websiteInfoUpdateForm = data;
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerWebsiteLogoUpload(res) {
        if(res.code === SUCCESS) {
            this.websiteInfoUpdateForm.wlogo = res.url;
        }
    },
    handlerWebsiteWxUpload(res) {
        if(res.code === SUCCESS) {
            this.websiteInfoUpdateForm.wwx = res.url;
        }
    },
    websiteinfoEditSubmit() {
        this.$refs.websiteInfoUpdateForm.validate(valid => {
            if(valid) {
                websiteInfoUpdate(this.websiteInfoUpdateForm.wid,this.websiteInfoUpdateForm).then(res =>{
                    let { code, msg } = res;
                    if(code === SUCCESS) {
                        this.$message.success(msg);
                        this.$router.push({name: 'websitequery'});
                    }else{
                        this.$message.warning(msg);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }else{
                return ;
            }
        })
    }
  },
  mounted() {
    this.initWebsiteInfo();
  },
};
</script>
<style scoped>
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