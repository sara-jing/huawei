<template>
  <div v-loading.lock="showLoading">
    <el-tabs v-model="activeTab" @tab-click="handlerTabClick">
      <el-tab-pane label="分类添加" name="insert">
        <div class="coursecate-insert">
          <el-form
            :model="courseCateInsertForm"
            :rules="courseCateInsertFormRules"
            ref="courseCateInsertForm"
          >
            <el-form-item label="课程分类" prop="catename">
              <el-input
                v-model="courseCateInsertForm.catename"
                placeholder="请输入课程分类的名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="课程分类数字排序" prop="catesort">
              <el-input
                type="number"
                v-model.number="courseCateInsertForm.catesort"
                placeholder="请输入课程分类数字排序"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="图标上传"
              prop="cateicon"
              style="margin-bottom: 0"
            >
              <el-input
                v-model="courseCateInsertForm.cateicon"
                type="hidden"
                placeholder="请选择上传图片"
              ></el-input>
            </el-form-item>
            <el-upload
              class="avatar-uploader"
              :action="urlPath + '/admin/upload'"
              :on-success="courseCateInsertUpload"
            >
              <img
                v-if="courseCateInsertForm.cateicon"
                :src="urlPath + courseCateInsertForm.cateicon"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item>
              <el-button type="primary" @click="handlerCourseCateInsert"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分类查看" name="query">
        <el-table :data="coursecateTable" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="分类名称" prop="catename"></el-table-column>
          <el-table-column label="分类图标" prop="cateicon">
            <template slot-scope="scope">
              <img
                width="100"
                :src="scope.row.cateicon"
                alt="scope.row.catename"
              />
            </template>
          </el-table-column>
          <el-table-column label="分类排序" prop="catesort"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handlerCourseEdit(scope.row.id)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handlerCourseDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div v-if="courseCateOne">
      <el-dialog title="课程分类编辑" :visible.sync="showUpdateDialog"  width="40%">
        <el-form
          :model="courseCateOne"
          :rules="courseCateUpdateFormRules"
          ref="courseCateUpdateForm"
        >
          <el-form-item label="分类名称" prop="catename">
            <el-input v-model="courseCateOne.catename"></el-input>
          </el-form-item>
          <el-form-item label="分类排序" prop="catesort">
            <el-input v-model.number="courseCateOne.catesort"></el-input>
          </el-form-item>
          <el-form-item
            label="分类图标"
            prop="cateicon"
            style="margin-bottom: 0"
          >
            <el-input v-model="courseCateOne.cateicon" type="hidden"></el-input>
          </el-form-item>
          <el-upload
            class="avatar-uploader"
            :action="urlPath + '/admin/upload'"
            :on-success="courseCateUpdateUpload"
          >
            <img
              v-if="courseCateOne.cateicon"
              :src="urlPath + courseCateOne.cateicon"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form-item>
            <el-button type="primary" @click="handlerCourseCateUpdate"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-dialog title="课程分类删除" :visible.sync="showDeleteDialog"  width="30%">
      <span>你确定要删除这条信息么</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handlerDialogDelete"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { URLPATH, SUCCESS } from "../../config/config";
