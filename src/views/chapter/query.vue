<template>
    <div>
        <el-form :model="searchForm" :inline="true">
            <el-form-item aria-label="章节名称">
                <el-input v-model="searchForm.chname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearchSubmit">搜索</el-button>   
            </el-form-item>
        </el-form>
        <el-table :data="courseChapterTable" border>
            <el-table-column prop="chname" label="章节名称"></el-table-column>
            <el-table-column prop="chduration" label="章节时长"></el-table-column>
            <el-table-column label="章节视频">
                <template slot-scope="scope">
                    <video width="300" :src="urlPath+scope.row.chvideo" controls></video>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="handlerChapterEditBtn(scope.row.chid)">编辑</el-button>
                    <el-button type="warning" @click="handlerChapterDeleteBtn(scope.row.chid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handlerPageChange"
          @size-change="handlerSizeChange"
          :current-page="chapterPaginate.page"
          :page-size="chapterPaginate.limit"
          :page-sizes="[3,5,10,20]"
          :total="total"
          layout="total,sizes,prev,pager,next,jumper"></el-pagination>
        <el-dialog :visible.sync="chapterUpdateDialog">
            <div v-if="chapterUpdateOne">
                <el-form :model="chapterUpdateOne" :rules="chapterInsertRules" ref="chapterUpdateForm">
                    <el-form-item label="章节名称" prop="chname">
                        <el-input v-model="chapterUpdateOne.chname" placeholder="请输入章节名称"></el-input>
                    </el-form-item>
                    <el-form-item label="章节时长" prop="chduration">
                        <el-input v-model.number="chapterUpdateOne.chduration" placeholder="请输入章节时长(s)"></el-input>
                    </el-form-item>
                    <el-form-item label="章节视频" style="margin-bottom:0" type="mini" prop="chvideo">
                        <el-input v-model="chapterUpdateOne.chvideo" type="hidden"></el-input>
                    </el-form-item>
                    <el-form-item>
                         <el-upload 
                            class="avatar-uploader"
                             :action="urlPath + '/admin/upload' "
                            :on-success="handlerChapterVideoUpdate"
                            :before-upload="handlerBeforeVideoUpdate">
                            <i class="el-icon-plus avatar-uploader-icon"></i>  
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <video width="300" v-if="chapterUpdateOne.chvideo" :src="urlPath+chapterUpdateOne.chvideo"></video>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handlerChapterUpdateSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="chapterDeleteDialog" width="40%">
            <span>您确定要删除么</span>
            <span slot="footer">
                <el-button @click="chapterDeleteDialog=false">取消</el-button>
                <el-button type="primary" @click="handlerChapterDeleteSubmit">确定</el-button>
            </span>
        </el-dialog>
    </div>    
</template>
<script>
import { chapterIndex,chapterShow,chapterUpdate,chapterDestroy } from '../../http/chapter';
import { SUCCESS,URLPATH } from '../../config/config';
export default {
    data() {
        return {
            urlPath: URLPATH,
            courseChapterTable: [],
            chapterUpdateDialog: false,
            chapterDeleteDialog: false,
            chapterUpdateOne: null,
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
            },
            chapterDeleteIdx:0,
            searchForm: {
                chname:''
            },
            chapterPaginate: {
                page: 1,
                limit: 3
            },
            total: 0,
            cid: 0
        }
    },
    methods: {
        handlerBeforeVideoUpdate(file) {
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
        handlerChapterVideoUpdate(res) {
            if(res.code === SUCCESS) {
                this.chapterUpdateOne.chvideo = res.url;
            }
        },
        async handlerChapterEditBtn(chid) {
            this.chapterUpdateDialog = true;
            let res = await chapterShow(chid);
            let {code,msg,data} = res;
            if(code === SUCCESS) {
                this.$message.success(msg);
                this.chapterUpdateOne = data;

            }else{
                this.$message.warning(msg);
            }
        },
        handlerChapterDeleteBtn(chid) {
            this.chapterDeleteIdx = chid;
            this.chapterDeleteDialog = true;
        },
        handlerChapterUpdateSubmit() {
            this.$refs.chapterUpdateForm.validate(async valid => {
                if(valid) {
                    let res = await chapterUpdate(this.chapterUpdateOne.chid,this.chapterUpdateOne);
                    let {code,msg} = res;
                    if(code === SUCCESS) {
                        this.$message.success(msg);
                        this.chapterUpdateDialog = false;
                        this.courseChapterTable.map(ele => {
                            if(ele.chid === this.chapterUpdateOne.chid) {
                                Object.assign(ele,this.chapterUpdateOne);
                            }
                            return ele;
                        })

                    }else{
                        this.$message.warning(msg);
                    }
                }else{
                    return ;
                }
            })
        },
        async handlerChapterDeleteSubmit() {
            let res = await chapterDestroy(this.chapterDeleteIdx);
            let {code,msg} = res;
            if(code === SUCCESS) {
                this.$message.success(msg);
                this.chapterDeleteDialog = false;
                this.initChapterTable();
            }else{
                this.$message.warning(msg);
            }
        },
        handlerPageChange(val) {
            this.chapterPaginate.page = val;
            this.initChapterTable();
        },
        handlerSizeChange(val) {
            this.chapterPaginate.limit = val;
            this.initChapterTable();
        },
        handlerSearchSubmit() {
            this.chapterPaginate.page = 1;
            this.initChapterTable();
        },
        async initChapterTable() {
            let params = Object.assign({},this.chapterPaginate,this.searchForm, {cid:this.cid});
            let res = await chapterIndex(params);
            let {code,msg,data,total} = res;
            if(code === SUCCESS && data.length) {
                this.$message.success(msg);
                this.courseChapterTable = data;
                this.total = total;
            }else {
                this.$message.warning(msg);
            }
        }
    },
     mounted() {
        let cid = this.$route.query.cid;
        this.cid = cid;
        this.initChapterTable();        
    }    
}
</script>
<style>
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