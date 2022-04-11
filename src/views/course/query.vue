<template>
  <div>
    <el-form :model="courseQueryForm" :inline="true" style="margin: 25px 0">
      <el-form-item label="服装分类" class="demo-form-inline">
        <el-select
          v-model="courseQueryForm.id"
          placeholder="服装分类"
        >
          <el-option value="">请选择</el-option>
          <el-option
            v-for="item in courseCate"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服装名称" style="margin-left: 60px">
        <el-input
          placeholder="服装名称查询"
          v-model="courseQueryForm.cname"
        ></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="paimary" @click="handlerCourseQuerySearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="courseQueryTable" style="width: 100%" border>
      <el-table-column label="服装名称" prop="cname"></el-table-column>
      <el-table-column label="发货时间" prop="cdesc"></el-table-column>
      <!-- 发货时间原来为服装描述
      服装现价原来为服装价格
      服装原价原来为课时
      品牌名称原来为教师
      产地原来为职称
      服装详情图原来为背景图
       -->
      <el-table-column label="服装缩略图">
        <template slot-scope="scope">
          <img height="100" :src="urlPath + scope.row.cthumb" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="服装现价" prop="cprice"></el-table-column>
      <el-table-column label="服装原价" prop="cperiod"></el-table-column>
      <el-table-column label="服装购买量" prop="csales"></el-table-column>
      <el-table-column label="服装观看量" prop="cviews"></el-table-column>
      <el-table-column label="服装评价量" prop="cevaluate"></el-table-column>
      <el-table-column label="品牌名称" prop="cteacher"></el-table-column>
      <el-table-column
        label="产地"
        prop="cteacher_position"
      ></el-table-column>
      <el-table-column label="服装详情图">
        <template slot-scope="scope">
          <img height="100" :src="urlPath + scope.row.cbg" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="服装简介" prop="cintro"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handlerCourseEditBtn(scope.row.cid)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handlerCourseDeleteBtn(scope.row.cid)"
            >删除</el-button
          >
          <el-button size="mini" type="primary" @click="chapterOperate(scope.row.cid)">章节管理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 25px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="courseQueryPaginate.page"
      :page-sizes="[courseQueryPaginate.limit, 5, 10, 20]"
      :page-size="courseQueryPaginate.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="courseTotal"
    >
    </el-pagination>

    <el-dialog
      :visible.sync="courseUpdateDialog"
      width="800px"
      title="服装编辑"
    >
      <div class="courseupdate" v-if="courseUpdateOne">
        <el-form :model="courseUpdateOne">
          <el-form-item label="所属分类">
            <el-select v-model="courseUpdateOne.id" placeholder="请选择">
              <el-option
                v-for="item in courseCate"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服装名称">
            <el-input
              v-model="courseUpdateOne.cname"
              placeholder="请输入服装名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="服装描述">
            <el-input
              v-model="courseUpdateOne.cdesc"
              placeholder="请输入服装描述"
            ></el-input>
          </el-form-item>
          <el-input
            type="hidden"
            v-model="courseUpdateOne.cdesc"
            placeholder="请输入服装缩略图"
          ></el-input>

          <el-form-item label="服装缩略图">
            <el-upload
              class="avatar-uploader"
              :action="urlPath + '/admin/upload'"
              :show-file-list="false"
              :on-success="handlerCourseThumbUpdate"
              :before-upload="handlerBeforeImageUpload"
            >
              <img
                height="100"
                v-if="courseUpdateOne.cthumb"
                :src="urlPath + courseUpdateOne.cthumb"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="服装价格">
            <el-input
              v-model="courseUpdateOne.cprice"
              placeholder="请输入服装价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="服装课时">
            <el-input
              v-model="courseUpdateOne.cperiod"
              placeholder="请输入服装课时"
            ></el-input>
          </el-form-item>
          <el-form-item label="服装授课教师">
            <el-input
              v-model="courseUpdateOne.cteacher"
              placeholder="请输入服装授课教师"
            ></el-input>
          </el-form-item>
          <el-form-item label="授课教师职称">
            <el-input
              v-model="courseUpdateOne.cteacher_position"
              placeholder="请输入授课教师职称"
            ></el-input>
          </el-form-item>
          <el-input
            type="hidden"
            v-model="courseUpdateOne.cbg"
            placeholder="请输入服装背景图"
          ></el-input>
          <el-form-item label="请上传服装背景图">
            <el-upload
              class="avatar-uploader"
              :action="urlPath + '/admin/upload'"
              :show-file-list="false"
              :on-success="handlerCourseBgUpdate"
              :before-upload="handlerBeforeImageUpload"
            >
              <img
               height="100"
                v-if="courseUpdateOne.cbg"
                :src="urlPath + courseUpdateOne.cbg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="服装简介">
            <el-input
              v-model="courseUpdateOne.cintro"
              type="textarea"
              autosize
              placeholder="服装简介"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="courseUpdateSubmit"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="courseDeleteDialog" title="服装删除">
        <span>您确定要删除么</span>
         <span slot="footer" class="dialog-footer">
            <el-button @click="courseDeleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="handlerCourseDelete">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import { SUCCESS, URLPATH,HandlerBeforeImageUpload } from "../../config/config";