export default {
  data() {
    return {
      activeTab: "insert",
      urlPath: URLPATH,
      showDeleteDialog: false,
      courseCateInsertForm: {
        catename: "",
        cateicon: "",
        catesort: 10,
      },
      courseCateInsertFormRules: {
        catename: [
          { required: true, message: "分类名称必填", trigger: "blur" },
          {
            type: "string",
            min: 2,
            max: 6,
            message: "2-6个字符",
            trigger: "blur",
          },
        ],
        catesort: [
          { required: false, message: "请输入分类排序", trigger: "blur" },
          {
            type: "number",
            min: 0,
            max: 255,
            message: "0-255之间的数字",
            trigger: "blur",
          },
        ],
        cateicon: [
          { required: true, message: "请选择上传图片", trigger: "blur" },
        ],
      },
      courseCateUpdateFormRules: {
        catename: [
          { required: true, message: "分类名称必填", trigger: "blur" },
          {
            type: "string",
            min: 2,
            max: 6,
            message: "2-6个字符",
            trigger: "blur",
          },
        ],
        catesort: [
          { required: false, message: "请输入分类排序", trigger: "blur" },
          {
            type: "number",
            min: 0,
            max: 255,
            message: "0-127之间的数字",
            trigger: "blur",
          },
        ],
        cateicon: [
          { required: true, message: "请选择上传图片", trigger: "blur" },
        ],
      },
      coursecateTable: [],
      showLoading: false,
      imageUrl: "",
      courseCateOne: null,
      showUpdateDialog: false,
      CoursecateDeleteIdx:0,
      CoursecateUpdateIdx:0,
    };
  },
  methods: {
    // tab切换的事件
    handlerTabClick() {
      this.activeTab === "query" && this.initCourseCate();
    },
    courseCateInsertUpload(res) {
      if (res.code === SUCCESS) {
        this.$message.success(res.msg);
        this.courseCateInsertForm.cateicon = res.url;
      } else {
        this.$message.warning(res.msg);
      }
    },
    courseCateUpdateUpload(res) {
      if (res.code === SUCCESS) {
        this.$message.success(res.msg);
        this.courseCateOne.cateicon = res.url;
      } else {
        this.$message.warning(res.msg);
      }
    },
    handlerCourseCateInsert() {
      this.$refs.courseCateInsertForm.validate((valid) => {
        if (valid) {
          let url = URLPATH + "/admin/coursecate/insert";
          let token = sessionStorage.getItem("token");
          this.showLoading = true;
          axios
            .post(url, this.courseCateInsertForm, {
              headers: {
                token,
              },
            })
            .then((res) => {
              let { code, msg } = res.data;
              if (code === SUCCESS) {
                this.$message.success(msg);
                this.courseCateInsertForm = {
                  catename: "",
                  cateicon: "",
                  catesort: 10,
                };
              } else {
                this.$message.warning(msg);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.showLoading = false;
            });
        } else {
          return;
        }
      });
    },
    initCourseCate() {
      let url = URLPATH + "/admin/coursecate/query";
      let token = sessionStorage.getItem("token");
      this.showLoading = true;
      axios
        .get(url, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          let { msg, data } = res.data;
          this.$message.success(msg);
          data.map((ele) => (ele.cateicon = URLPATH + ele.cateicon));
          this.coursecateTable = data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    handlerCourseEdit(index) {
      // 显示编辑弹框
      // 获取编辑数据
      this.CoursecateUpdateIdx = index; 
      let token = sessionStorage.getItem("token");

      let url = URLPATH + "/admin/coursecate/read";
      this.showLoading = true;
      axios
        .get(url, {
          params: { id: index },
          headers: { token },
        })
        .then((res) => {
          let { msg, data } = res.data;
          if (data) {
            this.$message.success(msg);
            this.showUpdateDialog = true;
            this.courseCateOne = data;
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.showLoading = false;
        });
      this.showUpdateDialog = true;
    },
    handlerCourseCateUpdate() {
      this.$refs.courseCateUpdateForm.validate((valid) => {
        if (valid) {
          let url = URLPATH + "/admin/coursecate/update";
          let token = sessionStorage.getItem("token");
          this.showLoading = true;
          axios
            .post(url, this.courseCateOne, {
              headers: {
                token,
              },
            })
            .then((res) => {
              let { code, msg } = res.data;
              if (code === SUCCESS) {
                this.$message.success(msg);
                this.coursecateTable.map(ele => {
                    if(ele.id === this.CoursecateUpdateIdx) {
                       Object.assign(ele,this.courseCateOne);
                       ele.cateicon = this.urlPath + ele.cateicon;
                    }
                })
                this.showUpdateDialog = false;
              } else {
                this.$message.warning(msg);
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
    handlerCourseDelete(index) {
      this.showDeleteDialog = true;
      this.CoursecateDeleteIdx = index;
    },
    handlerDialogDelete() {
        this.showDeleteDialog = false;
        let index = this.CoursecateDeleteIdx;
      let url = URLPATH + "/admin/coursecate/delete";
      let token = sessionStorage.getItem("token");
      axios
        .delete(url, {
          data: { id: index },
          headers: { token },
        })
        .then((res) => {
          let { code, msg } = res.data;
          if (code === SUCCESS) {
            this.$message.success(msg);
            let data = this.coursecateTable.filter((ele) => ele.id !== index);
            this.coursecateTable = data;
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
<style>
.coursecate-insert {
  width: 500px;
  box-shadow: 0 0 2px #ccc;
  margin: 15px;
  padding: 20px 50px;
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