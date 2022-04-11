<template>
    <div class="chapter-insert">
        <el-form :model="chapterInsertForm" :rules="chapterInsertRules" ref="chapterInsertForm">
            <el-form-item label="章节名称" prop="chname">
                <el-input v-model="chapterInsertForm.chname" placeholder="请输入章节名称"></el-input>
            </el-form-item>
            <el-form-item label="章节视频时长" prop="chduration">
                <el-input v-model.number="chapterInsertForm.chduration" placeholder="请输入章节视频时长（s）"></el-input>
            </el-form-item>
            <el-form-item label="章节视频" style="margin-bottom: 0" size="mini" prop="chvideo">
                <el-input v-model="chapterInsertForm.chvideo" type="hidden"></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload 
                 class="avatar-uploader"
                  :action="urlPath + '/admin/upload' "
                  :on-success="handlerChapterVideoUpload"
                  :before-upload="handlerBeforeVideoUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>  
                </el-upload>
            </el-form-item>
            <el-form-item>
                 <video v-if="chapterInsertForm.chvideo" width="400" controls :src="urlPath + chapterInsertForm.chvideo"></video>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerChapterInsertSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>
<script>
import { URLPATH,SUCCESS } from '../../config/config';
import { chapterCreate } from '../../http/chapter';
export default {
    data() {
        return {
            urlPath: URLPATH,
            chapterInsertForm: {
                chname: '',
                chduration: '',
                chvideo: '',
                cid: ''
            },
            chapterInsertRules: {
                chname: [
                    {required: true,message: '请输入章节名称', trigger:'blur'},
                    {type:'string',max: 50, message: '章节名称0-50个字符',trigger: 'blur'}
                ],
                chduration: [
                    {required: true, message: '请输入章节时长', trigger: 'blur'},
                    {type:'number',min:0,max: 3600, message: '0-3600之间',trigger: 'blur'}
                ],
                chvideo:[
                     {required: true, message: '请上传章节视频', trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        handlerBeforeVideoUpload(file) {
            let {size,type} = file;
            let maxSize = 1024*1024*300;
            let videoTypeFlag = true,videoSizeFlag = true;
            let videoTypeArr = ['video/mp4'];
            if(size > maxSize) {
                videoSizeFlag = false;
                this.$message.warning('上传的视频文件最多不能超过300MB');
            }
            if(!videoTypeArr.includes(type)) {
                videoTypeFlag = false;
                this.$message.warning('上传视频文件格式有误');
            }
            return videoTypeFlag && videoSizeFlag;
        },
        handlerChapterVideoUpload(res) {
            if(res.code === SUCCESS) {
                this.chapterInsertForm.chvideo = res.url;
            }
        },
         handlerChapterInsertSubmit() {
            this.$refs.chapterInsertForm.validate(async valid => {
                if(valid) {
                    let res = await chapterCreate(this.chapterInsertForm);
                    let {code,msg} = res;
                    if(code === SUCCESS) {
                        this.$message.success(msg);
                    }else {
                        this.$message.warning(msg);
                    }
                }else {
                    return ;
                }
            })
        }
    },
    mounted() {
        this.chapterInsertForm.cid = this.$route.query.cid;
    }
}
</script>
<style>
.chapter-insert {
    width: 800px;
    border: 1px solid #ccc;
    padding: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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