import { courseIndex,courseShow,courseUpdate,courseDestroy } from "../../http/course";
import { courseCateIndex } from "../../http/coursecate";
export default {
  data() {
    return {
      courseQueryTable: [],
      courseCate: [],
      urlPath: URLPATH,
      courseQueryForm: {
          id:'',
          cname: ''
      },
      courseQueryPaginate: {
        page: 1,
        limit: 3,
      },
      courseTotal: 0,
      courseUpdateOne: null,
      courseUpdateDialog: false,
      handlerBeforeImageUpload: HandlerBeforeImageUpload,
      courseDeleteIdx: 0,
      courseDeleteDialog: false
    };
  },
  methods: {
    chapterOperate(cid) {
      this.$router.push({name: 'chapterindex', query: {cid}});
    },
    initCourseCate() {
      courseCateIndex()
        .then((res) => {
          let { code, msg, data } = res;
          if (code === SUCCESS) {
            this.$message.success(msg);
            this.courseCate = data;
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initCourseTable() {
      let params = Object.assign({},this.courseQueryForm,this.courseQueryPaginate);
      courseIndex(params)
        .then(res => {
          let { code, msg, data, total } = res;
          console.log(res);
          if (code === SUCCESS) {
            this.$message.success(msg);
            this.courseQueryTable = data;
            this.courseTotal = total;
          } else {
            this.$message.warning(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.courseQueryPaginate.limit = val;
      this.initCourseTable();
    },
    handleCurrentChange(val) {
      this.courseQueryPaginate.page = val;
      this.initCourseTable();
    },
    handlerCourseQuerySearch() {
      this.courseQueryPaginate.page = 1;
      this.initCourseTable();
    },
    handlerCourseEditBtn(cid) {
      this.courseUpdateDialog = true;
      courseShow(cid).then(res => {
          let { code, msg, data} = res;
          if(code === SUCCESS) {
            this.$message.success(msg);
            this.courseUpdateOne = data;
          }else {
            this.$message.warning(msg);
          }
      }).catch(err => {
        console.log(err);
      })
    },
    handlerCourseThumbUpdate(res) {
      let {code,url} = res;
      if(code === SUCCESS) {
        this.courseUpdateOne.cthumb = url;
      }
    },
    handlerCourseBgUpdate(res) {
      let {code,url} = res;
      if(code === SUCCESS) {
        this.courseUpdateOne.cbg = url;
      }
    },
    courseUpdateSubmit() {
      courseUpdate(this.courseUpdateOne.cid, this.courseUpdateOne).then(res => {
        let { code,msg } = res;
        if(code === SUCCESS) {
          this.$message.success(msg);
          this.courseUpdateDialog = false;
          this.courseQueryTable.map(ele => {
            if(ele.cid === this.courseUpdateOne.cid) {
              Object.assign(ele,this.courseUpdateOne);
            }
          })
        }else {
          this.$message.warning(msg);
        }
      }).catch(err => {
          console.log(err);
      })
    },
    handlerCourseDeleteBtn(cid) {
      console.log(111);
      this.courseDeleteIdx = cid;
      this.courseDeleteDialog = true;

    },
    handlerCourseDelete() {
      courseDestroy(this.courseDeleteIdx).then(res => {
        let { code,msg } = res;
        this.courseDeleteDialog = false;
        if(code === SUCCESS) {
          this.$message.success(msg);
          if (!this.queryName) {
          this.initCourseTable({ id: this.courseCateIdx });
        } else {
          this.initCourseTable({
            id: this.courseCateIdx,
            cname: this.queryName,
          });
        }
          
        }else {
          this.$message.warning(msg);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  mounted() {
    this.initCourseCate();
    this.initCourseTable();
  },
};
</script>
<style>
</style>