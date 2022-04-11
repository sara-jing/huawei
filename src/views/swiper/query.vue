<template>
  <div>
    <el-table :data="swiperQueryTable" style="width: 100%" border>
      <el-table-column type="index" width="80"></el-table-column>
      <el-table-column label="轮播描述" prop="sdesc"></el-table-column>
      <el-table-column label="轮播图片">
        <template slot-scope="scope">
          <img height="80" :src="urlPath + scope.row.sthumb" />
        </template>
      </el-table-column>
      <el-table-column label="轮播排序" prop="ssort"></el-table-column>
      <el-table-column label="轮播跳转路径" prop="surl"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
            <el-button size="mini" @click="handlerSwiperEditBtn(scope.row.sid)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handlerSwiperDeleteBtn(scope.row.sid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      class="swiper-update-diglog"
      :visible.sync="swiperUpdateDialog"
      width="50%"
      title="表格编辑"
    >
      <div v-if="swiperUpdateOne">
        <el-form :model="swiperUpdateOne" :rules="swiperUpdateRules" ref="swiperUpdateForm">
          <el-form-item label="轮播描述">
            <el-input
              v-model="swiperUpdateOne.sdesc"
              placeholder="请输入轮播描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="轮播图片" style="margin-bottom: 0" size="mini" prop="sthumb">
            <el-input v-model="swiperUpdateOne.sthumb" type="hidden"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              :action="urlPath + '/admin/upload'"
              :show-file-list="false"
              :on-success="handlerSwiperUpdateSuccess"
              :before-upload="handlerBeforeImageUpload"
            >
              <img
                height="100"
                v-if="swiperUpdateOne.sthumb"
                :src="urlPath + swiperUpdateOne.sthumb"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="轮播排序" prop="ssort">
            <el-input
              v-model.number="swiperUpdateOne.ssort"
              placeholder="请输入轮播排序"
            ></el-input>
          </el-form-item>
          <el-form-item label="轮播跳转路径">
            <el-input
              v-model="swiperUpdateOne.surl"
              placeholder="请输入轮播跳转路径"
            ></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="handlerSwiperUpdateSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog class="swiper-delete-dialog"
      :visible.sync="swiperDeleteDialog"
      width="400px"
      title="轮播删除">
      <span>您确定要删除么</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="swiperDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handlerSwiperDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { swiperIndex,swiperShow,swiperUpdate,swiperDestroy } from "../../http/swiper";
import { SUCCESS, URLPATH,HandlerBeforeImageUpload } from "../../config/config";
export default {
  data() {
    return {
      handlerBeforeImageUpload: HandlerBeforeImageUpload,
      urlPath: URLPATH,
      swiperQueryTable: [],
      swiperUpdateDialog: false,
      swiperDeleteDialog: false,
      swiperUpdateOne: null,
      swiperUpdateRules: {
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
      swiperDeleteIdx: 0
    };
  },
  methods: {
    initSwiperTable() {
      swiperIndex()
        .then((res) => {
          let { code, msg, data } = res;
          if (code === SUCCESS) {
            this.$message.success(msg);
            this.swiperQueryTable = data;
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerSwiperUpdateSuccess(res) {
        if(res.code === SUCCESS) {
            this.swiperUpdateOne.sthumb = res.url;
        }
    },
    handlerSwiperUpdateSubmit() {
        this.$refs.swiperUpdateForm.validate((valid) => {
          if(valid) {
            swiperUpdate(this.swiperUpdateOne.sid,this.swiperUpdateOne).then(res => {
              let {code, msg} = res;
              if(code === SUCCESS) {
                this.$message.success(msg);
                this.swiperUpdateDialog = false;
                this.swiperQueryTable.map(ele => {
                  if(ele.sid === this.swiperUpdateOne.sid) {
                    Object.assign(ele,this.swiperUpdateOne);
                  }
                })
              }else {
                this.$message.warning(msg);
              }
            })
          }else {
            return ;
          }
        })
    },
    handlerSwiperEditBtn(sid) {
        this.swiperUpdateDialog = true;

        swiperShow(sid).then(res => {
          let {code, msg, data} = res;
          if(code === SUCCESS) {
            this.$message.success(msg);
            this.swiperUpdateOne = data;
          }else{
            this.$message.warning(msg);
          }
        }).catch(err => {
          console.log(err);
        })     
    },
    handlerSwiperDeleteBtn(sid) {
      this.swiperDeleteIdx = sid;
      this.swiperDeleteDialog = true;
    },
    handlerSwiperDelete() {
        swiperDestroy(this.swiperDeleteIdx).then(res => {
          let { code,msg } = res;
          this.swiperDeleteDialog = false;
          if(code === SUCCESS) {
            this.$message.success(msg);
            this.swiperQueryTable = this.swiperQueryTable.filter(ele => ele.sid !== this.swiperDeleteIdx);
          }else {
            this.$message.warning(msg);
          }
        }).catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    this.initSwiperTable();
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